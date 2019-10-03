import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { Box } from '../Box';
import { useAccordionContext, AccordionItemContextProvider } from './accordion-util';

export function AccordionItem({ children, index, pinned: isPinned }) {
	const { expandedSections, onExpansion, styleOverrides } = useAccordionContext();

	const isExpanded = expandedSections.includes(index);

	const handleExpansion = useCallback(() => {
		onExpansion(index, !isExpanded);
	}, [onExpansion, index, isExpanded]);

	const headerId = useId();
	const panelId = useId();

	const context = useMemo(
		() => ({
			headerId,
			panelId,
			index,
			isExpanded,
			onExpansion: handleExpansion,
			styleOverrides,
			isPinned,
		}),
		[headerId, panelId, index, isExpanded, handleExpansion, styleOverrides, isPinned],
	);

	return (
		<Box
			display="grid"
			gridTemplateAreas={`
				'header'
				'panel'
			`}
		>
			<AccordionItemContextProvider value={context}>{children}</AccordionItemContextProvider>
		</Box>
	);
}

AccordionItem.propTypes = {
	/** Should contain exactly one Header and one Panel as children. */
	children: PropTypes.node.isRequired,
	/** This is supplied by the Accordion component. */
	index: PropTypes.number,
};
