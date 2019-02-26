import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from '../styled';
import { DropdownContext } from './dropdown-context';

export const dropdownItemTheme = {
	textColor: PropTypes.string,
	hoverTextColor: PropTypes.string,
	hoverBackgroundColor: PropTypes.string,
};

/**
 * Must be placed inside of a `DropdownMenu` component
 */
export function DropdownItem({ onClick, localTheme, styleOverrides, children }) {
	return (
		<DropdownContext.Consumer>
			{({ handleCloseDropdown }) => (
				<Styled.DropdownItem
					onClick={handleCloseDropdown(onClick)}
					localTheme={localTheme}
					styleOverrides={styleOverrides}
				>
					{children}
				</Styled.DropdownItem>
			)}
		</DropdownContext.Consumer>
	);
}

DropdownItem.propTypes = {
	onClick: PropTypes.func.isRequired,
	/** This will edit just the single item */
	localTheme: PropTypes.shape(dropdownItemTheme),
	styleOverrides: PropTypes.shape({
		padding: PropTypes.string,
	}),
	children: PropTypes.node,
};

DropdownItem.defaultProps = {
	localTheme: {},
	styleOverrides: {},
};
