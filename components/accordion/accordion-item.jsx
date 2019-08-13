import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetStyles } from '../utils';
import { useId } from '../shared-hooks';
import { useAccordionContext, AccordionItemContextProvider } from './accordion-util';

export function AccordionItem({ children, index }) {
	const { expandedSections, onExpansion } = useAccordionContext();

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
		}),
		[headerId, panelId, index, isExpanded, handleExpansion],
	);

	return (
		<Item>
			<AccordionItemContextProvider value={context}>{children}</AccordionItemContextProvider>
		</Item>
	);
}

AccordionItem.propTypes = {
	/** Should contain exactly one Header and one Panel as children. */
	children: PropTypes.node.isRequired,
	/** This is supplied by the Accordion component. */
	index: PropTypes.number,
};

const Item = styled.section`
	${resetStyles};

	display: grid;
	grid-template-areas:
		'header'
		'panel';
`;
