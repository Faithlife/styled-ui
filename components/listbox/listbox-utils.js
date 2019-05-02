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

export function useKeyboardActivate(onToggleMenu, focusedMenuItem, setSelectedItem) {
	const handleKeyboardActivate = useCallback(
		event => {
			switch (event.key) {
				case handledKeys.enter:
				case handledKeys.spaceBar:
				case handledKeys.arrowDown: {
					event.preventDefault();
					setSelectedItem(
						focusedMenuItem && typeof focusedMenuItem === 'number' ? focusedMenuItem + 1 : 'first',
					);
					onToggleMenu();
					break;
				}
				case handledKeys.arrowUp: {
					event.preventDefault();
					setSelectedItem(
						focusedMenuItem && typeof focusedMenuItem === 'number' ? focusedMenuItem - 1 : 'last',
					);
					onToggleMenu();
					break;
				}
				default:
					return;
			}
		},
		[onToggleMenu, setSelectedItem],
	);

	return handleKeyboardActivate;
}
