import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Listbox, ListboxToggle, ListboxMenu, ListItem } from '../../index';
import { useId } from '../shared-hooks';
import { VisuallyHiddenLabel } from '../hidden-label';
import * as Styled from './legacy-styled.jsx';

export function ParameterSelect({
	options,
	selectedId,
	onItemSelect,
	width,
	accessibilityLabel,
	useNativeSelect,
	styleOverrides,
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
		<Styled.Container>
			<VisuallyHiddenLabel id={labelId}>{accessibilityLabel}</VisuallyHiddenLabel>
			{!useNativeSelect ? (
				<Listbox
					isOpen={isOpen}
					onToggleMenu={handleToggleMenu}
					onItemSelect={onItemSelect}
					selectedId={selectedId}
					styleOverrides={{ width }}
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
								<Styled.ButtonContent isOpen={isOpen} styleOverrides={styleOverrides}>
									{options[selectedId]}
								</Styled.ButtonContent>
							</Styled.Button>
						)}
					</ListboxToggle>
					<ListboxMenu
						styleOverrides={{
							zIndex: 10,
							padding: '4px 0',
							width,
							overflow: styleOverrides.overflow ?? 'auto',
							maxHeight: styleOverrides.maxHeight ?? '300px',
						}}
					>
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
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
		overflow: PropTypes.string,
		maxHeight: PropTypes.string,
	}),
};

ParameterSelect.defaultProps = {
	width: '180px',
	styleOverrides: {},
};
