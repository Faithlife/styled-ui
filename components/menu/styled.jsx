import React from 'react';
import styled from 'styled-components';
import { variant as createVariant } from 'styled-system';
import { ChevronDown } from '../icons/12px';
import { UtilityButton } from '../button';
import { Box } from '../Box';

export const defaultMenuWidth = '160px';

const DropdownCarrotComponent = styled(ChevronDown).attrs({ color: 'currentColor' })``;

const CarrotContainer = styled(Box).attrs(({ hideMargin }) => ({
	marginLeft: !hideMargin ? 3 : 0,
	color: 'inherit',
}))``;

export const DropdownCarrot = ({ hideMargin }) => (
	<CarrotContainer hideMargin={hideMargin}>
		<DropdownCarrotComponent />
	</CarrotContainer>
);

export const MenuItem = styled(UtilityButton)`
	box-sizing: border-box;
	box-shadow: none;
	text-decoration: none;

	&:hover {
		background-color: ${({ theme }) => theme.colors.dropdown.backgroundHover};
	}

	&:focus {
		outline: none;
		box-shadow: none;
		border: 0;
	}

	&.focus-visible {
		outline: none;
		box-shadow: none;
		border: 0;

		&:not(:active) {
			box-shadow: none;
		}
	}
`;

export const MenuItemIcon = styled(Box)`
	${createVariant({
		variants: {
			thumbnail: {
				width: '76px',
				height: '56px',
				marginRight: 2,
			},
			icon: {
				width: '40px',
				height: '40px',
				marginRight: 3,
			},
			avatar: {
				width: '48px',
				height: '48px',
				marginRight: 3,
				marginLeft: 2,
			},
		},
	})}

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const MenuItemTextContainer = styled(Box)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;
