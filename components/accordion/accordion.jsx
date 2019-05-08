import React, { useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useKeyboardNav } from '../dropdown/dropdown-utils';
import { AccordionContextProvider } from './accordion-util';
import * as Styled from './styled-accordion';

export function Accordion({ children, hideArrows }) {
	const [focusedMenuItem, setFocusedMenuItem] = useState(null);
	const setFocusedMenuIndex = index => {
		setFocusedMenuItem(focusableChildList.current.indexOf(index));
	};
	const closeMenu = () => {};
	const focusableChildList = useRef([]);
	const handleKeyboardNav = useKeyboardNav(
		focusedMenuItem,
		setFocusedMenuItem,
		closeMenu,
		focusableChildList.current,
	);

	const context = useMemo(
		() => ({
			focusedMenuItem,
			focusableChildList: focusableChildList.current,
			hideArrows,
			setFocusedMenuIndex,
		}),
		[focusedMenuItem, focusableChildList, hideArrows, setFocusedMenuIndex],
	);

	return (
		<Styled.Accordion onKeyDown={handleKeyboardNav}>
			<AccordionContextProvider value={context}>{children}</AccordionContextProvider>
		</Styled.Accordion>
	);
}

Accordion.propTypes = {
	children: PropTypes.node,
	hideArrows: PropTypes.bool,
};
