import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';
import Unsorted from './svgs/unsorted.svg';
import ArrowUp from './svgs/arrow-up.svg';
import CarretRight from './svgs/caret-right.svg';

// Custom Header Component
export const HeaderContainer = styled.div`
	text-align: left;
	height: 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	& > button {
		font-weight: 600;
	}

	${props => (props.isRightAligned ? 'align-items: flex-end' : '')};
`;

export const UnsortedIcon = styled(Unsorted)`
	> svg {
		color: ${colors.gray52};
	}
`;

export const ArrowUpIcon = styled(ArrowUp)`
	> svg {
		color: ${colors.gray52};
	}
`;

export const ArrowDownIcon = styled(ArrowUp)`
	> svg {
		color: ${colors.gray52};
		transform: rotate(180deg);
	}
`;

// Table Nav Controls
export const NavContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: ${thickness.twelve} ${thickness.eight};
`;

export const ButtonSpacer = styled.div`
	margin-right: ${thickness.eight};
`;

export const CarretRightIcon = styled(CarretRight)``;

export const CarretLeftIcon = styled(CarretRight)`
	> svg {
		transform: scaleX(-1);
	}
`;

// Base Table
export const GridContainer = styled.div`
	/* height: ${({ height }) => height}px; */
`;
