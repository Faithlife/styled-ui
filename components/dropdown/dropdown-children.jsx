import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { PopoverReference } from '../popover';
import { useDropdownContext } from './dropdown-helpers';
import * as Styled from './styled';

export function DropdownToggle({ children, onToggleMenu }) {
	return (
		<PopoverReference>
			<Styled.ToggleButton onClick={onToggleMenu}>{children}</Styled.ToggleButton>
		</PopoverReference>
	);
}

DropdownToggle.propTypes = {
	/** The content of the toggle button, usually a span */
	children: PropTypes.node.isRequired,
	/** Toggle the isOpen prop when called */
	onToggleMenu: PropTypes.func.isRequried,
};

export function MenuItem({ children, onClick }) {
	const { handleCloseMenu } = useDropdownContext();

	const handleClick = useCallback(
		() => {
			if (onClick) {
				onClick();
			}

			handleCloseMenu();
		},
		[onClick, handleCloseMenu],
	);

	return <Styled.MenuItem onClick={handleClick}>{children}</Styled.MenuItem>;
}

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequried,
};
