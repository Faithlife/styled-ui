import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button';
import { PopoverReference } from '../popover';
import { useDropdownContext } from './dropdown-helpers';
import * as Styled from './styled';

export function DropdownToggle({ children, onToggleMenu, ...buttonProps }) {
	return (
		<PopoverReference>
			<Button onClick={onToggleMenu} {...buttonProps}>
				{children}
			</Button>
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

	const ref = useRef();

	const handleClick = useCallback(
		() => {
			if (onClick) {
				onClick();
			}

			handleCloseMenu();
		},
		[onClick, handleCloseMenu],
	);

	const onMouseEnter = useCallback(
		() => {
			if (ref.current) {
				ref.current.focus();
			}
		},
		[ref.current],
	);

	return (
		<Styled.MenuItem ref={ref} onClick={handleClick} onMouseEnter={onMouseEnter}>
			{children}
		</Styled.MenuItem>
	);
}

MenuItem.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequried,
};
