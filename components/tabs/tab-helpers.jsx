import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TabContext, useKeyboardNav } from './tab-utils';
import * as Styled from './styled.jsx';

export function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelsContainerRef, theme, styleOverrides } = useContext(
		TabContext,
	);
	const handleKeyboardNav = useKeyboardNav(
		selectedTabIndex,
		onSelectTab,
		panelsContainerRef,
		children,
	);

	return (
		<Styled.TabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child, {
					selected: selectedTabIndex === index,
					onSelectTab,
					index,
					theme,
					styleOverrides,
				}),
			)}
		</Styled.TabList>
	);
}

TabList.propTypes = {
	children: PropTypes.node.isRequired,
};

export function TabPanels({ children }) {
	const { panelsContainerRef, selectedTabIndex } = useContext(TabContext);
	return (
		<Styled.TabPanels ref={panelsContainerRef}>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child, { index, selected: selectedTabIndex === index }),
			)}
		</Styled.TabPanels>
	);
}

TabPanels.propTypes = {
	children: PropTypes.node.isRequired,
};

export function TabPanel({ children, ...otherProps }) {
	const { selected } = otherProps;

	return <Styled.TabPanel selected={selected}>{children}</Styled.TabPanel>;
}

TabPanel.propTypes = {
	children: PropTypes.node.isRequired,
};
