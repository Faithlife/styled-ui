import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '../collapse';
import { useAccordionItemContext } from './accordion-util';
import * as Styled from './styled-panel';

export function AccordionPanel({ children }) {
	const { isExpanded, headerId, panelId } = useAccordionItemContext();
	return (
		<Collapse isOpen={isExpanded}>
			<Styled.AccordionPanel headerId={headerId} panelId={panelId}>
				{children}
			</Styled.AccordionPanel>
		</Collapse>
	);
}

AccordionPanel.propTypes = {
	children: PropTypes.node,
};
