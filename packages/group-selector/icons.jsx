// These svgs were copied from git/Logos/Sites.Admin

import { createElement } from 'react';

export function Band(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#79CAFB', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#EBF7FF',
					d:
						'M36 20h-8c-.55 0-1 .4-1 .9v34.2c0 .5.45.9 1 .9h8c.55 0 1-.4 1-.9V20.9c0-.5-.45-.9-1-.9zm-12 0h-8c-.55 0-1 .4-1 .9v34.2c0 .5.45.9 1 .9h8c.55 0 1-.4 1-.9V20.9c0-.5-.45-.9-1-.9zm24 0h-8c-.55 0-1 .4-1 .9v34.2c0 .5.45.9 1 .9h8c.55 0 1-.4 1-.9V20.9c0-.5-.45-.9-1-.9zm12 0h-8c-.55 0-1 .4-1 .9v34.2c0 .5.45.9 1 .9h8c.55 0 1-.4 1-.9V20.9c0-.5-.45-.9-1-.9z',
				}),
				createElement('path', {
					fill: '#0174B9',
					d:
						'M28 41h-4c-.55 0-1-.38-1-.84V20.84c0-.46.45-.84 1-.84h4c.55 0 1 .38 1 .84v19.32c0 .46-.45.84-1 .84zm12 0h-4c-.55 0-1-.38-1-.84V20.84c0-.46.45-.84 1-.84h4c.55 0 1 .38 1 .84v19.32c0 .46-.45.84-1 .84zm12 0h-4c-.55 0-1-.38-1-.84V20.84c0-.46.45-.84 1-.84h4c.55 0 1 .38 1 .84v19.32c0 .46-.45.84-1 .84z',
				}),
			),
		),
	);
}

export function BibleReading(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#8FDB6B', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#429C1C',
					d:
						'M59 57H17c-1.1 0-2-.85-2-1.9V22.9c0-1.05.9-1.9 2-1.9h42c1.1 0 2 .85 2 1.9v32.2c0 1.05-.9 1.9-2 1.9z',
				}),
				createElement('path', {
					fill: '#E9F8E1',
					d:
						'M38 53s-6.72-3.8-19-4a1 1 0 0 1-1-.99v-30c0-.55.46-1.01 1.02-1C31.29 17.2 38 21 38 21v32zm0 0s6.72-3.8 19-4a1 1 0 0 0 1-.99v-30c0-.55-.46-1.01-1.02-1C44.71 17.2 38 21 38 21v32z',
				}),
			),
			createElement('path', { fill: '#62BB46', d: 'M40 20l-2 1v39l2 2z' }),
		),
	);
}

export function BookReading(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FFEEE0', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#FFAF6F',
				fillRule: 'nonzero',
				d: 'M26 60a6 6 0 0 1 0-12h31v12H26z',
			}),
			createElement('path', {
				fill: '#E97732',
				fillRule: 'nonzero',
				d:
					'M56 15H24a5 5 0 0 0-5 5v34a7 7 0 0 0 7 7h30a1 1 0 1 0 0-2H26.22a5.15 5.15 0 0 1-5.2-4.5A5 5 0 0 1 26 49h30a1 1 0 0 0 1-1V16a1 1 0 0 0-1-1z',
			}),
			createElement('path', {
				fill: '#E97732',
				fillRule: 'nonzero',
				d: 'M57 55H25a1 1 0 1 1 0-2h32v2z',
			}),
			createElement('path', {
				fill: '#C9550F',
				fillRule: 'nonzero',
				d: 'M24 47a1 1 0 0 1-1-1V18a1 1 0 1 1 2 0v28a1 1 0 0 1-1 1z',
			}),
			createElement('path', {
				fill: '#FFEEE0',
				fillRule: 'nonzero',
				d: 'M47 37H33a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1z',
			}),
		),
	);
}

export function Church(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FFF8E0', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ transform: 'translate(19 12)' },
				createElement('path', {
					fill: '#FEDB62',
					fillRule: 'nonzero',
					d: 'M23 4h-3V1a1 1 0 1 0-2 0v3h-3a1 1 0 1 0 0 2h3v7a1 1 0 1 0 2 0V6h3a1 1 0 1 0 0-2z',
				}),
				createElement('path', {
					fill: '#B58300',
					fillRule: 'nonzero',
					d:
						'M28.47 29.9H9.53a.53.53 0 0 1-.53-.53v-9.48c0-.14.06-.27.15-.37l7.37-7.37a.52.52 0 0 1 .38-.15h4.2c.14 0 .28.05.38.15l7.37 7.37a.53.53 0 0 1 .15.37v9.48c0 .29-.23.52-.53.52z',
				}),
				createElement('path', {
					fill: '#DAA007',
					fillRule: 'nonzero',
					d:
						'M37 49H1a1 1 0 0 1-1-1V37a1 1 0 0 1 .3-.7L18 19h2l17.7 17.3a1 1 0 0 1 .3.7v11a1 1 0 0 1-1 1z',
				}),
				createElement('path', {
					fill: '#FEDB62',
					fillRule: 'nonzero',
					d: 'M23 49h-8v-7.33c0-2.03 1.79-3.67 4-3.67s4 1.64 4 3.67V49z',
				}),
				createElement('rect', {
					width: '6',
					height: '6',
					x: '16',
					y: '27',
					fill: '#FEDB62',
					rx: '3',
				}),
			),
		),
	);
}

