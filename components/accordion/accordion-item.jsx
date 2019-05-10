import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useAccordionContext, AccordionItemContextProvider } from './accordion-util';
import * as Styled from './styled-item';

export function AccordionItem({ children, index }) {
	const { expandedSections, onExpansion } = useAccordionContext();

	const handleExpansion = useCallback(
		isExpanded => {
			onExpansion(index, isExpanded);
		},
		[onExpansion, index],
	);

	const context = useMemo(
		() => ({
			index,
			isExpanded: expandedSections.includes(index),
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
