import { Animated } from 'react-native'

function handlePressIn(objRef) {
	Animated.spring(objRef, {
		toValue: 0.95,
		useNativeDriver: false,
	}).start()
}
function handlePressOut(objRef) {
	Animated.spring(objRef, {
		toValue: 1,
		friction: 3,
		tension: 40,
		useNativeDriver: false,
	}).start()
}

export { handlePressIn, handlePressOut }
