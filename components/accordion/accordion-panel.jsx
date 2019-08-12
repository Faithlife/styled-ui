import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { Collapse } from '../collapse';
import { useAccordionItemContext } from './accordion-util';

export function AccordionPanel({ children, padding, ...props }) {
	const { isExpanded, headerId, panelId } = useAccordionItemContext();
	return (
		<Box>
			<Collapse isOpen={isExpanded}>
				<Box
					role="region"
					aria-labelledby={`accordion-header-${headerId}`}
					id={`accordion-panel-${panelId}`}
					gridArea="panel"
					padding={padding !== undefined && padding !== null ? padding : 6}
					paddingTop={padding !== undefined && padding !== null ? padding : 4}
					{...props}
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
