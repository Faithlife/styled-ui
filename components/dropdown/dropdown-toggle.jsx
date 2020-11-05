import React, { useMemo } from 'react';
import { getConfigChild } from '../utils';
import { Button, SegmentedButtonGroup } from '../button';
import { useDropdownContext, useKeyboardActivate } from './utils';
import * as Styled from './styled';

export function DropdownToggle({ hideCarrot, size, variant, disabled, children, ...buttonProps }) {
	const { onToggleMenu, menuId, isOpen, toggleRef, splitRef, onKeyboardNav } = useDropdownContext();

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

	const [actionChild] = getConfigChild(children, DropdownActionButton.childConfigComponent);
	return actionChild ? (
		<SegmentedButtonGroup ref={toggleRef} border={0}>
			{React.cloneElement(actionChild, {
				defaultSize: size,
				defaultVariant: variant,
				defaultDisabled: disabled,
			})}
			<Button
				ref={splitRef}
				size={size}
				variant={variant}
				disabled={disabled}
				border={0}
				borderLeft={1}
				borderColor="blue5"
				{...childProps}
				{...childProps.ariaProps}
				{...buttonProps}
			>
				<Styled.DropdownCarrot hideMargin />
			</Button>
		</SegmentedButtonGroup>
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
			{!hideCarrot && <Styled.DropdownCarrot />}
		</Button>
	);
}

DropdownToggle.defaultProps = {
	size: 'small',
	variant: 'primary',
};

export function DropdownActionButton({
	defaultSize,
	defaultVariant,
	defaultDisabled,
	children,
	...buttonProps
}) {
	return (
		<Button size={defaultSize} variant={defaultVariant} disabled={defaultDisabled} {...buttonProps}>
			{children}
		</Button>
	);
}
DropdownActionButton.childConfigComponent = 'DropdownActionButton';