export function Class(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#F4F0F9', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#503271',
				d:
					'M31.68 14h12.64a4 4 0 0 1 3.99 3.67l1.33 16A4 4 0 0 1 45.65 38h-15.3a4 4 0 0 1-3.99-4.33l1.33-16a4 4 0 0 1 4-3.67zM26 42h3v18.5a1.5 1.5 0 0 1-3 0V42zm21 0h3v18.5a1.5 1.5 0 0 1-3 0V42z',
			}),
			createElement('path', {
				fill: '#B69BD3',
				d: 'M15 28v6c.33 6.67 3.33 10 9 10s5.67-1 0-3c-4 0-6-2.33-6-7v-6h-3z',
			}),
			createElement('rect', {
				width: '32',
				height: '9',
				x: '22',
				y: '38',
				fill: '#6F4A97',
				rx: '3',
			}),
			createElement('path', {
				fill: '#B69BD3',
				d: 'M17 26h23.5a1.5 1.5 0 0 1 0 3H15v-1a2 2 0 0 1 2-2z',
			}),
		),
	);
}

export function Club(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FDEBEB', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#D94848',
				d:
					'M55.63 44.22l11.3.57-3.32 4.28 2.68 4.7-10.66-.55zm-35.34 0L9 44.79l3.3 4.28-2.67 4.7 10.66-1.55z',
			}),
			createElement('path', {
				fill: '#BD2929',
				d:
					'M22 17h32a1 1 0 0 1 1 1v26c0 7.58-5.67 13.24-17 17-11.33-3.82-17-9.49-17-17V18a1 1 0 0 1 1-1z',
			}),
			createElement('path', {
				fill: '#FDEBEB',
				d:
					'M37.98 31.56l-3.86 2.03.73-4.3-3.12-3.05 4.32-.62 1.93-3.92 1.93 3.92 4.32.62-3.13 3.05.74 4.3z',
			}),
			createElement('path', {
				fill: '#EE7878',
				d:
					'M15 40a134 134 0 0 1 23-2 134 134 0 0 1 23 2v10a134 134 0 0 0-23-2 134 134 0 0 0-23 2V40z',
			}),
		),
	);
}

export function Committee(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FFF8E0', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#B58300',
				d:
					'M35.6 19c-1.99 0-3.6 1.73-3.6 3.89v2.59c0 .35.24.77.53.93l5.5 1.59 5.42-1.61c.3-.15.55-.55.55-.91v-2.6c0-2.14-1.6-3.88-3.6-3.88h-4.8z',
			}),
			createElement('circle', { cx: '38', cy: '14', r: '4', fill: '#DAA007' }),
			createElement('path', {
				fill: '#DAA007',
				d:
					'M35.6 57c-1.99 0-3.6 1.73-3.6 3.89v2.59c0 .35.24.77.53.93l5.5 1.59 5.42-1.61c.3-.15.55-.55.55-.91v-2.6c0-2.14-1.6-3.88-3.6-3.88h-4.8z',
			}),
			createElement('circle', { cx: '38', cy: '52', r: '4', fill: '#FEDB62' }),
			createElement('path', {
				fill: '#B58300',
				d:
					'M55.6 51c-1.99 0-3.6 1.73-3.6 3.89v2.59c0 .35.24.77.53.93l5.5 1.59 5.42-1.61c.3-.15.55-.55.55-.91v-2.6c0-2.14-1.6-3.88-3.6-3.88h-4.8z',
			}),
			createElement('circle', { cx: '58', cy: '46', r: '4', fill: '#DAA007' }),
			createElement('path', {
				fill: '#DAA007',
				d:
					'M55.6 27c-1.99 0-3.6 1.73-3.6 3.89v2.59c0 .35.24.77.53.93l5.5 1.59 5.42-1.61c.3-.15.55-.55.55-.91v-2.6c0-2.14-1.6-3.88-3.6-3.88h-4.8z',
			}),
			createElement('circle', { cx: '58', cy: '22', r: '4', fill: '#FEDB62' }),
			createElement('path', {
				fill: '#B58300',
				d:
					'M15.6 51c-1.99 0-3.6 1.73-3.6 3.89v2.59c0 .35.24.77.53.93l5.5 1.59 5.42-1.61c.3-.15.55-.55.55-.91v-2.6c0-2.14-1.6-3.88-3.6-3.88h-4.8z',
			}),
			createElement('circle', { cx: '18', cy: '46', r: '4', fill: '#DAA007' }),
			createElement('path', {
				fill: '#DAA007',
				d:
					'M15.6 27c-1.99 0-3.6 1.73-3.6 3.89v2.59c0 .35.24.77.53.93l5.5 1.59 5.42-1.61c.3-.15.55-.55.55-.91v-2.6c0-2.14-1.6-3.88-3.6-3.88h-4.8z',
			}),
			createElement('circle', { cx: '18', cy: '22', r: '4', fill: '#FEDB62' }),
		),
	);
}

