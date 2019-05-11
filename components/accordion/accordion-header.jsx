import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import ExpandedIcon from './svgs/expanded-icon.svg';
import CollapsedIcon from './svgs/collapsed-icon.svg';
import * as Styled from './styled-header';
import { useAccordionContext, useAccordionItemContext } from './accordion-util';

export function AccordionHeader({ children, headingLevel }) {
	const {
		focusedMenuItem,
		focusableChildList,
		hideArrows,
		setFocusedMenuItem,
	} = useAccordionContext();
	const { isExpanded, onExpansion } = useAccordionItemContext();

	const handleExpansion = useCallback(
		() => {
			onExpansion(!isExpanded);
		},
		[isExpanded, onExpansion],
	);

	const headerId = useId();
	const buttonRef = useRef();
	const isSelected = focusedMenuItem && focusedMenuItem === headerId;

	useEffect(
		() => {
			if (isSelected && buttonRef.current) {
				buttonRef.current.focus();
			}
		},
		[isSelected, buttonRef],
	);

	const handleBlur = useCallback(
		() => {
			if (headerId) {
				setFocusedMenuItem(null);
			}
		},
		[setFocusedMenuItem, headerId],
	);

	const handleFocus = useCallback(
		() => {
			if (headerId) {
				setFocusedMenuItem(headerId);
			}
		},
		[setFocusedMenuItem, headerId],
	);

	useEffect(
		() => {
			if (headerId) {
				focusableChildList.current.push(headerId);
			}
		},
		[headerId, focusableChildList],
	);
	return (
		<Styled.Heading as={`h${headingLevel}`}>
			<Styled.Button
				isExpanded={isExpanded}
				onBlur={handleBlur}
				onClick={handleExpansion}
				onFocus={handleFocus}
				ref={buttonRef}
			>
				<Styled.ButtonContent hideArrows={hideArrows}>
					<React.Fragment>
						{!hideArrows && (
							<div>
								<img src={isExpanded ? ExpandedIcon : CollapsedIcon} role="presentation" alt="" />
							</div>
						)}
						<div>{children}</div>
					</React.Fragment>
				</Styled.ButtonContent>
			</Styled.Button>
		</Styled.Heading>
	);
}

AccordionHeader.propTypes = {
	children: PropTypes.node,
};

AccordionHeader.defaultProps = {
	headingLevel: 1,
};
