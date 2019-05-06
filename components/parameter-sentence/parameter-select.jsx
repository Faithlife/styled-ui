import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Listbox, ListboxToggle, ListboxMenu, ListItem } from '../listbox';
import * as Styled from './styled.jsx';

export function ParameterSelect({
	options,
	selectedId,
	onItemSelect,
	width,
	accessibilityLabel,
	useNativeSelect,
	styleOverrides,
	theme,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const toggleFocus = useCallback(() => {
		setIsFocused(state => !state);
	}, []);

	const handleToggleMenu = useCallback(() => {
		setIsOpen(state => !state);
	}, []);

	const handleNativeSelect = useCallback(
		event => {
			onItemSelect(event.target.value);
		},
		[onItemSelect],
	);

	return (
		<Styled.Container>
			{!useNativeSelect ? (
				<Listbox
					isOpen={isOpen}
					onToggleMenu={handleToggleMenu}
					onItemSelect={onItemSelect}
					selectedId={selectedId}
					styleOverrides={{ width }}
				>
					<ListboxToggle>
						{({ ref, onKeyDown, onClick, ariaProps }) => (
							<Styled.Button
								ref={ref}
								onKeyDown={onKeyDown}
								onClick={onClick}
								onFocus={toggleFocus}
								onBlur={toggleFocus}
								type="button"
								{...ariaProps}
							>
								<Styled.ButtonContent
									isOpen={isOpen}
									theme={theme}
									styleOverrides={styleOverrides}
									aria-label={isFocused ? accessibilityLabel : options[selectedId]}
								>
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
			) : (
				<Styled.Select
					value={selectedId}
					onChange={handleNativeSelect}
					theme={theme}
					styleOverrides={styleOverrides}
				>
					{options &&
						Object.entries(options).map(([id, name]) => (
							<option key={id} value={id}>
								{name}
							</option>
						))}
				</Styled.Select>
			)}
		</Styled.Container>
	);
}

ParameterSelect.propTypes = {
	options: PropTypes.object.isRequired,
	selectedId: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func.isRequired,
	/** Width (in pixels) of the select dropdown */
	width: PropTypes.string,
	accessibilityLabel: PropTypes.string,
	/** Use the native select controls (mobile only) */
	useNativeSelect: PropTypes.bool,
	theme: PropTypes.shape({
		hoverColor: PropTypes.string,
		activeColor: PropTypes.string,
		underlineColor: PropTypes.string,
	}),
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
	}),
};

ParameterSelect.defaultProps = {
	width: '180px',
	styleOverrides: {},
	theme: {},
};
