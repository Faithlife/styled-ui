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
	flGray: '#575251',

	white: '#fff',
	gray4: '#f5f5f5',
	gray8: '#EBEBEB',
	gray14: '#DBDBDB',
	gray22: '#C7C7C7',
	gray34: '#A8A8A8',
	gray52: '#7A7A7A',
	gray66: '#3D3D3D',
	black: '#000',

	purpleTint: '#f4f0f9',
	purpleLight: '#b69bd3',
	purpleBase: '#6f4a97',
	purpleDark: '#503271',

	blueTint: '#ebf7ff',
	blueLight: '#79cafb',
	blueBase: '#1e91d6',
	blueDark: '#0174b9',
	blueActive: '#1D6CA1',

	greenTint: '#e9f8e1',
	greenLight: '#8fdb6b',
	greenBase: '#62bb46',
	greenDark: '#429c1c',

	yellowTint: '#fff8e0',
	yellowLight: '#fedb62',
	yellowBase: '#daa007',
	yellowDark: '#b58300',

	orangeTint: '#ffeee0',
	orangeLight: '#ffaf6f',
	orangeBase: '#e97732',
	orangeDark: '#c9550f',

	redTint: '#fdebeb',
	redLight: '#ee7878',
	redBase: '#d94848',
	redDark: '#bd2929',

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
	bold: 600,
});

const lineHeights = ['0px', '16px', '18px', '20px', '22px', '24px', '28px', '34px', '56px', '76px'];

// UI elements have a line-height matching the font-size
lineHeights.ui = 1;

const sizes = []; // todo

const borders = [0, '1px solid'];

const radii = [0, 3, 6];

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
	return Object.assign({}, obj, Object.values(obj));
}

function mapMediaQueries(breakpoints) {
	return Object.entries(breakpoints).reduce(
		(mq, [name, breakpoint]) => ({ ...mq, [name]: `@media screen and (min-width: ${breakpoint})` }),
		{},
	);
}
