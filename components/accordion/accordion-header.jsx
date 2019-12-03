import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '../Text';
import { Box } from '../Box';
import { UtilityButton } from '../button';
import { ChevronRight, ChevronExpand } from '../icons';
import { useAccordionContext, useAccordionItemContext } from './accordion-util';

export function AccordionHeader({ ariaLevel, children, renderCustomIndicator, subtitle }) {
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
			display="grid"
			gridArea="header"
			gridTemplateColumns={
				renderCustomIndicator ? '[title] 1fr [indicator] min-content' : '[title] auto [space] 0'
			}
			borderTop={1}
			borderTopColor="gray14"
			alignItems="center"
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
				>
					<ButtonContentWrapper
						paddingY={variant === 'minimal' ? 4 : 5}
						paddingX={variant === 'minimal' ? 4 : [5, 6]}
						gridColumnGap={4}
						hideArrows={shouldHideArrows}
						subtitle={subtitle}
					>
						<>
							{!shouldHideArrows && (isExpanded ? <ChevronExpand /> : <ChevronRight />)}
							<ButtonContent>
								{children ? (
									<Text
										textStyle={variant === 'minimal' ? 'ui.14' : 'ui.16'}
										display="grid"
										color="gray66"
										fontWeight="semibold"
									>
										{children}
									</Text>
								) : null}
								{subtitle ? (
									<Text textStyle="ui.14" display="grid" color="gray52">
										{subtitle}
									</Text>
								) : null}
							</ButtonContent>
						</>
					</ButtonContentWrapper>
				</Button>
			</Heading>
			{renderCustomIndicator ? (
				<Box gridColumn="indicator" gridRow={1} marginRight={variant === 'minimal' ? 4 : [5, 6]}>
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
};

const Heading = styled.header.attrs(({ ariaLevel }) => ({
	role: 'heading',
	'aria-level': ariaLevel,
}))`
	grid-column: 1 / span 2;
	grid-row: 1;
	min-width: 0;
	width: 100%;
`;

const Button = styled(UtilityButton).attrs(({ isExpanded, panelId, headerId }) => ({
	role: 'button',
	'aria-expanded': isExpanded,
	'aria-controls': `accordion-panel-${panelId}`,
	id: `accordion-header-${headerId}`,
}))`
	width: 100%;
	height: 100%;
	text-align: left;
`;

const ButtonContentWrapper = styled(Box)`
	display: grid;
	align-items: center;
	grid-template-columns: ${props => (props.hideArrows ? 'auto' : 'min-content auto')};

	line-height: 1;
`;

const ButtonContent = styled(Box).attrs(() => ({ gridGap: 6 }))`
	display: inline-grid;
	grid-template-columns: min-content auto;
	align-items: center;
	white-space: nowrap;
`;
