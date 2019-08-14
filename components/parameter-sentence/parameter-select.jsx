import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { theme } from '../../theme';
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
	padding,
	...props
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
								<Styled.ButtonContent
									whiteSpace="nowrap"
									minHeight="fit-content"
									textStyle="h.16"
									borderBottom="dashed 2px"
									borderColor="blue4"
									color={isOpen ? '#1d6ca1' : 'gray66'}
									padding={padding}
									hoverColor="blue4"
									activeColor="#1d6ca1"
									focusOutline="none"
									focusBoxShadow="0 0 0 0.2rem rgba(30, 145, 214, 0.5)"
									{...props}
								>
									{options[selectedId]}
								</Styled.ButtonContent>
							</Styled.Button>
						)}
					</ListboxToggle>
					<ListboxMenu
						padding={padding}
						paddingY={padding !== undefined && padding !== null ? padding : 2}
						width="auto"
						{...props}
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
					aria-labelledby={labelId}
					whiteSpace="nowrap"
					minHeight="fit-content"
					textStyle="h.16"
					color={isOpen ? '#1d6ca1' : 'gray66'}
					padding={padding}
					border="none"
					borderBottom="dashed 2px"
					borderColor="blue4"
					backgroundColor="transparent"
					transition="box-shadow 0.25s ease 0s"
					hoverColor="blue4"
					activeColor="#1d6ca1"
					focusOutline="none"
					focusBoxShadow="0 0 0 0.2rem rgba(30, 145, 214, 0.5)"
					{...props}
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
};

ParameterSelect.defaultProps = {
	theme: theme,
};
