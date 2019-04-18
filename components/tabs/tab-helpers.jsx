import React from 'react';
import PropTypes from 'prop-types';
import { useTabContext, useKeyboardNav } from './tab-utils';
import * as Styled from './styled';

export function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, theme } = useTabContext();

	const handleKeyboardNav = useKeyboardNav(selectedTabIndex, onSelectTab, children);

	return (
		<Styled.TabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child, {
					selected: selectedTabIndex === index,
					onSelectTab,
					index,
					theme,
				}),
			)}
		</Styled.TabList>
	);
}

TabList.propTypes = {
	children: PropTypes.node.isRequired,
};

export function TabPanels({ children }) {
	const { selectedTabIndex } = useTabContext();
	return (
		<div>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child, { index, selected: selectedTabIndex === index }),
			)}
		</div>
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
