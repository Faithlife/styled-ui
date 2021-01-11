import { useCallback } from 'react';

const handledKeys = {
	enter: 'Enter',
	spaceBar: ' ',
	arrowDown: 'ArrowDown',
	arrowUp: 'ArrowUp',
	escape: 'Escape',
	home: 'Home',
	end: 'End',
};

export function useKeyboardActivate(onToggleMenu, focusedMenuItem, setFocusedMenuItem) {
	const handleKeyboardActivate = useCallback(
		event => {
			switch (event.key) {
				case handledKeys.enter:
				case handledKeys.spaceBar: {
					event.preventDefault();
					onToggleMenu();
					break;
				}
				case handledKeys.arrowDown: {
					event.preventDefault();
					setFocusedMenuItem(
						focusedMenuItem && typeof focusedMenuItem === 'number' ? focusedMenuItem + 1 : 'first',
					);
					onToggleMenu();
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					setFocusedMenuItem(
						focusedMenuItem && typeof focusedMenuItem === 'number' ? focusedMenuItem - 1 : 'last',
					);
					onToggleMenu();
					break;
				}
				default:
					return;
			}
		},
		[onToggleMenu, setFocusedMenuItem, focusedMenuItem],
	);

	return handleKeyboardActivate;
}
