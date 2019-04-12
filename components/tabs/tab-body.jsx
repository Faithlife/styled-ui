import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { TabContext } from './use-tab-list';
import * as Styled from './styled.jsx';

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