export function Denomination(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FFF8E0', d: 'M0 0h76v76H0z' }),
			createElement('path', { fill: '#B58300', d: 'M40 35V24h14l6 5.5-6 5.5z' }),
			createElement('path', {
				fill: '#DAA007',
				d: 'M36 46V35H22l-6 5.5 6 5.5zm0-22V13H22l-6 5.5 6 5.5z',
			}),
			createElement('path', {
				fill: '#FEDB62',
				d: 'M36 11h4v49h-4zm-7 49h18a4 4 0 0 1 4 4v2H25v-2a4 4 0 0 1 4-4z',
			}),
		),
	);
}

export function DiscussionTopic(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FFEEE0', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#E97732',
				d:
					'M36 34h27a2 2 0 0 1 2 2v23.06a1 1 0 0 1-1.58.81L58 56H36a2 2 0 0 1-2-2V36a2 2 0 0 1 2-2z',
			}),
			createElement('path', {
				fill: '#FFAF6F',
				d:
					'M20.43 43.72l-3.76 3.36a1 1 0 0 1-1.67-.74v-5.4A11.97 11.97 0 0 1 11 32v-2a12 12 0 0 1 12-12h9a12 12 0 0 1 12 12v2a12 12 0 0 1-12 12h-9c-.88 0-1.74-.1-2.57-.28z',
			}),
			createElement(
				'g',
				{ fill: '#E97732', transform: 'translate(17 29)' },
				createElement('rect', { width: '5', height: '5', rx: '2.5' }),
				createElement('rect', { width: '5', height: '5', x: '8', rx: '2.5' }),
				createElement('rect', { width: '5', height: '5', x: '16', rx: '2.5' }),
			),
			createElement(
				'g',
				{ fill: '#C9550F', transform: 'translate(39 43)' },
				createElement('rect', { width: '5', height: '5', rx: '2.5' }),
				createElement('rect', { width: '5', height: '5', x: '8', rx: '2.5' }),
				createElement('rect', { width: '5', height: '5', x: '16', rx: '2.5' }),
			),
		),
	);
}

export function Family(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#EBF7FF', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#0174B9',
					d:
						'M28 31h6a5 5 0 0 1 5 5v7c0 .55-.42 1.14-.95 1.31L36 45l-.92 11c-.04.54-.53 1-1.08 1h-6a1.11 1.11 0 0 1-1.08-1L26 45l-2.07-.83A1.6 1.6 0 0 1 23 42.8V36a5 5 0 0 1 5-5zm3-2a5 5 0 1 1 0-10 5 5 0 0 1 0 10z',
				}),
				createElement('path', {
					fill: '#1E91D6',
					d:
						'M45.06 34h4.88c2.24 0 4.06 1.98 4.06 4.43v6.19c0 .48-.34 1-.77 1.16l-1.67.6-.74 9.73c-.04.49-.43.89-.88.89h-4.88c-.44 0-.84-.4-.88-.89l-.74-9.73-1.68-.73a1.42 1.42 0 0 1-.76-1.22v-6c0-2.46 1.82-4.43 4.06-4.43zm2.44-2a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm-34.06 8h4.13c1.89 0 3.43 1.47 3.43 3.27v4.58c0 .36-.3.74-.65.86l-1.41.44-.63 7.2a.75.75 0 0 1-.74.65h-4.13a.75.75 0 0 1-.75-.66l-.63-7.19-1.42-.54a1.05 1.05 0 0 1-.64-.9v-4.44A3.35 3.35 0 0 1 13.44 40zm2.06-1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z',
				}),
				createElement('path', {
					fill: '#79CAFB',
					d:
						'M59.12 42h3.76A3.05 3.05 0 0 1 66 44.97v4.16c0 .32-.27.67-.6.78l-1.28.4-.36 6.1a.68.68 0 0 1-.67.59h-3.76a.68.68 0 0 1-.67-.6l-.78-6.09-1.3-.49A.95.95 0 0 1 56 49v-4.03c0-1.65 1.4-2.97 3.12-2.97zm1.88-.97a3 3 0 0 1-3-3.02A3 3 0 0 1 61 35a3 3 0 0 1 3 3.02 3 3 0 0 1-3 3.01z',
				}),
			),
		),
	);
}

