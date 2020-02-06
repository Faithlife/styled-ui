import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useKeyboardNav, AccordionContextProvider } from './accordion-util';

export function Accordion({
	children,
	expandedSections,
	hideArrows,
	onExpansion,
	styleOverrides,
	variant,
	mountOnEnter,
	unmountOnExit,
	...props
}) {
	const [focusedMenuItem, setFocusedMenuItem] = useState(null);
	const focusableChildList = useRef([]);
	const handleKeyboardNav = useKeyboardNav(
		focusedMenuItem,
		setFocusedMenuItem,
		focusableChildList.current,
	);

	const handleExpansion = useCallback(
		(index, isExpanded) => {
			const set = new Set(expandedSections);
			if (isExpanded) {
				set.add(index);
			} else {
				set.delete(index);
			}
			onExpansion(Array.from(set));
		},
		[expandedSections, onExpansion],
	);

	const context = useMemo(
		() => ({
			expandedSections,
			focusedMenuItem,
			focusableChildList,
			hideArrows,
			onExpansion: handleExpansion,
			setFocusedMenuItem,
			styleOverrides,
			variant,
			mountOnEnter,
			unmountOnExit,
		}),
		[
			expandedSections,
			focusedMenuItem,
			hideArrows,
			handleExpansion,
			styleOverrides,
			variant,
			mountOnEnter,
			unmountOnExit,
		],
	);

	return (
		<Box onKeyDown={handleKeyboardNav} borderBottom={1} borderColor="gray14" {...props}>
			<AccordionContextProvider value={context}>
				{React.Children.map(children, (child, index) =>
					React.isValidElement(child) ? React.cloneElement(child, { index }) : null,
				)}
			</AccordionContextProvider>
		</Box>
	);
}

Accordion.propTypes = {
	/** Should contain Accordion.Item components. */
	children: PropTypes.node.isRequired,
	/** An array of indexes for Accordion.Items which should be expanded. */
	expandedSections: PropTypes.arrayOf(PropTypes.number).isRequired,
	/** For hiding the default arrow indicators. */
	hideArrows: PropTypes.bool,
	/** Will be called with an array of indexes for Accordion.Items which should be expanded. */
	onExpansion: PropTypes.func.isRequired,
	/** true if panel contents should not be mounted until the section is open **/
	mountOnEnter: PropTypes.bool,
	/** true if panel contents should be unmounted when the section is closed **/
	unmountOnExit: PropTypes.bool,
	styleOverrides: PropTypes.shape({
		panelPadding: PropTypes.string,
	}),
};

Accordion.defaultProps = {
	expandedSections: [],
	styleOverrides: {},
};
