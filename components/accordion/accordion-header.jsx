import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ExpandedIcon from './svgs/expanded-icon.svg';
import CollapsedIcon from './svgs/collapsed-icon.svg';
import { useAccordionContext, useAccordionItemContext } from './accordion-util';
import * as Styled from './styled-header';

export function AccordionHeader({ ariaLevel, children, renderCustomIndicator, subtitle }) {
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
		<Styled.HeadingWrapper renderCustomIndicator={renderCustomIndicator}>
			<Styled.Heading ariaLevel={ariaLevel}>
				<Styled.Button
					isExpanded={isExpanded}
					onBlur={handleBlur}
					onClick={handleExpansion}
					onFocus={handleFocus}
					ref={buttonRef}
					panelId={panelId}
					headerId={headerId}
				>
					<Styled.ButtonContentWrapper hideArrows={hideArrows} subtitle={subtitle}>
						<React.Fragment>
							{!hideArrows && (
								<img src={isExpanded ? ExpandedIcon : CollapsedIcon} role="presentation" alt="" />
							)}
							<Styled.ButtonContent>
								{children ? <Styled.Title>{children}</Styled.Title> : null}
								{subtitle ? <Styled.Subtitle>{subtitle}</Styled.Subtitle> : null}
							</Styled.ButtonContent>
						</React.Fragment>
					</Styled.ButtonContentWrapper>
				</Styled.Button>
			</Styled.Heading>
			{renderCustomIndicator ? (
				<Styled.Indicator>
					{renderCustomIndicator({ isExpanded, onExpansion: handleExpansion })}
				</Styled.Indicator>
			) : null}
		</Styled.HeadingWrapper>
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
