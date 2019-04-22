import styled from 'styled-components';
import { colors, thickness } from '../shared-styles';
import { resetStyles } from '../utils';

const borderRadius = '3px 3px 0 0';

export const ToggleButton = styled.button`
	${resetStyles};
	outline: none;

	box-shadow: none;
	outline: none;
	background: white;
	border: none;
	display: inline-block;
	padding: 0;
	transition: box-shadow 0.25s ease 0s;
	border: 0;
	border-radius: ${borderRadius};

	position: relative;

	&:focus {
		box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		outline: none;
	}
`;

export const ToggleButtonContent = styled.span.attrs({ tabIndex: '-1' })`
	&:focus {
		outline: none;
	}
`;

export const DropdownMenu = styled.div`
	width: 100%;
	padding: ${thickness.four} 0;

	display: flex;
	flex-direction: column;
`;

export const MenuItem = styled.button.attrs({ tabIndex: '-1' })`
	${resetStyles};
	outline: none;
	border: none;

	padding: ${thickness.eight};
	text-align: left;
	white-space: nowrap;
	background-color: transparent;

	&:focus {
		background-color: ${colors.gray4};
		outline: none;
	}
`;
