import styled from 'styled-components';
import { colors, thickness, fonts } from '../shared-styles';
import { Camera as UnstyledCamera } from '../icons/18px';
import { X as UnstyledX } from '../icons/12px';

const fixedContainerWidth = '116px';
const fixedContainerHeight = '116px';

export const WellContainer = styled.div`
	width: ${fixedContainerWidth};
	height: ${fixedContainerHeight};
`;

export const WellButton = styled.button`
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
	color: ${colors.blueBase};
	border: ${thickness.two} dashed ${colors.borderColor};
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	outline: none;
	cursor: ${props => (props.previewUrl ? 'default' : 'pointer')};

	${fonts.ui16}

	&:hover {
		background-color: ${colors.blueTint};
		border-color: ${colors.blueBase};

		& svg path {
			fill: ${props => (props.previewUrl ? '' : colors.blueBase)};
		}
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

export const RemoveIconContainer = styled.div`
	background-color: rgba(0, 0, 0, 0.3);
	position: absolute;
	top: 6px;
	right: 6px;
	width: 16px;
	height: 16px;
	padding: 3px;
	border-radius: 50%;
	cursor: pointer;
`;

export const Camera = styled(UnstyledCamera)`
	margin-bottom: 8px;
`;

export const X = styled(UnstyledX)`
	& path {
		fill: #${colors.gray4};
	}
`;
