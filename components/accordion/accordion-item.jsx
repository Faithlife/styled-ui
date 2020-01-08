import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { Box } from '../Box';
import { useAccordionContext, AccordionItemContextProvider } from './accordion-util';

export function AccordionItem({ children, index, pinned: isPinned, disabled: isDisabled }) {
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
			isExpanded: isPinned || (isExpanded && !isDisabled),
			onExpansion: handleExpansion,
			styleOverrides,
			isPinned,
			isDisabled,
		}),
		[headerId, panelId, index, isExpanded, handleExpansion, styleOverrides, isPinned, isDisabled],
	);

	return (
		<Box
			display="grid"
			css={`
				opacity: ${isDisabled ? 0.5 : 1};
			`}
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
