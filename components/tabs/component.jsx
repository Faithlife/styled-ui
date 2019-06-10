// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TabContextProvider, usePanelIdsHandler } from './tab-utils';

export function TabManager({ children, theme, selectedTab, onSelectedTabChange }) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(selectedTab || 0);
	const { panelIdsMap, registerPanelId, unRegisterPanelId } = usePanelIdsHandler();

	useEffect(() => {
		if (selectedTab !== null && selectedTab !== undefined) {
			setSelectedTabIndex(selectedTab);
		}
	}, [selectedTab]);

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
			theme,
			panelIdsMap,
			registerPanelId,
			unRegisterPanelId,
		}),
		[selectedTabIndex, handleSelectTab, theme, panelIdsMap, registerPanelId, unRegisterPanelId],
	);

	return <TabContextProvider value={context}>{children}</TabContextProvider>;
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
};

TabManager.defaultProps = {
	theme: {},
};
