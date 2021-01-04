import React, { useCallback, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system } from 'styled-system';
import { propType as styledPropType } from '@styled-system/prop-types';
import { Box } from '../Box';
import { useKeyboardNav, AccordionContextProvider } from './accordion-util';
import { Panel } from './accordion-panel';

export function Accordion({
	children,
	expandedSections,
	hideArrows,
	onExpansion,
	variant = 'default',
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
			variant,
			mountOnEnter,
			unmountOnExit,
		}),
		[
			expandedSections,
			focusedMenuItem,
			hideArrows,
			handleExpansion,
			variant,
			mountOnEnter,
			unmountOnExit,
		],
	);

	return (
		<AccordionBox
			onKeyDown={handleKeyboardNav}
			borderBottom={1}
			borderColor="accordion.sectionBorder"
			{...props}
		>
			<AccordionContextProvider value={context}>
				{React.Children.map(children, (child, index) =>
					React.isValidElement(child) ? React.cloneElement(child, { index }) : null,
				)}
			</AccordionContextProvider>
		</AccordionBox>
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
	/** Determines the size and spacing of several UI elements. */
	variant: PropTypes.oneOf('default', 'minimal'),
	/** Overrides the `padding` style on all nested `Accordion.Panel`s */
	panelPadding: styledPropType,
	...Box.propTypes,
};

const AccordionBox = styled(Box)`
	${Panel} {
		${system({
			panelPadding: {
				property: 'padding',
				scale: 'space',
			},
		})}
	}
`;