export function General(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#E9F8E1', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#8FDB6B',
				fillRule: 'nonzero',
				d:
					'M24 29a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm-3 2h6a5 5 0 0 1 5 5v7c0 .55-.42 1.14-.95 1.31L29 45l-.92 11c-.04.54-.53 1-1.08 1h-6a1.11 1.11 0 0 1-1.08-1L19 45l-2.07-.83A1.6 1.6 0 0 1 16 42.8V36a5 5 0 0 1 5-5zm30-.62a4.68 4.68 0 0 1-4.67-4.69c0-2.59 2.1-4.69 4.67-4.69a4.68 4.68 0 0 1 0 9.38zm-2.63 1.17h5.26A4.45 4.45 0 0 1 58 36.07v6.3c0 .5-.37 1.03-.83 1.2l-1.8.6-.8 9.93c-.04.49-.46.9-.94.9h-5.26c-.47 0-.9-.4-.94-.9l-.8-9.92-1.81-.75A1.44 1.44 0 0 1 44 42.2v-6.13c0-2.5 1.96-4.5 4.37-4.5z',
			}),
			createElement('path', {
				fill: '#429C1C',
				fillRule: 'nonzero',
				d:
					'M38 27a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm-4 2h8a6 6 0 0 1 6 6v9c0 .56-.41 1.18-.92 1.4l-3.14 1.4L43 60.08a1 1 0 0 1-1 .92h-8a1 1 0 0 1-1-.92L32 47l-3.11-1.56c-.5-.24-.89-.89-.89-1.44v-9a6 6 0 0 1 6-6z',
			}),
		),
	);
}

export function LeadershipGroup(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#F4F0F9', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#B69BD3',
				fillRule: 'nonzero',
				d:
					'M24 29a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm-3 2h6a5 5 0 0 1 5 5v7c0 .55-.42 1.14-.95 1.31L29 45l-.92 11c-.04.54-.53 1-1.08 1h-6a1.11 1.11 0 0 1-1.08-1L19 45l-2.07-.83A1.6 1.6 0 0 1 16 42.8V36a5 5 0 0 1 5-5zm30-.62a4.68 4.68 0 0 1-4.67-4.69c0-2.59 2.1-4.69 4.67-4.69a4.68 4.68 0 0 1 0 9.38zm-2.63 1.17h5.26A4.45 4.45 0 0 1 58 36.07v6.3c0 .5-.37 1.03-.83 1.2l-1.8.6-.8 9.93c-.04.49-.46.9-.94.9h-5.26c-.47 0-.9-.4-.94-.9l-.8-9.92-1.81-.75A1.44 1.44 0 0 1 44 42.2v-6.13c0-2.5 1.96-4.5 4.37-4.5z',
			}),
			createElement('path', {
				fill: '#503271',
				fillRule: 'nonzero',
				d:
					'M38 27a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm-4 2h8a6 6 0 0 1 6 6v9c0 .56-.41 1.18-.92 1.4l-3.14 1.4L43 60.08a1 1 0 0 1-1 .92h-8a1 1 0 0 1-1-.92L32 47l-3.11-1.56c-.5-.24-.89-.89-.89-1.44v-9a6 6 0 0 1 6-6z',
			}),
		),
	);
}

export function Marriage(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#F4F0F9', d: 'M0 0h76v76H0z' }),
			createElement('path', { fill: '#503271', d: 'M57 24v11h11z' }),
			createElement('path', {
				fill: '#6F4A97',
				fillRule: 'nonzero',
				d:
					'M31 13c-9.93 0-18 8.07-18 18s8.07 18 18 18 18-8.07 18-18-8.07-18-18-18zm0 33c-8.27 0-15-6.73-15-15s6.73-15 15-15 15 6.73 15 15-6.73 15-15 15zm37-16l-6-6h-5l11 11z',
			}),
			createElement('path', {
				fill: '#B69BD3',
				fillRule: 'nonzero',
				d:
					'M58.18 33.73a18.02 18.02 0 0 0-25.45 0 18.02 18.02 0 0 0 0 25.45 18.02 18.02 0 0 0 25.45 0 18.02 18.02 0 0 0 0-25.45zM34.85 57.06a15.02 15.02 0 0 1 0-21.21 15.02 15.02 0 0 1 21.21 0 15.02 15.02 0 0 1 0 21.21 15.02 15.02 0 0 1-21.21 0z',
			}),
		),
	);
}

