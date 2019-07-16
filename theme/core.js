const mediaSizes = {
	phone: '579px',
	tablet: '768px',
	desktop: '992px',
};

const breakpoints = indexed(mediaSizes);

const mediaQueries = mapMediaQueries(mediaSizes);

const space = [0, 2, 4, 8, 12, 16, 24, 32, 64, 96];

const fontSizes = [
	'12px',
	'13px',
	'14px',
	'16px',
	'18px',
	'22px',
	'24px',
	'28px',
	'36px',
	'48px',
	'64px',
];

const colors = {
	white: '#ffffff',
	gray4: '#f5f5f5',
	gray8: '#ebebeb',
	gray14: '#dbdbdb',
	gray22: '#c7c7c7',
	gray34: '#a8a8a8',
	gray52: '#7a7a7a',
	gray66: '#3d3d3d',
	black: '#000000',
	flGray: '#575251',

	blue1: '#ebf7ff',
	blue2: '#d5ecfc',
	blue3: '#79cafb',
	blue4: '#1e91d6',
	blue5: '#0174b9',

	green1: '#e9f8e1',
	green2: '#8fdb6b',
	green3: '#cff4bd',
	green4: '#62bb46',
	green5: '#429c1c',

	lime1: '#f3fad1',
	lime2: '#e5f1a8',
	lime3: '#cce452',
	lime4: '#98b600',
	lime5: '#758c00',

	orange1: '#ffeee0',
	orange2: '#ffdcbf',
	orange3: '#ffaf6f',
	orange4: '#e97732',
	orange5: '#c9550f',

	pink1: '#ffeff5',
	pink2: '#fedbe8',
	pink4: '#cc5080',
	pink3: '#de7da2',
	pink5: '#9a2351',

	purple1: '#f4f0f9',
	purple2: '#e1d2f2',
	purple3: '#b69bd3',
	purple5: '#503271',
	purple4: '#6f4a97',

	red1: '#fdebeb',
	red2: '#f9c8c8',
	red3: '#ee7878',
	red4: '#d94848',
	red5: '#bd2929',

	teal1: '#e3fff8',
	teal2: '#cef9ed',
	teal3: '#5be7c1',
	teal4: '#00ba88',
	teal5: '#009e74',

	yellow1: '#fff8e0',
	yellow2: '#ffefb9',
	yellow3: '#fedb62',
	yellow4: '#daa007',
	yellow5: '#b58300',

	borderColor: '#C7C7C7',
	inputBorderColor: '#C7C7C7',
	inputFocusedBorderColor: '#278ed4',
	inputFocusedShadowColor: '#d0e6f6',
};

const fonts = {
	normal: '"Source Sans Pro", sans-serif',
};

const fontWeights = indexed({
	regular: 400,
	semibold: 600,
	bold: 600,
});

const lineHeights = ['0px', '16px', '18px', '20px', '22px', '24px', '28px', '34px', '56px', '76px'];

// UI elements have a line-height matching the font-size
lineHeights.ui = 1;

const sizes = []; // todo

const borders = [0, '1px solid'];

const radii = ['0px', '3px', '6px'];

const shadows = ['0 4px 4px 0 rgba(0, 0, 0, 0.12), 0 0 4px 0 rgba(0, 0, 0, 0.12)'];

const zIndices = indexed({
	normal: 0,
	below: -1,
	above: 1,
	modal: 100,
	toast: 1000,
	menu: 10000,
});

const theme = {
	space,
	fontSizes,
	colors,
	fonts,
	fontWeights,
	lineHeights,
	sizes,
	borders,
	radii,
	shadows,
	zIndices,
	breakpoints,
	mediaQueries,
};

export { theme, breakpoints, mediaQueries };

function indexed(obj) {
	return Object.assign([], obj, Object.values(obj));
}

function mapMediaQueries(breakpoints) {
	return Object.entries(breakpoints).reduce(
		(mq, [name, breakpoint]) => ({ ...mq, [name]: `@media screen and (min-width: ${breakpoint})` }),
		{},
	);
}
