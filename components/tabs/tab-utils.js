import React, { useCallback, useContext } from 'react';
import { useBasicMap } from '../shared-hooks';

const handledKeys = Object.freeze({
	arrowRight: 'ArrowRight',
	arrowLeft: 'ArrowLeft',
	arrowDown: 'ArrowDown',
	home: 'Home',
	end: 'End',
});

export const TabContext = React.createContext();

export function useTabContext() {
	const context = useContext(TabContext);

	return context;
}

export function useKeyboardNav(selectedIndex, onSelectTab, children) {
	const handleKeyboardNav = useCallback(
		event => {
			const enabledTabIndexes = React.Children.map(
				children,
				(child, index) => (child.props.disabled ? null : index),
			).filter(index => index !== null);
			const currentEnabledIndex = enabledTabIndexes.indexOf(selectedIndex);

			switch (event.key) {
				case handledKeys.arrowRight: {
					const nextEnabledIndex = (currentEnabledIndex + 1) % enabledTabIndexes.length;
					onSelectTab(enabledTabIndexes[nextEnabledIndex]);
					break;
				}
				case handledKeys.arrowLeft: {
					const nextEnabledIndex =
						(currentEnabledIndex - 1 + enabledTabIndexes.length) % enabledTabIndexes.length;
					onSelectTab(enabledTabIndexes[nextEnabledIndex]);
					break;
				}
				case handledKeys.home: {
					onSelectTab(enabledTabIndexes[0]);
					break;
				}
				case handledKeys.end: {
					onSelectTab(enabledTabIndexes[enabledTabIndexes.length - 1]);
					break;
				}
				default:
					return;
			}
		},
		[selectedIndex, onSelectTab, children],
	);

	return handleKeyboardNav;
}

export function usePanelIdsHandler() {
	const panelIdsMap = useBasicMap();

	const registerPanelId = useCallback(
		(index, id) => {
			panelIdsMap.add(index, id);
		},
		[panelIdsMap.add],
	);

	const unRegisterPanelId = useCallback(
		index => {
			panelIdsMap.remove(index);
		},
		[panelIdsMap.remove],
	);

	return { panelIdsMap: panelIdsMap.map, registerPanelId, unRegisterPanelId };
}
