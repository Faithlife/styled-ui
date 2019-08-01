import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Collapse } from '../collapse';
import { useAccordionItemContext } from './accordion-util';

export function AccordionPanel({ children }) {
	const { isExpanded, headerId, panelId } = useAccordionItemContext();
	return (
		<Box>
			<Collapse isOpen={isExpanded}>
				<Box
					role="region"
					aria-labelledby={`accordion-header-${headerId}`}
					id={`accordion-panel-${panelId}`}
					gridArea="panel"
					padding={6}
					paddingTop={4}
				>
					{children}
				</Box>
			</Collapse>
		</Box>
	);
}

AccordionPanel.propTypes = {
	/** Children will be rendered as contents of the panel. */
	children: PropTypes.node,
};
