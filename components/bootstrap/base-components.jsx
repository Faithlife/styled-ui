import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';
import React from 'react';
import { wrapBootstrap } from '../utils';

const inlineComponents = ['Button'];

const supportedComponents = [
	'Button',
	'ButtonDropdown',
	'ButtonGroup',
	'ButtonToolbar',
	'Dropdown',
	'DropdownItem',
	'DropdownMenu',
	'DropdownToggle',
	'Popover',
	'PopoverBody',
	'PopoverTitle',
	'PopoverHeader',
	'PopperContent',
	'PopperTargetHelper',
	'Form',
	'FormFeedback',
	'FormGroup',
	'FormText',
	'Input',
	'Label',
	'CustomInput',
	'UncontrolledButtonDropdown',
	'UncontrolledDropdown',
	'Util',
	'Row',
	'Col',
	'Container',
	'Fade',
	'UncontrolledTooltip',
	'Tooltip',
];

const Components = Object.keys(_Bootstrap)
	.filter(x => supportedComponents.includes(x))
	.reduce(
		(prev, curr) => ({
			...prev,
			// eslint-disable-next-line import/namespace
			[curr]: wrapBootstrap(_Bootstrap[curr], inlineComponents.includes(curr)),
		}),
		{},
	);

function withGpuAccelerationDisabled(Popover) {
	return props => (
		<Popover
			{...props}
			modifiers={{
				computeStyle: {
					gpuAcceleration: !(
						typeof window !== `undefined` &&
						window.devicePixelRatio < 1.5 &&
						/Win/.test(navigator.platform)
					),
				},
			}}
		/>
	);
}

export default {
	...Components,
	Label: styled(_Bootstrap.Label)`
		&& {
			font-size: 16px;
			line-height: 1em;
			margin-bottom: 0.375rem;
		}
	`,
	Popover: styled(withGpuAccelerationDisabled(_Bootstrap.Popover))`
		&& {
			box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12), 0 0 4px 0 rgba(0, 0, 0, 0.12);
		}
	`,
	ListGroupItem: styled(_Bootstrap.ListGroupItem)`
		padding: 8px 16px;
	`,
};
