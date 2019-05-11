import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import ExpandedIcon from './svgs/expanded-icon.svg';
import CollapsedIcon from './svgs/collapsed-icon.svg';
import { useAccordionContext, AccordionItemContextProvider } from './accordion-util';
import { AccordionIndicator } from './accordion-indicator';
import * as Styled from './styled-item';

export function AccordionItem({ children, customIndicator, index }) {
	const { expandedSections, hideArrows, onExpansion } = useAccordionContext();

	const isExpanded = expandedSections.includes(index);

	const handleExpansion = useCallback(
		() => {
			onExpansion(index, !isExpanded);
		},
		[onExpansion, index, isExpanded],
	);

	const context = useMemo(
		() => ({
			index,
			isExpanded,
			onExpansion: handleExpansion,
		}),
		[expandedSections, handleExpansion, index],
	);

	return (
		<Styled.AccordionItem customIndicator={customIndicator}>
			<AccordionItemContextProvider value={context}>
				{children}
				{customIndicator ? (
					<AccordionIndicator>
						{customIndicator({ isExpanded, onExpansion: handleExpansion })}
					</AccordionIndicator>
				) : null}
			</AccordionItemContextProvider>
		</Styled.AccordionItem>
	);
}

AccordionItem.propTypes = {
	children: PropTypes.node.isRequired,
	/** This is supplied by the Accordion component. */
	customIndicator: PropTypes.func,
	index: PropTypes.number,
};
