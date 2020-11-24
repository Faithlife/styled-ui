import { theme } from '../../index';

const filteredColors = Object.fromEntries(
	Object.entries(theme.colors).filter(([_, value]) => typeof value === 'string'),
);

const spaceProps = {
	name: 'Space',
	props: [
		['margin', theme.space],
		['marginTop', theme.space],
		['margin', theme.space],
		['marginTop', theme.space],
		['marginRight', theme.space],
		['marginBottom', theme.space],
		['marginLeft', theme.space],
		['marginX', theme.space],
		['paddingY', theme.space],
		['padding', theme.space],
		['paddingTop', theme.space],
		['paddingRight', theme.space],
		['paddingBottom', theme.space],
		['paddingLeft', theme.space],
		['paddingX', theme.space],
		['paddingY', theme.space],
	],
};

const colorProps = {
	name: 'Color',
	props: [['color', filteredColors], ['backgroundColor', filteredColors], 'opacity'],
};

const typographyProps = {
	name: 'Typography',
	props: [
		['fontFamily', theme.fonts],
		['fontSize', theme.fontSizes],
		['fontWeight', theme.fontWeights],
		['lineHeight', theme.lineHeights],
		'letterSpacing',
		'textAlign',
		'fontStyle',
	],
};

const layoutProps = {
	name: 'Layout',
	props: [
		'width',
		'height',
		'minWidth',
		'maxWidth',
		'minHeight',
		'maxHeight',
		'display',
		'verticalAlign',
		'overflow',
		'overflowX',
		'overflowY',
	],
};

const flexboxProps = {
	name: 'Flexbox',
	props: [
		'alignItems',
		'alignContent',
		'justifyItems',
		'justifyContent',
		'flexWrap',
		'flexDirection',
		'flex',
		'flexGrow',
		'flexShrink',
		'flexBasis',
		'justifySelf',
		'alignSelf',
		'order',
	],
};

const gridLayoutProps = {
	name: 'Grid Layout',
	props: [
		['gridGap', theme.space],
		['gridRowGap', theme.space],
		['gridColumnGap', theme.space],
		'gridColumn',
		'gridRow',
		'gridArea',
		'gridAutoFlow',
		'gridAutoRows',
		'gridAutoColumns',
		'gridTemplateRows',
		'gridTemplateColumns',
		'gridTemplateAreas',
	],
};

const backgroundProps = {
	name: 'Background',
	props: [
		'background',
		'backgroundImage',
		'backgroundSize',
		'backgroundPosition',
		'backgroundRepeat',
	],
};

const borderProps = {
	name: 'Border',
	props: [
		['border', theme.borders],
		['borderColor', filteredColors],
		['borderRadius', theme.radii],
		['borderTop', theme.borders],
		['borderTopColor', filteredColors],
		['borderTopLeftRadius', theme.radii],
		['borderTopRightRadius', theme.radii],
		['borderRight', theme.borders],
		['borderRightColor', filteredColors],
		['borderBottom', theme.borders],
		['borderBottomColor', filteredColors],
		['borderBottomLeftRadius', theme.radii],
		['borderBottomRightRadius', theme.radii],
		['borderLeft', theme.border],
		['borderLeftColor', filteredColors],
		['borderX', theme.borders],
		['borderY', theme.borders],
	],
};

const positionProps = {
	name: 'Position',
	props: [
		'position',
		['zIndex', theme.zIndices],
		['top', theme.space],
		['right', theme.space],
		['bottom', theme.space],
		['left', theme.space],
	],
};

const shadowProps = {
	name: 'Shadow',
	props: [['textShadow', theme.shadows], ['boxShadow', theme.shadows]],
};

export const styledSystemProps = {
	space: spaceProps,
	color: colorProps,
	textStyle: typographyProps,
	layout: layoutProps,
	flexbox: flexboxProps,
	gridLayout: gridLayoutProps,
	background: backgroundProps,
	border: borderProps,
	position: positionProps,
	shadow: shadowProps,
};
