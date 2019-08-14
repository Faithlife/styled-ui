import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { DropdownCore } from '../dropdown';

export function Listbox({ isOpen, onToggleMenu, onItemSelect, children, labelledBy, selectedId }) {
	const context = useMemo(() => ({ labelledBy, onItemSelect, selectedId }), [
		labelledBy,
		onItemSelect,
		selectedId,
	]);

	return (
		<DropdownCore isOpen={isOpen} onToggleMenu={onToggleMenu} additionalContext={context}>
			{children}
		</DropdownCore>
	);
}

Listbox.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onToggleMenu: PropTypes.func.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
	/** The id of an element containing the label for this component. Maybe omitted if the content is self-explanatory. */
	labelledBy: PropTypes.string,
	selectedId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
