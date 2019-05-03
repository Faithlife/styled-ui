import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Listbox, ListboxToggle, ListboxMenu, ListItem } from '../listbox';
import * as Styled from './styled.jsx';

export function ParameterSelect({ options, selectedId, onItemSelect, width }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggleMenu = useCallback(() => {
		setIsOpen(state => !state);
	}, []);

	return (
		<Styled.Container>
			<Listbox
				isOpen={isOpen}
				onToggleMenu={handleToggleMenu}
				onItemSelect={onItemSelect}
				selectedId={selectedId}
				styleOverrides={{ width }}
			>
				<ListboxToggle>
					{({ ref, onKeyDown, onClick, ariaProps }) => (
						<Styled.Button ref={ref} onKeyDown={onKeyDown} onClick={onClick} {...ariaProps}>
							<Styled.ButtonContent isOpen={isOpen} theme={{}} styleOverrides={{}}>
								{options[selectedId]}
							</Styled.ButtonContent>
						</Styled.Button>
					)}
				</ListboxToggle>
				<ListboxMenu>
					{options &&
						Object.entries(options).map(([id, name]) => (
							<ListItem key={id} id={id}>
								{name}
							</ListItem>
						))}
				</ListboxMenu>
			</Listbox>
		</Styled.Container>
	);
}

ParameterSelect.propTypes = {
	options: PropTypes.object.isRequired,
	selectedId: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	/** Width (in pixels) of the select dropdown */
	width: PropTypes.string,
};

ParameterSelect.defaultProps = {
	width: '180px',
};
