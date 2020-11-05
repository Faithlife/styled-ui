import React, { useContext, useCallback } from 'react';
const DropdownContext = React.createContext();

export const DropdownContextProvider = DropdownContext.Provider;

export function useDropdownContext() {
	const context = useContext(DropdownContext);

	return context;
}

export const itemNavigation = {
	first: 'first',
	last: 'last',
	next: 'next',
	prev: 'prev',
};

export const handledKeys = {
	enter: 'Enter',
	spaceBar: ' ',
	arrowDown: 'ArrowDown',
	arrowUp: 'ArrowUp',
	escape: 'Escape',
	home: 'Home',
	end: 'End',
};

export function useKeyboardActivate(onToggleMenu, onKeyboardNav) {
	const handleKeyboardActivate = useCallback(
		event => {
			switch (event.key) {
				case handledKeys.enter:
				case handledKeys.spaceBar:
				case handledKeys.arrowDown: {
					event.preventDefault();
					onToggleMenu();
					onKeyboardNav(itemNavigation.first);
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					// Should select the last menuItem
					onToggleMenu();
					onKeyboardNav(itemNavigation.last);
					break;
				}
				default:
					return;
			}
		},
		[onToggleMenu, onKeyboardNav],
	);

	return handleKeyboardActivate;
}

export function useKeyboardNavigate(onCloseMenu, onKeyboardNav) {
	const handleKeyboardNavigate = useCallback(
		event => {
			switch (event.key) {
				case handledKeys.escape: {
					event.preventDefault();
					onCloseMenu();
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.prev);
					break;
				}
				case handledKeys.arrowDown: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.next);
					break;
				}
				case handledKeys.home: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.first);
					break;
				}
				case handledKeys.end: {
					event.preventDefault();
					onKeyboardNav(itemNavigation.last);
					break;
				}
				default:
					return;
			}
		},
		[onCloseMenu, onKeyboardNav],
	);

	return handleKeyboardNavigate;
}
