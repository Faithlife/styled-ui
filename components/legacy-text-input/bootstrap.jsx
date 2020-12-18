import * as _Bootstrap from 'reactstrap';
import styled from 'styled-components';
import { wrapBootstrap } from '../utils';

export const Input = wrapBootstrap(_Bootstrap.Input);
export const PopoverBody = wrapBootstrap(_Bootstrap.PopoverBody);
export const Popover = styled(_Bootstrap.Popover)`
	&& {
		box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.12), 0 0 4px 0 rgba(0, 0, 0, 0.12);
	}
`;
