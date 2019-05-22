import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from '../collapse';
import { useAccordionItemContext } from './accordion-util';
import * as Styled from './styled-panel';

export function AccordionPanel({ children }) {
	const { isExpanded, headerId, panelId } = useAccordionItemContext();
	return (
		<Styled.PanelContainer>
			<Collapse isOpen={isExpanded}>
				<Styled.Panel headerId={headerId} panelId={panelId}>
					{children}
				</Styled.Panel>
			</Collapse>
		</Styled.PanelContainer>
	);
}

AccordionPanel.propTypes = {
	/** Children will be rendered as contents of the panel. */
	children: PropTypes.node,
};
