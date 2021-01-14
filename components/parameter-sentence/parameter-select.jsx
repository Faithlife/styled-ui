import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styledSystemPropTypes from '@styled-system/prop-types';
import { useId } from '../shared-hooks';
import { VisuallyHiddenLabel } from '../hidden-label';
import { Listbox } from '../listbox';
import * as Styled from './styled.jsx';

export function ParameterSelect({
	options,
	selectedId,
	onItemSelect,
	accessibilityLabel,
	useNativeSelect,
	width,
	...otherStyleProps
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
					width={width}
					labelledBy={labelId}
				>
					<Listbox.Toggle>
						{(ref, { onKeyDown, onClick, ariaProps }) => (
							<Styled.Button
								ref={ref}
								onKeyDown={onKeyDown}
								onClick={onClick}
								type="button"
								{...ariaProps}
							>
								<Styled.ButtonContent isOpen={isOpen} {...otherStyleProps}>
									{options[selectedId]}
								</Styled.ButtonContent>
							</Styled.Button>
						)}
					</Listbox.Toggle>
					<Listbox.Dropdown
						zIndex={10}
						padding="4px 0"
						overflow={otherStyleProps?.overflow ?? 'auto'}
						maxHeight={otherStyleProps?.maxHeight ?? '300px'}
						width={width}
					>
						{options &&
							Object.entries(options).map(([value, name]) => (
								<Listbox.Item key={value} id={value}>
									{name}
								</Listbox.Item>
							))}
					</Listbox.Dropdown>
				</Listbox>
			) : (
				<Styled.Select
					value={selectedId}
					onChange={handleNativeSelect}
					width={width}
					{...otherStyleProps}
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
	accessibilityLabel: PropTypes.string,
	/** Use the native select controls (mobile only) */
	useNativeSelect: PropTypes.bool,
	...styledSystemPropTypes.layout,
	...styledSystemPropTypes.typography,
};

ParameterSelect.defaultProps = {
	width: '180px',
};