export function MinistryOrganization(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#EBF7FF', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#79CAFB',
				fillRule: 'nonzero',
				d: 'M42 17h-3v-3a1 1 0 1 0-2 0v3h-3a1 1 0 1 0 0 2h3v7a1 1 0 1 0 2 0v-7h3a1 1 0 1 0 0-2z',
			}),
			createElement('path', {
				fill: '#0174B9',
				fillRule: 'nonzero',
				d:
					'M25 64h-9a1 1 0 0 1-1-1V45a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm35 0h-9a1 1 0 0 1-1-1V45a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1z',
			}),
			createElement('path', {
				fill: '#1E91D6',
				fillRule: 'nonzero',
				d: 'M52 64H24V27a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v37z',
			}),
			createElement('path', {
				fill: '#79CAFB',
				fillRule: 'nonzero',
				d:
					'M35 36h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1zm10 0h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1zm-10 8h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1zm10 0h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1zm-10 8h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1zm10 0h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1zm-5 4a1 1 0 0 1 1 1v7h-6v-7a1 1 0 0 1 1-1h4z',
			}),
		),
	);
}

export function Missionary(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#EBF7FF', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#79CAFB',
				fillRule: 'nonzero',
				d:
					'M26 50l-.74-8.17a2.6 2.6 0 0 1 5.13-.7l1.29 7.1A20 20 0 0 1 32 51.8V60H21l-4.72-7.86A9 9 0 0 1 15 47.5V30.17a2.17 2.17 0 0 1 4.3-.36l2.28 13.66a8 8 0 0 0 2.23 4.34L26 50zm24 0l.74-8.17a2.6 2.6 0 0 0-5.13-.7l-1.29 7.1A20 20 0 0 0 44 51.8V60h11l4.72-7.86A9 9 0 0 0 61 47.5V30.17a2.17 2.17 0 0 0-4.3-.36l-2.28 13.66a8 8 0 0 1-2.23 4.34L50 50z',
			}),
			createElement('path', { fill: '#1E91D6', d: 'M43 60h14v5H43zm-24 0h14v5H19z' }),
			createElement(
				'g',
				{ stroke: '#0174B9', strokeWidth: '2', transform: 'translate(27 12)' },
				createElement('path', { d: 'M0 11h22' }),
				createElement('circle', { cx: '11', cy: '11', r: '11', strokeLinecap: 'square' }),
				createElement('ellipse', {
					cx: '11',
					cy: '11',
					strokeLinecap: 'square',
					rx: '4.71',
					ry: '11',
				}),
			),
		),
	);
}

export function NotablePerson(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FFAF6F', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#C9550F',
				d:
					'M38 54l-14.66 7.71a1 1 0 0 1-1.45-1.05l2.8-16.33-11.87-11.57a1 1 0 0 1 .56-1.7l16.4-2.39 7.32-14.85a1 1 0 0 1 1.8 0l7.33 14.85 16.4 2.39a1 1 0 0 1 .55 1.7L51.3 44.33l2.8 16.33a1 1 0 0 1-1.45 1.05L38 54z',
			}),
			createElement('path', {
				fill: '#FFEEE0',
				d:
					'M35.6 41h4.8c2 0 3.6 1.74 3.6 3.89v2.59c0 .36-.25.76-.55.9L38 49.5l-5.47-1.09c-.3-.16-.53-.58-.53-.93v-2.6c0-2.15 1.61-3.88 3.6-3.88zm2.4-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z',
			}),
		),
	);
}

export function Organization(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#EBF7FF', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#444',
					d: 'M35 24a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1z',
				}),
				createElement('path', {
					fill: '#0174B9',
					d:
						'M43 22h-3v-5a1 1 0 0 0-1-1h-8a1 1 0 0 0-1 1v5h-3a1 1 0 0 0-1 1v40a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V23a1 1 0 0 0-1-1z',
				}),
				createElement('path', {
					fill: '#79CAFB',
					d: 'M60.67 37H39.33c-.73 0-1.33.46-1.33 1.04V64h24V38.04c0-.58-.6-1.04-1.33-1.04z',
				}),
				createElement('path', {
					fill: '#0174B9',
					d:
						'M45 57a1 1 0 0 1 1 1v6h-4v-6a1 1 0 0 1 1-1h2zm0-11h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm6 0h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm-6 6h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm6 0h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm6-6h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm0 6h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z',
				}),
				createElement('path', {
					fill: '#1E91D6',
					d:
						'M33 29h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm6 0h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm-6 6h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm0 6h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm6-6h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zM31 43H15c-.55 0-1 .47-1 1.05v18.9c0 .58.45 1.05 1 1.05h17V44.05c0-.58-.45-1.05-1-1.05z',
				}),
				createElement('path', {
					fill: '#79CAFB',
					d:
						'M24 58a1 1 0 0 1 1 1v5h-4v-5a1 1 0 0 1 1-1h2zm-3-5h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm6 0h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z',
				}),
			),
		),
	);
}

export function Pastor(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#EBF7FF', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#0174B9',
				d: 'M25 55h26a4 4 0 0 1 4 4v2H21v-2a4 4 0 0 1 4-4z',
			}),
			createElement('path', { fill: '#1E91D6', d: 'M20 19h36l-5 36H25z' }),
			createElement('path', {
				fill: '#79CAFB',
				d: 'M16 16h44v4a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6v-4z',
			}),
			createElement('path', { fill: '#EBF7FF', d: 'M39 37h4v2h-4v9h-2v-9h-4v-2h4v-4h2v4z' }),
		),
	);
}

