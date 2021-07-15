export function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

export function numSplit(s) {
	let newS = s
		.toString()
		.split('')
		.reverse()
		.join('')
		.replace(/([0-9]{3})/g, '$1 ')
		.split('')
		.reverse()
		.join('')
		.replace(/^\s/, '')
	return newS
}
