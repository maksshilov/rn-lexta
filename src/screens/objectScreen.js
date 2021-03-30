import React, { useRef } from 'react'
import { Dimensions, View, Text } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppDetails from '../components/appDetails'
import AppEgrn from '../components/appEgrn'
import ObjectParams from '../components/objectParams'
import ObjectMini from '../components/objectMini'
import { WebView } from 'react-native-webview'
import PhoneShow from '../components/phoneShow'
import ObjectCarousel from '../components/objectCarousel'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function ObjectScreen({ route, navigation }) {
	const scrollToTop = useRef(null)

	return (
		<ScrollView ref={scrollToTop} scrollTo contentContainerStyle={{ backgroundColor: '#fff' }}>
			<View style={{ alignItems: 'center' }}>
				<ObjectCarousel />
				<View style={{ position: 'absolute', left: 20, top: 30 }}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<MaterialCommunityIcons name="arrow-left-thick" color="#fff" size={30} />
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ paddingHorizontal: 10 }}>
				{/* DATE */}
				<Text
					style={{
						fontFamily: 'gothampro-regular',
						fontSize: 13,
						color: '#7e7e7e',
						marginTop: 25,
					}}
				>
					30 февраля 2020
				</Text>
				{/* PRICE */}
				<View
					style={{
						paddingTop: 10,
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							fontFamily: 'gothampro-bold',
							fontSize: 20,
						}}
					>
						{route.params.price} &#8381;
					</Text>
					<View
						style={{
							flexDirection: 'row',
							width: windowWidth / 3.4,
							justifyContent: 'space-between',
						}}
					>
						<MaterialCommunityIcons name="update" color="#8f2d32" size={24} />
						<MaterialCommunityIcons name="email-outline" color="#8f2d32" size={24} />
						<MaterialCommunityIcons name="forum-outline" color="#8f2d32" size={24} />
					</View>
				</View>
				{/* PARAMS */}
				<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 20 }}>
					<ObjectParams type="Квартира" value={route.params.rooms} />
					<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
					<ObjectParams type="Площадь" value={route.params.square} />
					<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
					<ObjectParams type="Кухня" value="10.5 м2" />
					<View style={{ width: 1, height: '80%', backgroundColor: '#d0d0d0' }} />
					<ObjectParams type="Этаж" value={route.params.floor} />
				</View>
				{/* DESCR */}
				<View>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								position: 'absolute',
								width: '100%',
								height: 1,
								backgroundColor: '#d0d0d0',
								alignItems: 'center',
							}}
						></View>
						<MaterialCommunityIcons
							name="arrow-down-drop-circle"
							color="#d0d0d0"
							size={15}
						/>
					</View>
					<Text
						style={{
							fontFamily: 'gothampro-bold',
							fontSize: 16,
							marginTop: 15,
						}}
					>
						Описание
					</Text>
					<Text
						style={{
							fontFamily: 'gothampro-regular',
							lineHeight: 15,
							fontSize: 13,
							marginTop: 15,
							marginBottom: 30,
						}}
					>
						Продается квартира в зеленом и полностью застроенном микрорайоне. Рядом лес,
						лыжероллерная трасса, детские и спортивные площадки. В пешей доступности
						школа, детские сады, больница, бассейн Олимп, магазины.
						{'\n'}
						{'\n'}
						Дом очень теплый и тихий с надежными консьержами. Есть видеона-блюдение по
						периметру дома и в лифтах. Организовано ТСЖ. У квартиры прозрачная истори -
						я первый и единственный собственник в браке. Квартира покупалась без
						использования материнского капитала.
					</Text>
				</View>
				{/* APP DETAILS */}
				<View style={{ marginBottom: 30 }}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								position: 'absolute',
								width: '100%',
								height: 1,
								backgroundColor: '#d0d0d0',
								alignItems: 'center',
							}}
						></View>
						<MaterialCommunityIcons
							name="arrow-down-drop-circle"
							color="#d0d0d0"
							size={15}
						/>
					</View>
					<Text
						style={{
							fontFamily: 'gothampro-bold',
							fontSize: 16,
							marginTop: 15,
						}}
					>
						Квартира
					</Text>
					<AppDetails label="Количство комнат" value="2" />
					<AppDetails label="Общая площадь" value="62 м2" />
					<AppDetails label="Жилая площадь" value="48 м2" />
					<AppDetails label="Кухня" value="10.5" />
					<AppDetails label="Этаж" value="3/24" />
					<AppDetails label="Тип дома" value="монолитный" />
					<AppDetails label="Ремонт" value="косметический" />
				</View>
				{/* EGRN */}
				<View style={{ marginBottom: 30 }}>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								position: 'absolute',
								width: '100%',
								height: 1,
								backgroundColor: '#d0d0d0',
								alignItems: 'center',
							}}
						></View>
						<MaterialCommunityIcons
							name="arrow-down-drop-circle"
							color="#d0d0d0"
							size={15}
						/>
					</View>
					<Text
						style={{
							fontFamily: 'gothampro-bold',
							fontSize: 10,
							marginTop: 15,
						}}
					>
						Информация об объекте из ЕГРН по данным собственника
					</Text>
					<Text
						style={{
							fontFamily: 'gothampro-regular',
							fontSize: 10,
							color: '#7e7e7e',
							marginBottom: 10,
						}}
					>
						Кадастровый номер: 40:27:******:***
					</Text>
					<AppEgrn value="1 собственник" />
					<AppEgrn value="Указана кадастровая стоимость" />
					<AppEgrn value="Параметры квартиры совпадают с данными ЕГРН" />
					<AppEgrn value="Ограничения не найдены" />
				</View>
				{/* MAP */}
				<View>
					<View
						style={{
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View
							style={{
								position: 'absolute',
								width: '100%',
								height: 1,
								backgroundColor: '#d0d0d0',
								alignItems: 'center',
							}}
						></View>
						<MaterialCommunityIcons
							name="arrow-down-drop-circle"
							color="#d0d0d0"
							size={15}
						/>
					</View>
					<Text
						style={{
							fontFamily: 'gothampro-bold',
							fontSize: 12,
							marginTop: 15,
							marginBottom: 15,
						}}
					>
						{route.params.address}
					</Text>
				</View>
				{/* PHONE */}
			</View>
			<View style={{ width: windowWidth, height: windowWidth * 0.5, marginBottom: 30 }}>
				<WebView
					style={{ opacity: 0.99 }}
					onError={(err) => console.log(err)}
					originWhitelist={['*']}
					source={{
						html:
							'<div style="margin:-10"><script type="text/javascript" charset="utf-8" async src="https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Abca82711819eec264960544252481589b96aea2acaadee5d058cc52bc27247ab&amp;width=1000&amp;height=500&amp;lang=ru_RU&amp;scroll=true"></script></div>',
					}}
				/>
			</View>
			<PhoneShow />
			<View style={{ paddingHorizontal: 10 }}>
				<Text
					style={{
						fontFamily: 'gothampro-bold',
						fontSize: 16,
						marginTop: 15,
					}}
				>
					Похожие объявления рядом
				</Text>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 10,
						marginBottom: 10,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							{
								navigation.navigate('Object', {
									price: '6 000 000',
									rooms: '6-комн.',
									square: '66.6 м2',
									floor: '6 эт.',
									address: 'г. Обнинск, пр-т Маркса, 666',
								})
								scrollToTop.current.scrollTo({ x: 0, y: 0, animated: true })
							}
						}}
					>
						<ObjectMini
							windowWidth={windowWidth}
							price="6 000 000"
							rooms="6-комн."
							square="66.6 м2"
							floor="6 эт."
							address="г. Обнинск, пр-т Маркса, 666"
							navigation={navigation}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Object', {
								price: '2 000 000',
								rooms: '2-комн.',
								square: '22.2 м2',
								floor: '2 эт.',
								address: 'г. Обнинск, пр-т Маркса, 222',
							})
							scrollToTop.current.scrollTo({ x: 0, y: 0, animated: true })
						}}
					>
						<ObjectMini
							windowWidth={windowWidth}
							price="2 000 000"
							rooms="2-комн."
							square="22.2 м2"
							floor="2 эт."
							address="г. Обнинск, пр-т Маркса, 222"
							navigation={navigation}
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 10,
						marginBottom: 10,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Object', {
								price: '5 000 000',
								rooms: '5-комн.',
								square: '55.5 м2',
								floor: '5 эт.',
								address: 'г. Обнинск, пр-т Маркса, 555',
							})
							scrollToTop.current.scrollTo({ x: 0, y: 0, animated: true })
						}}
					>
						<ObjectMini
							windowWidth={windowWidth}
							price="5 000 000"
							rooms="5-комн."
							square="55.5 м2"
							floor="5 эт."
							address="г. Обнинск, пр-т Маркса, 555"
							navigation={navigation}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Object', {
								price: '1 000 000',
								rooms: '1-комн.',
								square: '11.1 м1',
								floor: '1 эт.',
								address: 'г. Обнинск, пр-т Маркса, 111',
							})
							scrollToTop.current.scrollTo({ x: 0, y: 0, animated: true })
						}}
					>
						<ObjectMini
							windowWidth={windowWidth}
							price="1 000 000"
							rooms="1-комн."
							square="11.1 м1"
							floor="1 эт."
							address="г. Обнинск, пр-т Маркса, 111"
							navigation={navigation}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity style={{ alignItems: 'center' }}>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						width: windowWidth * 0.9,
						height: windowWidth * 0.1,
						borderRadius: 5,
						borderWidth: 1,
						borderColor: '#868686',
						marginBottom: 20,
					}}
				>
					<Text
						style={{
							color: '#fdfffc',
							fontFamily: 'gothampro-regular',
							fontSize: 13,
							color: '#868686',
						}}
					>
						Показать другие похожие
					</Text>
				</View>
			</TouchableOpacity>
		</ScrollView>
	)
}
