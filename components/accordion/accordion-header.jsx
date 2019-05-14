import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import ExpandedIcon from './svgs/expanded-icon.svg';
import CollapsedIcon from './svgs/collapsed-icon.svg';
import { AccordionIndicator } from './accordion-indicator';
import { useAccordionContext, useAccordionItemContext } from './accordion-util';
import * as Styled from './styled-header';

export function AccordionHeader({ children, customIndicator, headingLevel, subtitle }) {
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
		<Styled.HeadingWrapper customIndicator={customIndicator}>
			<Styled.Heading as={`h${headingLevel}`}>
				<Styled.Button
					isExpanded={isExpanded}
					onBlur={handleBlur}
					onClick={handleExpansion}
					onFocus={handleFocus}
					ref={buttonRef}
				>
					<Styled.ButtonContentWrapper hideArrows={hideArrows} subtitle={subtitle}>
						<React.Fragment>
							{!hideArrows && (
								<div>
									<img src={isExpanded ? ExpandedIcon : CollapsedIcon} role="presentation" alt="" />
								</div>
							)}
							<Styled.ButtonContent>
								{children ? <Styled.Title>{children}</Styled.Title> : null}
								{subtitle ? <Styled.Subtitle>{subtitle}</Styled.Subtitle> : null}
							</Styled.ButtonContent>
						</React.Fragment>
					</Styled.ButtonContentWrapper>
				</Styled.Button>
			</Styled.Heading>
			{customIndicator ? (
				<AccordionIndicator>
					{customIndicator({ isExpanded, onExpansion: handleExpansion })}
				</AccordionIndicator>
			) : null}
		</Styled.HeadingWrapper>
	);
}

AccordionHeader.propTypes = {
	children: PropTypes.node,
	/** A render prop which receives an isExpanded boolean value. */
	customIndicator: PropTypes.func,
	/** Which HTML heading element to use. */
	headingLevel: PropTypes.number,
	/** In most cases the subtitle should be hidden on mobile viewports, but that is a responsibility of the consumer. */
	subtitle: PropTypes.node,
};

AccordionHeader.defaultProps = {
	headingLevel: 1,
};
