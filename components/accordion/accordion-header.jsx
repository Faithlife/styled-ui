import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Text } from '../Text';
import { Box } from '../Box';
import { UtilityButton } from '../button';
import { ChevronRight, ChevronDown } from '../icons/12px';
import { useAccordionContext, useAccordionItemContext } from './accordion-util';

export function AccordionHeader({
	ariaLevel,
	children,
	renderCustomIndicator,
	subtitle,
	...props
}) {
	const {
		focusedMenuItem,
		focusableChildList,
		hideArrows,
		setFocusedMenuItem,
		variant,
	} = useAccordionContext();
	const { isExpanded, onExpansion, headerId, panelId, isPinned } = useAccordionItemContext();
	const shouldHideArrows = hideArrows || isPinned;

	const handleExpansion = useCallback(() => {
		onExpansion(!isExpanded);
	}, [isExpanded, onExpansion]);

	const buttonRef = useRef();
	const isSelected = focusedMenuItem && focusedMenuItem === headerId;

	useEffect(() => {
		if (isSelected && buttonRef.current) {
			buttonRef.current.focus();
		}
	}, [isSelected]);

	const handleBlur = useCallback(() => {
		if (headerId) {
			setFocusedMenuItem(null);
		}
	}, [setFocusedMenuItem, headerId]);

	const handleFocus = useCallback(() => {
		if (headerId) {
			setFocusedMenuItem(headerId);
		}
	}, [setFocusedMenuItem, headerId]);

	useEffect(() => {
		if (headerId) {
			focusableChildList.current.push(headerId);
		}
	}, [headerId, focusableChildList]);

	return (
		<Box
			display="flex"
			gridArea="header"
			borderTop={1}
			borderTopColor="accordion.sectionBorder"
			alignItems="center"
			{...props}
		>
			<Heading ariaLevel={ariaLevel}>
				<Button
					isExpanded={isExpanded}
					onBlur={isPinned ? undefined : handleBlur}
					onClick={isPinned ? undefined : handleExpansion}
					onFocus={isPinned ? undefined : handleFocus}
					ref={buttonRef}
					panelId={panelId}
					headerId={headerId}
					disabled={isPinned}
					paddingY={variant === 'minimal' ? 4 : 5}
					paddingX={variant === 'minimal' ? 4 : [5, 6]}
					gridColumnGap={4}
					hideArrows={shouldHideArrows}
					width={['100%', 'max-content']}
				>
					{!shouldHideArrows && (
						<Box lineHeight={0} alignSelf="center">
							{isExpanded ? <ChevronDown /> : <ChevronRight />}
						</Box>
					)}
					<ButtonContent>
						{children ? (
							<HoverableText
								textStyle={variant === 'minimal' ? 'ui.14' : 'ui.16'}
								display="grid"
								color="accordion.sectionHeaderTitle"
								fontWeight="semibold"
								lineHeight="16px"
							>
								{children}
							</HoverableText>
						) : null}
						{subtitle ? (
							<HoverableText
								textStyle="ui.14"
								display="block"
								color="accordion.sectionHeaderSubtitle"
								overflow="hidden"
								textOverflow="ellipsis"
								lineHeight="16px"
							>
								{subtitle}
							</HoverableText>
						) : null}
					</ButtonContent>
				</Button>
			</Heading>
			{renderCustomIndicator ? (
				<Box display="flex" gridRow={1} marginRight={variant === 'minimal' ? 4 : [5, 6]}>
					{renderCustomIndicator({ isExpanded, onExpansion: handleExpansion })}
				</Box>
			) : null}
		</Box>
	);
}

AccordionHeader.propTypes = {
	/** Children will be rendered as part of the header title. */
	children: PropTypes.node,
	/** The subtitle is separated from the header title by a small gap.*/
	subtitle: PropTypes.node,
	/** Defines the hierarchical level of an element within a structure. */
	ariaLevel: PropTypes.number,
	/** Receives an isExpanded boolean value. */
	renderCustomIndicator: PropTypes.func,
	...Box.propTypes,
};

const Heading = styled.header.attrs(({ ariaLevel }) => ({
	role: 'heading',
	'aria-level': ariaLevel,
}))`
	flex: 1;
	min-width: 0;
	width: 100%;
`;

const Button = styled(UtilityButton).attrs(({ isExpanded, panelId, headerId }) => ({
	role: 'button',
	'aria-expanded': isExpanded,
	'aria-controls': `accordion-panel-${panelId}`,
	id: `accordion-header-${headerId}`,
}))`
	height: 100%;
	text-align: left;
	display: flex;
	align-items: baseline;
	line-height: 1;

	${({ theme }) => css`
		&:hover {
			color: ${theme.colors.button.primaryHover};

			path {
				fill: currentColor;
			}
		}
	`}
`;

const HoverableText = styled(Text)`
	${Button}:hover & {
		color: inherit;
	}
`;

const ButtonContent = styled(Box).attrs(() => ({ gridGap: 4 }))`
	display: inline-grid;
	grid-template-columns: min-content auto;
	align-items: baseline;
	white-space: nowrap;
`;
