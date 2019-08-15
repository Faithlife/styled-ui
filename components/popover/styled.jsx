import styled from 'styled-components';
import { system } from 'styled-system';
import { Box } from '../Box';

const arrowWidth = '10px';

export const margins = {
	top: { marginBottom: arrowWidth },
	right: { marginLeft: arrowWidth },
	left: { marginRight: arrowWidth },
	bottom: { marginTop: arrowWidth },
};

export const getPlacement = placement => {
	if (!placement) {
		return 'top';
	}
	return placement.split('-')[0];
};

export const Arrow = styled(Box)`
	&::after {
		${system({ arrowBackground: { property: 'background', scale: 'colors' } })};
		${system({ arrowShadow: { property: 'box-shadow', scale: 'shadows' } })};
		${system({ arrowBorder: { property: 'border', scale: 'borders' } })};

		content: '';
		position: absolute;
		width: ${arrowWidth};
		height: ${arrowWidth};
		transform: translateX(-50%) translateY(-50%) rotate(45deg);
	}
	${({ placement }) => (placement ? arrowStyles[getPlacement(placement)] : arrowStyles.top)};
`;

const arrowStyles = {
	top: `
		top: 100%;

		&::after {
			top: 0;
		}
	`,
	right: `
		right: 100%;

		&::after {
			top: 50%;
			left: 100%;
		}
	`,
	left: `
		left: 100%;

		&::after {
			top: 50%;
			left: 0;
		}
	`,
	bottom: `
		bottom: 100%;

		&::after {
			top: 100%;
		}
	`,
};
