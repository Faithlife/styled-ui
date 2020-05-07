export function hslToHsv({ h, s, l, a }) {
	const v = l + s * Math.min(l, 1 - l);
	return { h, s: v === 0 ? 0 : 2 * (1 - l / v), v, a };
}

export function hsvToHsl({ h, s, v, a }) {
	const l = v * (1 - s / 2);
	return { h, s: l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l), l, a };
}

function hslToRgbCore(n, h, s, l) {
	const k = (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
}

export function hslToRgb({ h, s, l, a }) {
	return {
		r: hslToRgbCore(0, h, s, l) * 255,
		g: hslToRgbCore(8, h, s, l) * 255,
		b: hslToRgbCore(4, h, s, l) * 255,
		a,
	};
}

export function rgbToHsl({ r, g, b, a }) {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const l = (max + min) / 2;

	let h, s;
	if (max === min) {
		h = s = 0;
	} else {
		const c = max - min;

		s = (max - l) / Math.min(l, 1 - l);
		if (max === r) {
			h = 60 * (((g - b) / c) % 6);
		} else if (max === g) {
			h = 60 * (2 + (b - r) / c);
		} else if (max === b) {
			h = 60 * (4 + (r - g) / c);
		}

		h = h < 0 ? h + 360 : h;
	}

	return { h, s, l, a };
}

export function rgbToHex({ r, g, b, a }) {
	let string = '#';
	string += Math.round(r)
		.toString(16)
		.padStart(2, 0);
	string += Math.round(g)
		.toString(16)
		.padStart(2, 0);
	string += Math.round(b)
		.toString(16)
		.padStart(2, 0);
	if (a != null && a !== 1) {
		string += Math.round(a * 255)
			.toString(16)
			.padStart(2, 0);
	}

	return string;
}

const isHexRegex = /^[0-9a-f]+$/i;
export function isHex(string) {
	string = string.replace(/^#/, '');
	if (string.length < 3 || string.length > 8 || string.length === 5 || string.length === 7) {
		return false;
	}

	return isHexRegex.test(string);
}

export function hexToRgb(string) {
	string = string.replace(/^#/, '');
	const isShortHex = string.length < 5;

	const step = isShortHex ? 1 : 2;
	let r = string.slice(0, step);
	let g = string.slice(step, step * 2);
	let b = string.slice(step * 2, step * 3);
	let a = string.slice(step * 3, step * 4);
	if (isShortHex) {
		r = r + r;
		g = g + g;
		b = b + b;
		a = a + a;
	}

	return {
		r: Number.parseInt(r, 16),
		g: Number.parseInt(g, 16),
		b: Number.parseInt(b, 16),
		a: a === '' ? 1 : Number.parseInt(a, 16) / 255,
	};
}
