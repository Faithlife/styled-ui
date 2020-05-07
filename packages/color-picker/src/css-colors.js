export function rgbColor({ r, g, b, a }) {
	return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function hslColor({ h, s, l, a }) {
	return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`;
}

export function rgbGradient(value, channel) {
	const rgbs = {
		r: (v, n) => rgbColor({ ...v, r: n * 255, a: 1 }),
		g: (v, n) => rgbColor({ ...v, g: n * 255, a: 1 }),
		b: (v, n) => rgbColor({ ...v, b: n * 255, a: 1 }),
		a: (v, n) => rgbColor({ ...v, a: n }),
	};

	const rgb0 = rgbs[channel](value, 0);
	const rgb1 = rgbs[channel](value, 1);

	return `linear-gradient(to right, ${rgb0}, ${rgb1}`;
}

export function hslGradient(value, channel) {
	const { h, s, l } = value;
	if (channel === 'h') {
		return `linear-gradient(
			to right,
			hsl(0, 100%, 50%),
			hsl(60, 100%, 50%),
			hsl(120, 100%, 50%),
			hsl(180, 100%, 50%),
			hsl(240, 100%, 50%),
			hsl(300, 100%, 50%),
			hsl(360, 100%, 50%)
		)`;
	} else if (channel === 's') {
		const hsl0 = hslColor({ h, s: 0, l, a: 1 });
		const hsl1 = hslColor({ h, s: 1, l, a: 1 });
		return `linear-gradient(to right, ${hsl0}, ${hsl1})`;
	} else if (channel === 'l') {
		const hsl0 = hslColor({ h, s, l: 0, a: 1 });
		const hsl1 = hslColor({ h, s, l: 0.5, a: 1 });
		const hsl2 = hslColor({ h, s, l: 1, a: 1 });
		return `linear-gradient(to right, ${hsl0}, ${hsl1}, ${hsl2})`;
	}
}
