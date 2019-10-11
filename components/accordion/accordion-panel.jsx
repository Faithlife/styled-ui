import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Collapse } from '../collapse';
import { Box } from '../Box';
import { useAccordionItemContext } from './accordion-util';
import { useAccordionContext } from './accordion-util';

export function AccordionPanel({ children, ...props }) {
	const { variant } = useAccordionContext();
	const { isExpanded, headerId, panelId, styleOverrides } = useAccordionItemContext();
	const paddingProps = {};
	if ('panelPadding' in styleOverrides) {
		paddingProps.padding = styleOverrides.panelPadding;
	} else if (!('padding' in props)) {
		paddingProps.padding = variant === 'minimal' ? 4 : 6;
		paddingProps.paddingTop = variant === 'minimal' ? 2 : 4;
	}

	return (
		<Collapse isOpen={isExpanded}>
			<Panel headerId={headerId} panelId={panelId} {...paddingProps} {...props}>
				{children}
			</Panel>
		</Collapse>
	);
}

AccordionPanel.propTypes = {
	/** Children will be rendered as contents of the panel. */
	children: PropTypes.node,
};

const Panel = styled(Box).attrs(({ headerId, panelId }) => ({
	role: 'region',
	'aria-labelledby': `accordion-header-${headerId}`,
	id: `accordion-panel-${panelId}`,
}))``;
