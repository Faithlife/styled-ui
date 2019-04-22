import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../popover';
import { useDropdownContext } from './dropdown-helpers';
import * as Styled from './styled';

export function DropdownMenu({ children, ...popoverProps }) {
	const { isOpen } = useDropdownContext();

	return (
		<Popover isOpen={isOpen} placement={'bottom-start' || popoverProps.placement} {...popoverProps}>
			<Styled.DropdownMenu>{children}</Styled.DropdownMenu>
		</Popover>
	);
}

DropdownMenu.propTypes = {
	children: PropTypes.node.isRequired,
};
