// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TabContextProvider, usePanelIdsHandler } from './tab-utils';
import { DefaultThemeProvider } from '../DefaultThemeProvider';

/** A wrapper that handles the tabs and their content. */
export function TabManager({ children, selectedTab, onSelectedTabChange, variant }) {
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
			panelIdsMap,
			registerPanelId,
			unRegisterPanelId,
			variant,
		}),
		[selectedTabIndex, handleSelectTab, panelIdsMap, registerPanelId, unRegisterPanelId, variant],
	);

	return (
		<DefaultThemeProvider>
			<TabContextProvider value={context}>{children}</TabContextProvider>
		</DefaultThemeProvider>
	);
}

TabManager.propTypes = {
	/** Direct children should be `Tab.List`/`SequencedTab.List` and `Tab.Panels`. */
	children: PropTypes.node.isRequired,
	selectedTab: PropTypes.number,
	/**
	 * A function taking the selected tab's index that will be called whenever a new tab is selected.
	 * @type {(tabIndex: number) => void}
	 */
	onSelectedTabChange: PropTypes.func,
	variant: PropTypes.oneOf(['modal', 'page']),
};

TabManager.defaultProps = {
	variant: 'modal',
};
