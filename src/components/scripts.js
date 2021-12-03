export function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

export function numSplit(s) {
	let newS = s
		? s
				.toString()
				.split('')
				.reverse()
				.join('')
				.replace(/([0-9]{3})/g, '$1 ')
				.split('')
				.reverse()
				.join('')
				.replace(/^\s/, '')
		: 0
	return newS
}

export function phoneMask(input) {
	input = input.toString()
	let matrix = '+7 (___) ___-__-__',
		i = 0,
		def = matrix.replace(/\D/g, ''),
		val = input.replace(/\D/g, '')

	if (def.length >= val.length) {
		val = def
	}

	input = matrix.replace(/./g, function (a) {
		return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
	})

	return input
}