export function Pericopes(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#F4F0F9', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#6F4A97',
				d:
					'M43 33a15 15 0 1 0-27.73 7.9h-.05l11.92 18.88a3.26 3.26 0 0 0 2.47 1.36h1.95c.89 0 1.23-.61.75-1.36L24.62 47.6A15 15 0 0 0 43 33',
			}),
			createElement('path', {
				fill: '#B69BD3',
				d:
					'M63 33a15 15 0 1 0-27.73 7.9h-.05l11.92 18.88a3.26 3.26 0 0 0 2.47 1.36h1.95c.89 0 1.23-.61.75-1.36L44.62 47.6A15 15 0 0 0 63 33',
			}),
		),
	);
}

export function Proclaim(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#E9F8E1', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#62BB46',
				d: 'M18 17c-1.83 0-4 2.22-4 4.1V59l6.94-6.88h37.98c2 0 4.08-2.45 4.08-4.5V17H18z',
			}),
		),
	);
}

export function Publisher(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FDEBEB', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ transform: 'translate(12 27)' },
				createElement('path', {
					stroke: '#EE7878',
					strokeWidth: '3',
					d:
						'M26 20.04l23.83-5.96M26 19.5l20.04-13L26 19.5zm0 .54L2.17 14.08m24.37 5.42L6.5 6.5l20.04 13zM26 18.42L13 0l13 18.42zm0 0L39 0 26 18.42z',
				}),
				createElement('rect', { width: '52', height: '4', y: '20', fill: '#BD2929', rx: '1' }),
			),
		),
	);
}

export function RadioStation(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FDEBEB', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#D94848',
				d: 'M45.39 64a7.96 7.96 0 0 0-14.78 0h-4.7L36.2 32c.79.17 2.65.17 3.44 0L49.9 64H45.4z',
			}),
			createElement('path', { fill: '#BD2929', d: 'M43 28a5 5 0 1 1-10 0 5 5 0 0 1 10 0' }),
			createElement('path', {
				fill: '#EE7878',
				d:
					'M22.05 19.22l6.75 6.75-13.44-2.12 3.22-2.44-6.75-6.75 13.43 2.12-3.21 2.44zm32.53 0l-6.75 6.75 13.43-2.12-3.21-2.44 6.75-6.75-13.44 2.12 3.22 2.44zM22.05 38.4l6.75-6.75-13.44 2.12 3.22 2.44-6.75 6.75 13.43-2.12-3.21-2.44zm32.53 0l-6.75-6.75 13.43 2.12-3.21 2.44 6.75 6.75-13.44-2.12 3.22-2.44z',
			}),
		),
	);
}

export function School(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FDEBEB', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#BD2929',
					d: 'M38 29a1 1 0 0 1-1-1V16a1 1 0 0 1 2 0v12a1 1 0 0 1-1 1z',
				}),
				createElement('path', {
					fill: '#EE7878',
					d: 'M48 25h-9v-8h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1z',
				}),
				createElement('path', {
					fill: '#D94848',
					d:
						'M40 61v-5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5H18a1 1 0 0 1-1-1V44a1 1 0 0 1 1-1h40a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H40z',
				}),
				createElement('path', {
					fill: '#BD2929',
					d: 'M48.63 35.22l-10-8a1 1 0 0 0-1.26 0l-10 8A1 1 0 0 0 27 36v7h22v-7a1 1 0 0 0-.38-.78z',
				}),
				createElement('path', {
					fill: '#EE7878',
					d:
						'M39 40h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zM24 54h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm7 0h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm16 0h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1zm7 0h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1z',
				}),
			),
		),
	);
}

export function Search(props) {
	return createElement(
		'svg',
		{ width: '18', height: '18', viewBox: '0 0 18 18', ...props },
		createElement('path', {
			fill: '#888',
			d:
				'M12.94 11.06L13 11l4 4.5-1.5 1.5-4.5-4 .06-.06a6.5 6.5 0 1 1 1.88-1.88zm-5.44.44a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
		}),
	);
}

export function SmallGroup(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#E9F8E1', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#8FDB6B',
					d: 'M56 43H20a1 1 0 0 1-1-1V25a5 5 0 0 1 5-5h28a5 5 0 0 1 5 5v17a1 1 0 0 1-1 1z',
				}),
				createElement('path', { fill: '#62BB46', d: 'M37 20h2v23h-2z' }),
				createElement('path', {
					fill: '#429C1C',
					d:
						'M20 56a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1zm36 0a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1z',
				}),
				createElement('path', {
					fill: '#62BB46',
					d:
						'M57 52H19a4 4 0 0 1-4-4V37.74c0-2.87 2.1-5.43 4.95-5.71A5.5 5.5 0 0 1 26 37.5V41h24v-3.25c0-2.88 2.1-5.44 4.95-5.72A5.5 5.5 0 0 1 61 37.5V48a4 4 0 0 1-4 4z',
				}),
			),
		),
	);
}

