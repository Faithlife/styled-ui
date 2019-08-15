import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetStyles } from '../utils';
import { Box } from '../Box';
import { Text } from '../Text';
import ExpandedIcon from './svgs/expanded-icon.svg';
import CollapsedIcon from './svgs/collapsed-icon.svg';
import { useAccordionContext, useAccordionItemContext } from './accordion-util';

export function AccordionHeader({
	ariaLevel,
	children,
	renderCustomIndicator,
	padding,
	paddingX,
	paddingRight,
	paddingLeft,
	...props
}) {
	const {
		focusedMenuItem,
		focusableChildList,
		hideArrows,
		setFocusedMenuItem,
	} = useAccordionContext();
	const { isExpanded, onExpansion, headerId, panelId } = useAccordionItemContext();

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
		>
			<Heading ariaLevel={ariaLevel}>
				<HeadingButton
					isExpanded={isExpanded}
					onBlur={handleBlur}
					onClick={handleExpansion}
					onFocus={handleFocus}
					ref={buttonRef}
					panelId={panelId}
					headerId={headerId}
				>
					<Box
						display="grid"
						alignItems="center"
						gridTemplateColumns={hideArrows ? 'auto' : 'min-content auto'}
						gridColumnGap={4}
						borderTop={1}
						borderColor="gray14"
						background="linear-gradient(180deg, #fafafa, hsla(0, 0%, 100%, 0))"
						paddingY={isDefined(padding) ? padding : 5}
						paddingRight={
							isDefined(paddingRight)
								? paddingRight
								: isDefined(paddingX)
								? paddingX
								: isDefined(padding)
								? padding
								: [5, null, 6]
						}
						paddingLeft={
							isDefined(paddingLeft)
								? paddingLeft
								: isDefined(paddingX)
								? paddingX
								: isDefined(padding)
								? padding
								: [5, null, 6]
						}
						css={{ lineHeight: '1' }}
						{...props}
					>
						<React.Fragment>
							{!hideArrows && (
								<img src={isExpanded ? ExpandedIcon : CollapsedIcon} role="presentation" alt="" />
							)}
							<Box
								display="inline-grid"
								gridTemplateColumns="min-content auto"
								gridGap={6}
								alignItems="center"
							>
								{children}
							</Box>
						</React.Fragment>
					</Box>
				</HeadingButton>
			</Heading>
			{renderCustomIndicator ? (
				<Box gridColumn="indicator" gridRow="1" marginTop={5} marginRight={[5, null, 6]}>
					{renderCustomIndicator({ isExpanded, onExpansion: handleExpansion })}
				</Box>
			) : null}
		</Box>
	);
}

AccordionHeader.propTypes = {
	/** Children will be rendered as part of the header title. */
	children: PropTypes.node,
	/** Defines the hierarchical level of an element within a structure. */
	ariaLevel: PropTypes.number,
	/** Receives an isExpanded boolean value. */
	renderCustomIndicator: PropTypes.func,
};

const Heading = styled.header.attrs({
	role: 'heading',
	'aria-level': ({ ariaLevel }) => ariaLevel,
})`
	${resetStyles};

	grid-column: 1 / span 2;
	grid-row: 1;
	min-width: 0;
	width: 100%;
`;

const HeadingButton = styled.button.attrs({
	role: 'button',
	'aria-expanded': ({ isExpanded }) => isExpanded,
	'aria-controls': ({ panelId }) => `accordion-panel-${panelId}`,
	id: ({ headerId }) => `accordion-header-${headerId}`,
})`
	${resetStyles};

	padding: 0;
	border: 0;
	background: 0;
	appearance: none;
	width: 100%;
	height: 100%;
	text-align: left;
`;

AccordionHeader.Title = ({ children, ...props }) => (
	<Text
		display="grid"
		color="gray52"
		textStyle="h.16"
		textTransform="uppercase"
		whiteSpace="nowrap"
		{...props}
	>
		{children}
	</Text>
);

AccordionHeader.Subtitle = ({ children, ...props }) => (
	<Text display="grid" color="gray52" textStyle="c.14" whiteSpace="nowrap" {...props}>
		{children}
	</Text>
);

const isDefined = function(value) {
	return value !== undefined && value !== null;
};
