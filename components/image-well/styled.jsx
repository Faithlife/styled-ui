import styled from 'styled-components';
import { colors, thickness, fonts } from '../shared-styles';

const fixedContainerWidth = '116px';
const fixedContainerHeight = '116px';

export const WellContainer = styled.div`
	width: ${fixedContainerWidth};
	height: ${fixedContainerHeight};
	box-sizing: content-box;
`;

export const WellButton = styled.button`
	margin: 0;
	padding: 0;
	width: ${fixedContainerWidth};
	height: ${fixedContainerHeight};
	color: ${colors.blueBase};
	border: ${thickness.two} dashed ${colors.borderColor};
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	outline: none;

	${fonts.ui16}

	&:hover {
		background-color: ${colors.blueTint};
		border-color: ${colors.blueBase};

		& .image-well_selector-icon path {
			fill: ${colors.blueBase};
		}

		.image-well_edit-icon path {
			fill: ${colors.borderColor};
		}
	}

	& .image-well_selector-icon {
		margin-bottom: 8px;
	}
`;

export const WellPreview = styled.div`
	margin: 0;
	padding: 0;
	width: ${fixedContainerWidth};
	height: ${fixedContainerHeight};
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	border-radius: 6px;
	border: none;
`;

export const EditIconContainer = styled.div`
	background-color: rgba(0, 0, 0, 0.3);
	position: absolute;
	top: 6px;
	right: 6px;
	width: 20px;
	height: 20px;
	padding: 8px;
	border-radius: 5px;

	& .image-well_edit-icon path {
		fill: #fff;
	}
`;
