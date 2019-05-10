import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import ExpandedIcon from './svgs/expanded-icon.svg';
import CollapsedIcon from './svgs/collapsed-icon.svg';
import * as Styled from './styled-header';
import { useAccordionContext, useAccordionItemContext } from './accordion-util';

export function AccordionHeader({ children }) {
	const { focusedMenuItem, focusableChildList, hideArrows } = useAccordionContext();
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

	useEffect(
		() => {
			if (headerId) {
				focusableChildList.current.push(headerId);
			}
		},
		[headerId, focusableChildList],
	);
	return (
		<Styled.Heading as="h1">
			<Styled.Button isExpanded={isExpanded} onClick={handleExpansion} ref={buttonRef}>
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
