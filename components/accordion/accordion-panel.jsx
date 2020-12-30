import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variant } from 'styled-system';
import { Collapse } from '../collapse';
import { Box } from '../Box';
import { useAccordionItemContext } from './accordion-util';
import { useAccordionContext } from './accordion-util';

export function AccordionPanel({ children, mountOnEnter, unmountOnExit, ...props }) {
	const ctx = useAccordionContext();
	const { isExpanded, headerId, panelId } = useAccordionItemContext();

	return (
		<Collapse
			isOpen={isExpanded}
			mountOnEnter={mountOnEnter ?? ctx.mountOnEnter}
			unmountOnExit={unmountOnExit ?? ctx.unmountOnExit}
		>
			<Panel headerId={headerId} panelId={panelId} variant={ctx.variant} {...props}>
				{children}
			</Panel>
		</Collapse>
	);
}

AccordionPanel.propTypes = {
	/** Children will be rendered as contents of the panel. */
	children: PropTypes.node,
	/** true if panel contents should not be mounted until the section is open **/
	mountOnEnter: PropTypes.bool,
	/** true if panel contents should be unmounted when the section is closed **/
	unmountOnExit: PropTypes.bool,
	...Box.propTypes,
};

export const Panel = styled(Box).attrs(({ headerId, panelId }) => ({
	role: 'region',
	'aria-labelledby': `accordion-header-${headerId}`,
	id: `accordion-panel-${panelId}`,
}))(
	variant({
		variants: {
			default: {
				padding: 6,
				paddingTop: 4,
			},
			minimal: {
				padding: 4,
				paddingTop: 0,
			},
		},
	}),
);
