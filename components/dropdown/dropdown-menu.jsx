import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../popover';
import { useDropdownContext } from './dropdown-helpers';
import * as Styled from './styled';

export function DropdownMenu({ children, ...popoverProps }) {
	const { isOpen, menuId } = useDropdownContext();

	return (
		<Styled.DropdownMenu id={menuId}>
			<Popover
				isOpen={isOpen}
				placement={'bottom-start' || popoverProps.placement}
				hideArrow
				styleOverrides={{ padding: '0', width: '160px' }}
				{...popoverProps}
			>
				<Styled.DropdownMenuContent>{children}</Styled.DropdownMenuContent>
			</Popover>
		</Styled.DropdownMenu>
	);
}

DropdownMenu.propTypes = {
	children: PropTypes.node.isRequired,
};
