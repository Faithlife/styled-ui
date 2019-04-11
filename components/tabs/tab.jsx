import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { TabContext } from './use-tab-list';
import * as Styled from './styled.jsx';

export function Tab({ children, name }) {
	const { registerTab, editTabName, selectedTabIndex, tabList } = useContext(TabContext);

	const [currentIndex, setCurrentIndex] = useState(null);
	const selected = selectedTabIndex === currentIndex;

	useEffect(() => {
		registerTab(name);
	}, []);

	useEffect(
		() => {
			setCurrentIndex(tabList.indexOf(name));
		},
		[tabList, name],
	);

	useEffect(
		() => {
			if (currentIndex) {
				editTabName(currentIndex, name);
			}
		},
		[currentIndex, name],
	);

	return <Styled.TabBody selected={selected}>{children}</Styled.TabBody>;
}

Tab.propTypes = {
	children: PropTypes.node.isRequired,
	/** Must be unique */
	name: PropTypes.string.isRequired,
};
