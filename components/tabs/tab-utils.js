import React, { useCallback, useContext } from 'react';

const handledKeys = {
	arrowRight: 'ArrowRight',
	arrowLeft: 'ArrowLeft',
	arrowDown: 'ArrowDown',
	home: 'Home',
	end: 'End',
};

const TabContext = React.createContext();

export const TabContextProvider = TabContext.Provider;

export function useTabContext() {
	const context = useContext(TabContext);

	return context;
}

export function useKeyboardNav(tabList, selectedIndex, onSelectTab) {
	const handleKeyboardNav = useCallback(
		event => {
			const enabledTabIndexes = tabList.current
				.map((tab, index) => !tab.disabled && index)
				.filter(index => index !== false);
			const currentEnabledIndex = enabledTabIndexes.indexOf(selectedIndex);

			let selectedTabIndex;
			switch (event.key) {
				case handledKeys.arrowRight: {
					const nextEnabledIndex =
						currentEnabledIndex === enabledTabIndexes.length - 1 ? 0 : currentEnabledIndex + 1;
					selectedTabIndex = enabledTabIndexes[nextEnabledIndex];
					break;
				}
				case handledKeys.arrowLeft: {
					const nextEnabledIndex =
						currentEnabledIndex === 0 ? enabledTabIndexes.length - 1 : currentEnabledIndex - 1;
					selectedTabIndex = enabledTabIndexes[nextEnabledIndex];
					break;
				}
				case handledKeys.home: {
					event.preventDefault();
					selectedTabIndex = enabledTabIndexes[0];
					break;
				}
				case handledKeys.end: {
					event.preventDefault();
					selectedTabIndex = enabledTabIndexes[enabledTabIndexes.length - 1];
					break;
				}
				default:
					return;
			}

			tabList.current[selectedTabIndex].focus();
			onSelectTab(selectedTabIndex)();
		},
		[selectedIndex, onSelectTab, tabList],
	);

	return handleKeyboardNav;
}
