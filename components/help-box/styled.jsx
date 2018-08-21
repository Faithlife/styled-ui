import styled from 'styled-components';
import { fonts, colors, thickness } from '../../components/shared-styles';
import { LightBulbH } from '../icons';

export const BlueBoxContent = styled.div`
	${fonts.ui16}

	flex: 1; 
	padding: ${thickness.sixteen};
	text-align: left;
	color: ${colors.flGray};
`;

export const BulbIcon = styled(LightBulbH)`
	width: 40px;
	height: 40px;
	margin: ${thickness.sixteen};
	margin-right: 0;
	flex: none;
`;

export const BlueBox = styled.div`
	position: relative;
	display: flex;
	border-radius: 3px;
	background-color: ${colors.blueTint};
	border: solid 1px ${colors.blueLight};
	border-left: solid ${thickness.eight} ${colors.blueLight};
	word-break: break-word;
`;