export function SpecialInterest(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#FDEBEB', d: 'M0 0h76v76H0z' }),
			createElement('path', {
				fill: '#BD2929',
				d:
					'M38.5 53.25L24.13 60.8a1 1 0 0 1-1.45-1.05l2.74-16L13.8 32.42a1 1 0 0 1 .55-1.7l16.07-2.34 7.18-14.56a1 1 0 0 1 1.8 0l7.18 14.56 16.07 2.33a1 1 0 0 1 .55 1.7L51.58 43.76l2.74 16a1 1 0 0 1-1.45 1.06L38.5 53.25z',
			}),
		),
	);
}

export function SportsTeam(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#EE7878', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#BD2929',
					stroke: '#BD2929',
					d:
						'M9.52 65.96a.52.52 0 0 1-.52-.52v-5.22c0-.3.23-.52.52-.52h5.3c.44-2.05.44-4.22.44-5.61v-.13a.52.52 0 0 1 1.04 0v.13c0 1.39 0 3.52-.41 5.6H21a.52.52 0 0 1 0 1.05h-5.37l-.13.45c-1.03 3.16-3.04 4.77-5.98 4.77zm.52-5.22v4.15c2.19-.18 3.65-1.5 4.47-4.02a7.83 7.83 0 0 0 .04-.13h-4.5z',
				}),
				createElement('path', {
					fill: '#FDEBEB',
					d:
						'M25.17 67C22.58 67 20 64.9 20 62.3v-6.26c0-.86-.14-1.04-1-1.04H9.5c-.15 0-.21-.58-.31-.7-.1-.1-.22.28-.21.13C9.54 48.21 14.75 43 21 43a12.1 12.1 0 0 1 12 10.91v2.13c0 1.18-.85 2.05-1.68 2.89-.74.76-1.45 1.48-1.45 2.33v1.04a4.7 4.7 0 0 1-4.7 4.7z',
				}),
				createElement('path', { fill: '#EE7878', d: 'M25 64a2 2 0 1 1 0-4 2 2 0 0 1 0 4z' }),
			),
			createElement(
				'g',
				{ fillRule: 'nonzero' },
				createElement('path', {
					fill: '#FDEBEB',
					d: 'M21 33a12.01 12.01 0 1 1 12-12c0 6.62-5.38 12-12 12z',
				}),
				createElement('path', {
					fill: '#BD2929',
					d:
						'M24.01 25.7H18a.52.52 0 0 1-.5-.36l-1.86-5.73a.52.52 0 0 1 .2-.59l4.86-3.54a.52.52 0 0 1 .62 0l4.87 3.54a.52.52 0 0 1 .19.59l-1.86 5.73a.52.52 0 0 1-.5.36zM17.52 9.85l3.18 2.3a.52.52 0 0 0 .6 0l3.18-2.3a.52.52 0 0 0 .19-.27 11.96 11.96 0 0 0-7.34 0 .52.52 0 0 0 .2.27zm-8.2 11.01l3.16-2.3a.52.52 0 0 0 .19-.59l-1.2-3.72a.52.52 0 0 0-.2-.26A11.93 11.93 0 0 0 9 20.96h.01a.52.52 0 0 0 .31-.1zm7.94 11.2l-1.22-3.71a.52.52 0 0 0-.5-.36l-3.9-.02a.52.52 0 0 0-.32.12 12.04 12.04 0 0 0 5.94 4.3.51.51 0 0 0 0-.33zm13.1-4.09l-3.9.02a.52.52 0 0 0-.5.36l-1.22 3.71a.52.52 0 0 0 0 .34 12.05 12.05 0 0 0 5.94-4.31.52.52 0 0 0-.32-.12zm.17-13.72l-1.2 3.72a.52.52 0 0 0 .19.58l3.16 2.31c.09.07.2.1.3.1H33A11.93 11.93 0 0 0 30.73 14a.52.52 0 0 0-.2.26z',
				}),
			),
			createElement('path', {
				fill: '#FDEBEB',
				fillRule: 'nonzero',
				stroke: '#FDEBEB',
				d:
					'M65.48 12H42.52a.52.52 0 0 0-.52.52v2.09c0 .29.23.52.52.52h1.61l1.52 16.22a.52.52 0 0 0 .89.33l3.2-3.1 3.88 4.13a.52.52 0 0 0 .76 0l3.88-4.13 3.2 3.1a.52.52 0 0 0 .89-.33l1.52-16.22h1.6a.52.52 0 0 0 .53-.52v-2.09a.52.52 0 0 0-.52-.52zm-12.74 3.13l-3.36 3.38-3.48-3.38h6.84zm9.36 0l-3.48 3.38-3.36-3.38h6.84zm-13.46 4.12l-2.8 2.81-.58-6.1 3.38 3.29zm.75.72l3.86 3.75-3.48 3.37-3.63-3.86 3.25-3.26zm.74-.74L54 15.35l3.87 3.88L54 23l-3.87-3.76zm8.48.74l3.25 3.26-3.63 3.86-3.48-3.38 3.86-3.74zm3.56 2.1l-2.81-2.83 3.38-3.27-.57 6.1zm-15.58 8.1l-.51-5.49 2.94 3.14-2.43 2.35zM54 31.6l-3.51-3.74 3.51-3.4 3.51 3.4L54 31.59zm7.4-1.42l-2.42-2.35 2.94-3.14-.51 5.5z',
			}),
			createElement('path', { fill: '#BD2929', d: 'M41 11h26v4H41z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero', transform: 'translate(44 45)' },
				createElement('circle', { cx: '10', cy: '10', r: '10', fill: '#FDEBEB' }),
				createElement('path', {
					fill: '#D94848',
					d:
						'M9.96 0c.02.26.04.51.04.77a9.24 9.24 0 0 1-10 9.2V10c0 .51.05 1.01.13 1.5.21.02.42.04.64.04C6.7 11.54 11.54 6.7 11.54.77c0-.22-.02-.43-.03-.64A10.03 10.03 0 0 0 10 0h-.04zM10 19.23a9.24 9.24 0 0 1 10-9.2V10c0-.51-.05-1.01-.13-1.5-.21-.02-.42-.04-.64-.04A10.78 10.78 0 0 0 8.46 19.23c0 .22.02.43.03.65.5.07 1 .12 1.51.12h.04a9.25 9.25 0 0 1-.04-.77z',
				}),
			),
		),
	);
}

