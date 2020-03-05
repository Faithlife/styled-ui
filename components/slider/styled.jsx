import styled from 'styled-components';

export const StopContainer = styled.div`
	z-index: 2;
	justify-content: space-between;
	display: flex;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

export const ThumbContainer = styled.div`
	z-index: 3;
	justify-content: space-between;
	display: flex;
	align-items: center;
	position: absolute;
	top: 0;
	left: 1px;
	right: 1px;
	bottom: 0;
`;

export const Stop = styled.div`
	height: 8px;
	width: 3px;
	background-color: ${props =>
		props.available || props.minimumAvailable ? '#fff' : 'transparent'};
`;

export const ThumbAnchor = styled.div`
	position: absolute;
	height: 8px;
	width: 0px;
`;

export const Thumb = styled.div`
	position: absolute;
	display: ${props => (props.hidden ? 'none' : 'block')};
	top: 50%;
	left: auto;
	right: 50%;
	transform: translate(50%, -50%);
	transition: height 100ms, width 100ms;
	border-radius: 50%;
	height: ${props => (props.hovered && !props.disabled ? '26px' : '20px')};
	width: ${props => (props.hovered && !props.disabled ? '26px' : '20px')};
	background: #fff;
	box-shadow: ${props =>
		props.active ? '0 1px 10px 0 #0174b9' : '0 2px 6px 1px rgba(0, 0, 0, 0.3)'};
`;
