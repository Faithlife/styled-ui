import { Box } from '@faithlife/styled-ui';
import styled from 'styled-components';

export const CheckeredBox = styled(Box)`
	background-color: #fff;
	background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
		linear-gradient(-45deg, #ccc 25%, transparent 25%),
		linear-gradient(45deg, transparent 75%, #ccc 75%),
		linear-gradient(-45deg, transparent 75%, #ccc 75%);
	background-size: 8px 8px;
	background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
`;

export const SliderContainer = styled(CheckeredBox)`
	border-radius: 4px;
`;

export const SliderTrack = styled(Box).attrs({ tabIndex: 0 })`
	position: relative;
	border-radius: 4px;
	width: 100%;
	height: 8px;
	cursor: pointer;
	touch-action: none;
`;

export const SliderThumb = styled(Box)`
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
	border: 2px solid #fff;
	border-radius: 50%;
	width: 12px;
	height: 12px;
	transform: translate(-50%, -50%);
	pointer-events: none;
	z-index: 1;
`;

export const SvBoxSlider = styled(Box).attrs({ tabIndex: 0 })`
	position: relative;
	min-height: 100px;
	cursor: pointer;
	touch-action: none;

	&::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to right, #ffffff, #ffffff00);
	}
	&::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, #000000, #00000000);
	}
`;

export const SvThumb = styled(Box)`
	box-sizing: border-box;
	position: absolute;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
	border: 3px solid #fff;
	border-radius: 50%;
	width: 16px;
	height: 16px;
	transform: translate(-50%, -50%);
	pointer-events: none;
	z-index: 1;
`;

export const SwatchBg = styled(CheckeredBox)`
	display: ${({ display }) => display ?? 'inline-block'};
	border-radius: ${({ borderRadius }) => borderRadius ?? '2px'};
	width: ${({ width, size }) => width ?? size};
	height: ${({ height, size }) => height ?? size};
	line-height: 0;
`;

export const Swatch = styled(Box)`
	border-radius: inherit;
	width: 100%;
	height: 100%;
`;

export const PaletteGrid = styled(Box)`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(24px, 1fr));
	grid-gap: 10px 8px;
`;
