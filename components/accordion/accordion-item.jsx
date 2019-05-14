import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAccordionContext, AccordionItemContextProvider } from './accordion-util';
import * as Styled from './styled-item';

export function AccordionItem({ children, index }) {
	const { expandedSections, onExpansion } = useAccordionContext();

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
		<Styled.AccordionItem>
			<AccordionItemContextProvider value={context}>{children}</AccordionItemContextProvider>
		</Styled.AccordionItem>
	);
}

AccordionItem.propTypes = {
	children: PropTypes.node.isRequired,
	/** This is supplied by the Accordion component. */
	index: PropTypes.number,
};