export function WorshipTeam(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#E9F8E1', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ fillRule: 'nonzero', transform: 'translate(15 14)' },
				createElement('path', {
					fill: '#8FDB6B',
					d:
						'M15 47C6.73 47 0 40.27 0 32c0-4.51 2.02-8.74 5.53-11.6a1 1 0 0 1 1.4.13A3.98 3.98 0 0 0 10 22a4 4 0 0 0 4-4c0-.31-.05-.64-.16-1.04a1 1 0 0 1 .22-.93A12 12 0 0 1 23 12c6.62 0 12 5.38 12 12a12 12 0 0 1-4.03 8.94 1 1 0 0 1-.93.22A3.97 3.97 0 0 0 29 33a3.98 3.98 0 1 0-2.53 7.07 1 1 0 0 1 .14 1.4A14.93 14.93 0 0 1 15 47z',
				}),
				createElement('path', { fill: '#62BB46', d: 'M37.59 6.59L40.4 9.4l-16 16-2.82-2.82z' }),
				createElement('circle', { cx: '23', cy: '24', r: '5', fill: '#429C1C' }),
				createElement('path', {
					fill: '#429C1C',
					d:
						'M38.88 11.7l-3.59-3.58a1 1 0 0 1 0-1.41l5.59-5.59a1 1 0 0 1 1.41 0l3.59 3.59a1 1 0 0 1 0 1.41l-5.59 5.59a1 1 0 0 1-1.41 0z',
				}),
				createElement('path', {
					fill: '#62BB46',
					d: 'M16 37a1 1 0 0 1-.7-.3l-5-5a1 1 0 1 1 1.4-1.4l5 5A1 1 0 0 1 16 37z',
				}),
			),
		),
	);
}

export function YouthGroup(props) {
	return createElement(
		'svg',
		{ ...props },
		createElement(
			'g',
			{ fill: 'none', fillRule: 'evenodd' },
			createElement('path', { fill: '#EBF7FF', d: 'M0 0h76v76H0z' }),
			createElement(
				'g',
				{ transform: 'translate(22 12)' },
				createElement('path', {
					fill: '#0174B9',
					d:
						'M9.6 27C4.3 27 0 31.63 0 37.37v6.9c0 .95.64 2.07 1.42 2.5L16.07 51l14.46-4.3A2.9 2.9 0 0 0 32 44.27v-6.9C32 31.64 27.72 27 22.4 27H9.6z',
				}),
				createElement('path', {
					fill: '#1E91D6',
					d: 'M18 34h8v5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5z',
				}),
				createElement('circle', { cx: '16', cy: '16', r: '9', fill: '#79CAFB' }),
				createElement('path', {
					fill: '#1E91D6',
					d:
						'M26.21 13.98l7.88 1.4-.35 1.96-27.57-4.86.35-1.97.34-1.97a8 8 0 0 1 9.27-6.5l3.94.7a8 8 0 0 1 6.5 9.27l-.36 1.97z',
				}),
			),
		),
	);
}
