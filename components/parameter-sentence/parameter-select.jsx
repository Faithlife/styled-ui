import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useId } from '../shared-hooks';
import { VisuallyHiddenLabel } from '../hidden-label';
import { Listbox, ListboxToggle, ListboxMenu, ListItem } from '../listbox';
import * as Styled from './styled.jsx';

export function ParameterSelect({
	options,
	selectedId,
	onItemSelect,
	accessibilityLabel,
	useNativeSelect,
	styleOverrides,
	theme,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const id = useId();
	const labelId = `parameterSelectLabel:${id}`;

	const handleToggleMenu = useCallback(() => {
		setIsOpen(isOpenState => !isOpenState);
	}, []);

	const handleNativeSelect = useCallback(
		event => {
			onItemSelect(event.target.value);
		},
		[onItemSelect],
	);

	return (
		<Box display="inline-block" position="relative">
			<VisuallyHiddenLabel id={labelId}>{accessibilityLabel}</VisuallyHiddenLabel>
			{!useNativeSelect ? (
				<Listbox
					isOpen={isOpen}
					onToggleMenu={handleToggleMenu}
					onItemSelect={onItemSelect}
					selectedId={selectedId}
					labelledBy={labelId}
				>
					<ListboxToggle>
						{({ ref, onKeyDown, onClick, ariaProps }) => (
							<Styled.Button
								ref={ref}
								onKeyDown={onKeyDown}
								onClick={onClick}
								type="button"
								{...ariaProps}
							>
								<Styled.ButtonContent isOpen={isOpen} theme={theme} styleOverrides={styleOverrides}>
									{options[selectedId]}
								</Styled.ButtonContent>
							</Styled.Button>
						)}
					</ListboxToggle>
					<ListboxMenu paddingY={2} width="auto">
						{options &&
							Object.entries(options).map(([value, name]) => (
								<ListItem key={value} id={value}>
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
					aria-labelledby={labelId}
				>
					{options &&
						Object.entries(options).map(([value, name]) => (
							<option key={value} value={value}>
								{name}
							</option>
						))}
				</Styled.Select>
			)}
		</Box>
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
