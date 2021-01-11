import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Menu } from '../../index-v6';
import { ListboxContextProvider } from './utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/#Listbox

export function Listbox({
	isOpen,
	onToggleMenu,
	onItemSelect,
	children,
	width,
	labelledBy,
	selectedId,
}) {
	const context = useMemo(() => ({ selectedId, onItemSelect, labelledBy }), [
		selectedId,
		onItemSelect,
		labelledBy,
	]);
	return (
		<ListboxContextProvider value={context}>
			<Menu isOpen={isOpen} onToggleMenu={onToggleMenu} width={width}>
				{children}
			</Menu>
		</ListboxContextProvider>
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
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
