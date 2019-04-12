import React, { useContext, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TabContext } from './use-tab-list';
import * as Styled from './styled.jsx';

export function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelsContainerRef, theme, styleOverrides } = useContext(
		TabContext,
	);
	const handleKeyboardNav = useKeyboardNav(
		selectedTabIndex,
		onSelectTab,
		panelsContainerRef,
		children,
	);

	return (
		<Styled.TabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child, {
					selected: selectedTabIndex === index,
					onSelectTab,
					index,
					theme,
					styleOverrides,
				}),
			)}
		</Styled.TabList>
	);
}

TabList.propTypes = {
	children: PropTypes.node.isRequired,
};

export function Tab({ children, disabled, ...otherProps }) {
	const { index, selected, onSelectTab, theme, styleOverrides } = otherProps;
	const tabRef = useRef();

	useEffect(
		() => {
			if (selected && tabRef.current) {
				tabRef.current.focus();
			}
		},
		[selected, tabRef.current],
	);

	const handleSelectTab = useCallback(
		() => {
			onSelectTab(index);
		},
		[onSelectTab, index],
	);

	return (
		<Styled.Tab disabled={disabled} index={index} selected={selected} onClick={handleSelectTab}>
			<Styled.TabContent
				ref={tabRef}
				disabled={disabled}
				theme={theme}
				styleOverrides={styleOverrides}
				selected={selected}
			>
				{children}
			</Styled.TabContent>
		</Styled.Tab>
	);
}

Tab.propTypes = {
	/** What will be displayed on the tab, usually text */
	children: PropTypes.node.isRequired,
	disabled: PropTypes.bool,
};

const handledKeys = Object.freeze({
	arrowRight: 'ArrowRight',
	arrowLeft: 'ArrowLeft',
	arrowDown: 'ArrowDown',
	home: 'Home',
	end: 'End',
});

function useKeyboardNav(selectedIndex, onSelectTab, panelsContainerRef, children) {
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
				case handledKeys.arrowDown: {
					event.preventDefault();
					console.log(panelsContainerRef.current);
					if (panelsContainerRef.current) {
						panelsContainerRef.current.focus();
					}
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

/*
// target can be a string or element
function useEventListener(eventName, callback, target = 'window') {
	const savedCallback = useRef(callback);

	useEffect(
		() => {
			savedCallback.current = callback;
		},
		[callback],
	);

	useEffect(
		() => {
			function handleEvent(event) {
				savedCallback.current(event);
			}

			if (target) {
				const targetElement = typeof target === 'string' ? window[target] : target;

				targetElement.addEventListener(eventName, handleEvent);

				return () => targetElement.removeEventListener(eventName, handleEvent);
			}
		},
		[target],
	);
}
*/
