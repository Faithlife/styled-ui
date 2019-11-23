import styled from 'styled-components';

export const TrackContainer = styled.div`
	z-index: 1;
	display: flex;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
`;

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
	left: 0;
	right: 0;
	bottom: 0;
`;

export const TrackGradient = styled.div`
	position: absolute;
	left: 0;
	right: 0;
	border-radius: 10px;
	height: 8px;
	background-image: linear-gradient(to left, #79cafb, #1e91d6);
	z-index: -10;
`;

export const Track = styled.div`
	background-color: ${props =>
		props.active
			? 'transparent'
			: props.invalid
			? props.styleOverrides.backgroundColor
				? props.styleOverrides.backgroundColor
				: '#fff'
			: '#ebebeb'};
	flex-grow: 1;
	position: relative;
	height: 8px;
	border-top-left-radius: ${props => (props.trackFirst ? '10px' : '0')};
	border-bottom-left-radius: ${props => (props.trackFirst ? '10px' : '0')};
	border-top-right-radius: ${props => (props.trackLast ? '10px' : '0')};
	border-bottom-right-radius: ${props => (props.trackLast ? '10px' : '0')};

	&:before {
		content: '';
		display: ${props => (props.trackLast ? 'block' : 'none')};
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: 8px;
		background-color: ${props =>
			props.styleOverrides.backgroundColor ? props.styleOverrides.backgroundColor : '#fff'};
		z-index: -5;
	}
`;

export const Stop = styled.div`
	height: 8px;
	width: 3px;
	background-color: ${props =>
		props.available || props.minimumAvailable ? '#fff' : 'transparent'};
`;

export const ThumbAnchor = styled.div`
	position: relative;
	height: 8px;
	width: 3px;
	left: ${props => (props.trackStart ? '6px' : 'auto')};
	right: ${props => (props.trackEnd ? '6px' : 'auto')};
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
	height: ${props => (props.hovered ? '26px' : '20px')};
	width: ${props => (props.hovered ? '26px' : '20px')};
	background: #fff;
	box-shadow: ${props =>
		props.active ? '0 1px 10px 0 #0174b9' : '0 2px 6px 1px rgba(0, 0, 0, 0.3)'};
`;
