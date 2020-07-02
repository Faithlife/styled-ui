import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DropdownCore } from '../dropdown';

export function Listbox({
	isOpen,
	onToggleMenu,
	onItemSelect,
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
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
		padding: PropTypes.string,
		width: PropTypes.string,
		overflow: PropTypes.string,
		maxHeight: PropTypes.string,
	}),
	/** The id of an element containing the label for this component. Maybe omitted if the content is self-explanatory. */
	labelledBy: PropTypes.string,
	selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Listbox.defaultProps = {
	styleOverrides: {},
};
