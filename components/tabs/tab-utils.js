import React, { useCallback, useContext, useRef, useEffect } from 'react';
import { useBasicMap } from '../shared-hooks';

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

export function useKeyboardNav(selectedIndex, onSelectTab, children) {
	const currentChildren = useRef();

	useEffect(() => {
		currentChildren.current = children;
	}, [children]);

	const handleKeyboardNav = useCallback(
		event => {
			const enabledTabIndexes = React.Children.map(currentChildren.current, (child, index) =>
				child.props.disabled ? null : index,
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
		[selectedIndex, onSelectTab],
	);

	return handleKeyboardNav;
}

export function usePanelIdsHandler() {
	const panelIdsMap = useBasicMap();

	const registerPanelId = useCallback(
		(index, id) => {
			panelIdsMap.add(index, id);
		},
		[panelIdsMap],
	);

	const unRegisterPanelId = useCallback(
		index => {
			panelIdsMap.remove(index);
		},
		[panelIdsMap],
	);

	return { panelIdsMap: panelIdsMap.map, registerPanelId, unRegisterPanelId };
}
