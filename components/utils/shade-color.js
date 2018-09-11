// Returns a lightened or darkened version of the passed hexidecimal color code.
// Lighten by 40%
// shadeColor("#63C6FF", 40);
// Darken by 40%
// shadeColor("#63C6FF", -40);
// authored by Pablo and David Sherret
// https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors

export function shadeColor(color, percent) {
	let R = parseInt(color.substring(1, 3), 16);
	let G = parseInt(color.substring(3, 5), 16);
	let B = parseInt(color.substring(5, 7), 16);

	R = parseInt((R * (100 + percent)) / 100, 10);
	G = parseInt((G * (100 + percent)) / 100, 10);
	B = parseInt((B * (100 + percent)) / 100, 10);

	R = R < 255 ? R : 255;
	G = G < 255 ? G : 255;
	B = B < 255 ? B : 255;

	const RR = R.toString(16).length === 1 ? `0${R.toString(16)}` : R.toString(16);
	const GG = G.toString(16).length === 1 ? `0${G.toString(16)}` : G.toString(16);
	const BB = B.toString(16).length === 1 ? `0${B.toString(16)}` : B.toString(16);

	return `#${RR}${GG}${BB}`;
}
