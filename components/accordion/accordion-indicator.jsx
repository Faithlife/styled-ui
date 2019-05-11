import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionItemContext } from './accordion-util';
import * as Styled from './styled-indicator';

export function AccordionIndicator({ children }) {
	const { isExpanded } = useAccordionItemContext();
	return (
		<Styled.Indicator>
			{React.Children.map(children, child => React.cloneElement(child, { isExpanded }))}
		</Styled.Indicator>
	);
}

AccordionIndicator.propTypes = {
	children: PropTypes.node,
};
