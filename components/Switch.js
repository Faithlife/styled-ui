import styled from 'styled-components';
import { variant } from 'styled-system';

import { UtilityButton } from './button';

const switchVariants = variant({
	prop: 'variant',
	scale: 'switches',

	variants: {
		switch: {
			backgroundColor: 'gray34',
			'&::after': {
				backgroundColor: 'white',
				borderColor: 'gray34',
			},
			'&[aria-checked=true]': {
				bg: 'blue4',

				'&::after': {
					backgroundColor: 'white',
					borderColor: 'blue4',
				},
			},
		},
		binaryChoice: {
			backgroundColor: 'blue4',
			'&::after': {
				backgroundColor: 'white',
				borderColor: 'blue4',
			},
		},
	},
});

export const Switch = styled(UtilityButton).attrs(({ isChecked }) => ({
	type: 'button',
	role: 'switch',
	'aria-checked': isChecked,
}))`
	--track-width: 28px;
	--track-height: 16px;
	--handle-width: 10px;
	--handle-offset-x: 1px;
	--handle-offset-y: calc((var(--track-height) - var(--handle-width)) / 2);

	margin: 0;
	padding: 0;
	width: var(--track-width);
	height: var(--track-height);
	border-radius: 999px;
	position: relative;

	&::after {
		box-sizing: content-box !important;
		width: var(--handle-width);
		height: var(--handle-width);
		border: solid;
		border-width: var(--handle-offset-y);
		z-index: 1;
		border-radius: 999px;
		content: '';
		position: absolute;
		top: 0;
		left: var(--handle-offset-x);
		transition: transform 100ms ease-out;
		transform: translateX(0);
	}

	&[aria-checked='true']::after {
		transform: translateX(
			calc(var(--track-width) - (var(--track-height) + var(--handle-offset-x) * 2))
		);
	}

	${switchVariants};
`;

Switch.defaultProps = {
	variant: 'switch',
};
