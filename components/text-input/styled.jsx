import styled from 'styled-components';
import { components as reactSelectComponents } from 'react-select';

export const AvatarOption = styled(reactSelectComponents.Option)`
	&& {
		align-items: center;
		display: flex;
	}
`;

export const AvatarOptionImage = styled.img`
	border-radius: 10%;
	height: 40px;
	width: 40px;
`;

export const AvatarOptionText = styled.div`
	padding: ${props => props.theme.space[2]};
`;

export const AvatarOptionName = styled.div`
	color: ${props => props.theme.colors.gray66};
	font-size: ${props => props.theme.fontSizes[3]};
	font-weight: ${props => props.theme.fontWeights.bold};
`;

export const AvatarOptionSecondaryLabel = styled.div`
	color: ${props => props.theme.colors.gray52};
	font-size: ${props => props.theme.fontSizes[2]};
`;

export const AvatarMultiValue = styled(reactSelectComponents.MultiValue)`
	align-items: center;
	display: flex;
	min-height: 26px;
`;

export const AvatarMultiValueImage = styled.img`
	border-radius: 10%;
	height: 18px;
	width: 18px;
`;

export const AvatarMultiValueName = styled.span`
	padding-left: ${props => props.theme.fontSizes[2]};
`;
