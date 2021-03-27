import * as Font from 'expo-font'

export async function bootstrap() {
	await Font.loadAsync({
		'gothampro-regular': require('../assets/fonts/GothamPro-Regular.ttf'),
		'gothampro-italic': require('../assets/fonts/GothamPro-Italic.ttf'),
		'gothampro-bold': require('../assets/fonts/GothamPro-Bold.ttf'),
		'gothampro-bolditalic': require('../assets/fonts/GothamPro-BoldItalic.ttf'),
	})
}
