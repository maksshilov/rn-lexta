import React from 'react'
import { Dimensions, View } from 'react-native'
import WebView from 'react-native-webview'
import { useDispatch } from 'react-redux'

import * as coordsActons from '../store/actions/coords'
const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function MapMark({ city, street, houseNum }) {
	const dispatch = useDispatch()

	return (
		<View style={{ height: windowWidth * 0.6 }}>
			<WebView
				// style={{ opacity: 0.99 }}
				onError={(err) => console.log(err)}
				onMessage={(e) => {
					dispatch(coordsActons.setCoords(e.nativeEvent.data))
				}}
				source={{
					html: `
                            <body style="margin: 0px;padding: 0px;">
                                <div id="map" style="flex:0px ;margin: 0px ;padding: 0px; height: ${windowWidth * 1.5}px;"></div>
                                <script
                                    src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;apikey=240cb70c-297a-44da-a3f6-c73039a7c654"
                                    type="text/javascript"></script>
                                <script>
                                    ymaps.ready(init);
                            
                                    function init(){
                                        ymaps.geocode('${city} ${street} ${houseNum}',{results: 1})
                                            .then((res) => {
                                                let firstGeoObject = res.geoObjects.get(0),
                                                    coords = firstGeoObject.geometry.getCoordinates()
                                    
                                                firstGeoObject.options.set('preset', 'islands#redDotIcon');
                                                    
                                                let myMap = new ymaps.Map('map', {
                                                    center: coords,
                                                    zoom: 17
                                                })
                                                    
                                                myMap.geoObjects.add(firstGeoObject)

                                                window.ReactNativeWebView.postMessage(coords[0]+','+coords[1])
                                            })
                                    }
                                </script>
                            </body>
                `,
				}}
			/>
		</View>
	)
}
