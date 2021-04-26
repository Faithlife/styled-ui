import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styledSystemPropTypes from '@styled-system/prop-types';
import { deprecateProp, filterProps, getConfigChild } from '../utils';
import { Button, MultiButton } from '../button';
import { Box } from '../Box';
import { useDropdownContext, useKeyboardActivate } from './utils';
import * as Styled from './styled';

export function MenuToggle({
	hideCaret,
	hideCarrot,
	size,
	variant,
	disabled,
	children,
	...buttonProps
}) {
	deprecateProp(hideCarrot, "The 'hideCarrot' prop has been deprecated in favor of 'hideCaret'.");

	const { onToggleMenu, menuId, isOpen, toggleRef, onKeyboardNav } = useDropdownContext();

	const onKeyPress = useKeyboardActivate(onToggleMenu, onKeyboardNav);

	const childProps = useMemo(
		() => ({
			onKeyDown: onKeyPress,
			onClick: onToggleMenu,
			ariaProps: {
				'aria-haspopup': true,
				'aria-controls': menuId,
				'aria-expanded': isOpen,
			},
		}),
		[onToggleMenu, menuId, isOpen, onKeyPress],
	);

	if (typeof children === 'function') {
		return children(toggleRef, childProps);
	}

	const [actionChild] = getConfigChild(children, MenuActionButton.childConfigComponent);
	const { matchingProps: containerProps, remainingProps: caretButtonProps } = filterProps(
		buttonProps,
		{
			...styledSystemPropTypes.space,
			...styledSystemPropTypes.layout,
			...styledSystemPropTypes.flexbox,
			...styledSystemPropTypes.grid,
			...styledSystemPropTypes.position,
		},
	);

	return actionChild ? (
		<Box {...containerProps}>
			{React.cloneElement(actionChild, {
				defaultSize: size,
				defaultVariant: variant,
				defaultDisabled: disabled,
				isMulti: true,
			})}
			<MultiButton
				ref={toggleRef}
				size={size}
				variant={variant}
				disabled={disabled}
				border={0}
				borderLeft={1}
				borderColor="blue5"
				{...childProps}
				{...childProps.ariaProps}
				{...caretButtonProps}
			>
				<Styled.DropdownCaret hideMargin />
			</MultiButton>
		</Box>
	) : (
		<Button
			ref={toggleRef}
			size={size}
			variant={variant}
			disabled={disabled}
			{...childProps}
			{...childProps.ariaProps}
			{...buttonProps}
		>
			{children}
			{!(hideCaret || hideCarrot) && <Styled.DropdownCaret />}
		</Button>
	);
}
MenuToggle.propTypes = {
	...MultiButton.propTypes,
	...styledSystemPropTypes.grid,
	hideCaret: PropTypes.bool,
	hideCarrot: PropTypes.bool,
};
MenuToggle.defaultProps = {
	size: 'small',
	variant: 'primary',
};

export function MenuActionButton({
	defaultSize,
	defaultVariant,
	defaultDisabled,
	isMulti,
	children,
	...buttonProps
}) {
	const Component = isMulti ? MultiButton : Button;
	return (
		<Component
			border={0}
			size={defaultSize}
			variant={defaultVariant}
			disabled={defaultDisabled}
			{...buttonProps}
		>
			{children}
		</Component>
	);
}
MenuActionButton.childConfigComponent = 'DropdownActionButton';
