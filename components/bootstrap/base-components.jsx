/* eslint-disable import/no-default-export */
import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';
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
	'PopoverContent',
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
			[curr]: wrapBootstrap(_Bootstrap[curr], inlineComponents.includes(curr)),
		}),
		{},
	);

export default {
	...Components,
	Label: styled(_Bootstrap.Label)`
		&& {
			font-size: 14px;
			line-height: 1em;
			margin-bottom: 0.375rem;
		}
	`,
	Popover: styled(_Bootstrap.Popover)`
		&& {
			box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12), 0 0 4px 0 rgba(0, 0, 0, 0.12);
		}
	`,
	ListGroupItem: styled(_Bootstrap.ListGroupItem)`
		padding: 8px 16px;
	`,
};
