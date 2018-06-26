import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';
import { wrapBootstrap } from './util';

const inlineComponents = ['Button'];

const Components = Object.keys(_Bootstrap).reduce(
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
};
