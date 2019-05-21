import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
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

	const headerId = useId();
	const panelId = useId();

	const context = useMemo(
		() => ({
			headerId,
			panelId,
			index,
			isExpanded,
			onExpansion: handleExpansion,
		}),
		[headerId, panelId, index, isExpanded, handleExpansion],
	);

	return (
		<Styled.Item>
			<AccordionItemContextProvider value={context}>{children}</AccordionItemContextProvider>
		</Styled.Item>
	);
}

AccordionItem.propTypes = {
	/** Should contain exactly one Header and one Panel as children. */
	children: PropTypes.node.isRequired,
	/** This is supplied by the Accordion component. */
	index: PropTypes.number,
};
