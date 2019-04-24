import React, { useContext, useCallback } from 'react';

const handledKeys = {
	enter: 'Enter',
	spaceBar: ' ',
	arrowDown: 'ArrowDown',
	arrowUp: 'ArrowUp',
	escape: 'Escape',
	home: 'Home',
	end: 'End',
};

const DropdownContext = React.createContext();

export const DropdownContextProvider = DropdownContext.Provider;

export function useDropdownContext() {
	const context = useContext(DropdownContext);

	return context;
}

export function useKeyboardActivate(onToggleMenu, setSelectedIndex) {
	const handleKeyboardActivate = useCallback(
		event => {
			switch (event.key) {
				case handledKeys.enter:
				case handledKeys.spaceBar:
				case handledKeys.arrowDown: {
					event.preventDefault();
					setSelectedIndex(0);
					onToggleMenu();
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					// Should select the last menuItem
					setSelectedIndex(-1);
					onToggleMenu();
					break;
				}
				default:
					return;
			}
		},
		[onToggleMenu, setSelectedIndex],
	);

	return handleKeyboardActivate;
}

export function getFocusableChildrenList(children) {
	return React.Children.map(
		children,
		(child, index) => (!child.type.isFocusableMenuChild ? null : index),
	).filter(index => index !== null);
}

export function useKeyboardNav(selectedIndex, setSelectedIndex, closeMenu, focusableItemIndexes) {
	const handleKeyboardNav = useCallback(
		event => {
			const currentEnabledIndex = focusableItemIndexes.indexOf(selectedIndex);

			switch (event.key) {
				case handledKeys.arrowDown: {
					event.preventDefault();
					const nextEnabledIndex = (currentEnabledIndex + 1) % focusableItemIndexes.length;
					setSelectedIndex(focusableItemIndexes[nextEnabledIndex]);
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					const nextEnabledIndex =
						(currentEnabledIndex - 1 + focusableItemIndexes.length) % focusableItemIndexes.length;
					setSelectedIndex(focusableItemIndexes[nextEnabledIndex]);
					break;
				}
				case handledKeys.home: {
					setSelectedIndex(focusableItemIndexes[0]);
					break;
				}
				case handledKeys.end: {
					setSelectedIndex(focusableItemIndexes[focusableItemIndexes.length - 1]);
					break;
				}
				case handledKeys.escape: {
					closeMenu();
					break;
				}
				default:
					return;
			}
		},
		[selectedIndex, setSelectedIndex, closeMenu, focusableItemIndexes],
	);

	return handleKeyboardNav;
}

export function useMenuItemKeyboardHandler(onTrigger) {
	const handleKeyUp = useCallback(event => {
		if (event.key === handledKeys.spaceBar) {
			event.preventDefault();
		}
	}, []);

	const handleKeyDown = useCallback(event => {
		if (event.key === handledKeys.spaceBar) {
			onTrigger();
		}
	});

	return [handleKeyDown, handleKeyUp];
}
