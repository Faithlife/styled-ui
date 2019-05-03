import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DropdownCore } from '../dropdown';

export function Listbox({
	isOpen,
	onToggleMenu,
	onItemSelect,
	theme,
	styleOverrides,
	children,
	labelledBy,
	selectedId,
}) {
	const context = useMemo(() => ({ labelledBy, onItemSelect, selectedId }), [
		labelledBy,
		onItemSelect,
		selectedId,
	]);

	return (
		<DropdownCore
			isOpen={isOpen}
			onToggleMenu={onToggleMenu}
			theme={theme}
			styleOverrides={styleOverrides}
			additionalContext={context}
		>
			{children}
		</DropdownCore>
	);
}

Listbox.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggleMenu: PropTypes.func.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	theme: PropTypes.shape({
		hoverBackgroundColor: PropTypes.string,
		checkboxPrimary: PropTypes.string,
		checkboxBorder: PropTypes.string,
	}),
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
		padding: PropTypes.string,
		width: PropTypes.string,
	}),
	/** If the what the content of the listbox is, is not apparent (ex: it is not part of a larger component) the id of the label must be supplied */
	labelledBy: PropTypes.string,
	selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Listbox.defaultProps = {
	theme: {},
	styleOverrides: {},
};
