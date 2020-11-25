import React from 'react';
import styled from 'styled-components';
import { buttonSizes as sizes, buttons } from '../../theme/buttons';
import { GearIcon } from '../../components/icons';

const buttonVariations = Object.keys(buttons);
const buttonSizes = Object.keys(sizes);

export const commonArgTypes = {
	variant: {
		control: {
			type: 'inline-radio',
			options: buttonVariations,
		},
		defaultValue: 0,
	},
	size: {
		control: {
			type: 'inline-radio',
			options: buttonSizes,
		},
	},
	icon: {
		control: {
			type: 'select',
			options: [null, <GearIcon />],
		},
	},
	onClick: {
		action: 'click',
	},
};

export const ButtonDemo = styled.div`
	display: inline-grid;
	grid-auto-flow: column;
	align-items: center;
	grid-column-gap: 12px;
`;
