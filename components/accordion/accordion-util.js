import React, { useCallback, useContext } from 'react';

const handledKeys = {
	arrowDown: 'ArrowDown',
	arrowUp: 'ArrowUp',
	home: 'Home',
	end: 'End',
};

const AccordionContext = React.createContext();

export const AccordionContextProvider = AccordionContext.Provider;

export function useAccordionContext() {
	const context = useContext(AccordionContext);

	return context;
}

const AccordionItemContext = React.createContext();

export const AccordionItemContextProvider = AccordionItemContext.Provider;

export function useAccordionItemContext() {
	const context = useContext(AccordionItemContext);

	return context;
}

export function useKeyboardNav(selectedIndex, setSelectedIndex, focusableItemIndexes) {
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
				default:
					return;
			}
		},
		[selectedIndex, setSelectedIndex, focusableItemIndexes],
	);

	return handleKeyboardNav;
}
