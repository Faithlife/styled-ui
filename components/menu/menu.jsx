import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useId } from '../shared-hooks';
import { DefaultThemeProvider } from '../DefaultThemeProvider';
import { itemNavigation, DropdownContextProvider } from './utils';

export function Menu({ isOpen, onToggleMenu, children, width }) {
	const itemList = useRef([]);
	const [focusedItemIndex, setFocusedItemIndex] = useState(null);

	const menuId = useId();
	const toggleRef = useRef();
	const splitRef = useRef();

	useEffect(() => {
		if (!isOpen) {
			setFocusedItemIndex(null);
		}
	}, [isOpen]);

	useEffect(() => {
		if (focusedItemIndex !== null) {
			itemList.current[focusedItemIndex]?.focus();
		}
	}, [focusedItemIndex]);

	const onCloseMenu = useCallback(() => {
		if (isOpen) {
			onToggleMenu();
			splitRef.current ? splitRef.current.focus() : toggleRef.current?.focus();
		}
	}, [isOpen, onToggleMenu]);

	const registerItem = useCallback(index => {
		return ref => {
			let newList = [...itemList.current];
			if (itemList.current.length < index) {
				newList = newList.slice(0, index);
			}
			newList[index] = ref;

			itemList.current = newList;
		};
	}, []);

	const onKeyboardNav = useCallback(
		nav => {
			setTimeout(() => {
				const itemIndexes = itemList.current
					.map((item, index) => (item !== null ? index : null))
					.filter(x => x !== null);
				const currentIndex = focusedItemIndex && itemIndexes.findIndex(x => x === focusedItemIndex);

				switch (nav) {
					case itemNavigation.first: {
						setFocusedItemIndex(itemIndexes[0]);
						break;
					}
					case itemNavigation.last: {
						setFocusedItemIndex(itemIndexes[itemIndexes.length - 1]);
						break;
					}
					case itemNavigation.next: {
						const nextIndex = currentIndex === itemIndexes.length - 1 ? 0 : currentIndex + 1;
						setFocusedItemIndex(itemIndexes[nextIndex]);
						break;
					}
					case itemNavigation.prev: {
						const nextIndex = currentIndex === 0 ? itemIndexes.length - 1 : currentIndex - 1;
						setFocusedItemIndex(itemIndexes[nextIndex]);
						break;
					}
				}
			}, 0);
		},
		[focusedItemIndex],
	);

	return (
		<DefaultThemeProvider>
			<DropdownContextProvider
				value={{
					isOpen,
					onToggleMenu,
					registerItem,
					menuId: `dropdownMenu-${menuId}`,
					toggleRef,
					splitRef,
					width,
					onKeyboardNav,
					focusedItemIndex,
					onCloseMenu,
				}}
			>
				{children}
			</DropdownContextProvider>
		</DefaultThemeProvider>
	);
}
