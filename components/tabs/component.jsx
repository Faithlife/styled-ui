// Many of the ARIA options and designs are taken from Reach-Ui: https://ui.reach.tech/tabs

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TabContext } from './tab-utils';

export function TabManager({ children, theme, styleOverrides, selectedTab, onSelectedTabChange }) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(selectedTab || 0);
	const panelsContainerRef = useRef();

	useEffect(
		() => {
			if (selectedTab !== null && selectedTab !== undefined) {
				setSelectedTabIndex(selectedTab);
			}
		},
		[selectedTab],
	);

	const handleSelectTab = useCallback(
		tabIndex => {
			if (onSelectedTabChange) {
				onSelectedTabChange(tabIndex);
			}
			setSelectedTabIndex(tabIndex);
		},
		[onSelectedTabChange],
	);

	const context = useMemo(
		() => ({
			selectedTabIndex,
			onSelectTab: handleSelectTab,
			panelsContainerRef,
			theme,
			styleOverrides,
		}),
		[selectedTabIndex, handleSelectTab, theme, styleOverrides, panelsContainerRef],
	);

	return <TabContext.Provider value={context}>{children}</TabContext.Provider>;
}

TabManager.propTypes = {
	children: PropTypes.node.isRequired,
	selectedTab: PropTypes.number,
	onSelectedTabChange: PropTypes.func,
	theme: PropTypes.shape({
		tabHighlightColor: PropTypes.string,
		activeBackgroundColor: PropTypes.string,
		inactiveBackgroundColor: PropTypes.string,
	}),
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
		width: PropTypes.string,
		padding: PropTypes.string,
	}),
};

TabManager.defaultProps = {
	theme: {},
	styleOverrides: {},
};
