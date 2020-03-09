import React, { useContext, useRef, useState, useMemo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { variant, layout, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { common, typography } from '../../theme/system';
import { tabs, tabLists, selected } from '../../theme/tabs';
import { useId } from '../shared-hooks';
import { Box } from '../Box';
import { UtilityButton } from '../button';

const tabVariant = variant({
	prop: 'variant',
	scale: 'tab',
	variants: tabs,
});

const selectedTabVariant = variant({
	prop: 'selectedVariant',
	scale: 'tab',
	variants: selected,
});

const tabListVariant = variant({
	prop: 'variant',
	scale: 'tab',
	variants: tabLists,
});

// const TabCore = styled.button.attrs(({ isSelected }) => ({ 'aria-selected': isSelected }))`
// 	box-sizing: border-box;
// 	font-family: inherit;
// 	background: transparent;
// 	border: none;
// 	padding: 0;
// 	color: inherit;
// 	text-decoration: none;
// 	box-shadow: none;
// 	white-space: nowrap;
// 	display: inline-flex;
// 	justify-content: center;
// 	align-items: center;
// 	outline: none;

// 	cursor: ${x => x.cursor || (x.disabled ? 'default' : 'pointer')};

// 	&::-moz-focus-inner {
// 		border: 0;
// 	}

// 	&:disabled {
// 		pointer-events: none;
// 	}

// 	${tabVariant}
// 	${textStyle};

// 	${common};
// 	${typography};
// 	${layout};
// 	${position};
// 	${border};
// 	${background};
// `;

// const TabListCore = styled(Box).attrs(() => ({
// 	columnGap: 3,
// }))`
// 	${tabListVariant}
// `;

// function TabList({}) {}

// export { Tab, TabList };

const TabContext = React.createContext();

const TabContextProvider = TabContext.Provider;

function useTabContext() {
	const context = useContext(TabContext);

	return context;
}

const TabCore = styled(UtilityButton).attrs(({ variant, selected, panelId }) => ({
	selectedVariant: `${variant}-${selected}`,

	role: 'tab',
	'aria-controls': panelId,
	'aria-selected': selected,
	tabIndex: selected ? 1 : -1,
}))`
	position: relative;

	display: block;
	white-space: nowrap;
	overflow-x: hidden;
	text-overflow: ellipsis;

	${tabVariant}
	${selectedTabVariant}
	${textStyle};

	${common};
	${typography};
	${layout};
	${position};
	${border};
	${background};
`;

const TabListCore = styled(Box).attrs(({ label, labeledBy }) => ({
	role: 'tablist',
	...(labeledBy ? { 'aria-labelledby': labeledBy } : { 'aria-label': label }),
}))`
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;

	${tabListVariant}
	${textStyle};

	${common};
	${layout};
	${position};
	${border};
	${background};
`;

const TabPanelCore = styled(Box).attrs(({ tabId }) => ({
	role: 'tabpanel',
	'aria-labelledby': tabId,
}))`
	display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

const TabPanelsCore = styled(Box).attrs({})``;

function TabManager({ variant, selectedTab, onSelectedTabChange, label, labeledBy, children }) {
	const tabList = useRef([]);
	const panelList = useRef([]);
	const [selectedTabIndex, setCurrentTab] = useState(selectedTab || 0);

	useEffect(() => {
		if (process.env.NODE_ENV !== 'production' && !label && !labeledBy) {
			console.warn('Either a prop for label or labeledBy must be supplied for aria purposes.');
		}

		if (process.env.NODE_ENV !== 'production' && label && labeledBy) {
			console.warn(
				'Should only specify one of label or labeledBy. When both are present, prefer labeledBy',
			);
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (selectedTab !== null && selectedTab !== undefined) {
			setCurrentTab(selectedTab);
		}
	}, [selectedTab]);

	const onSelectTab = useCallback(
		newTabIndex => () => {
			if (onSelectedTabChange) {
				onSelectedTabChange(newTabIndex);
			}

			setCurrentTab(newTabIndex);
		},
		[onSelectedTabChange],
	);

	const registerTab = useCallback(({ index }) => {
		return ref => {
			let newList = [...tabList.current];
			if (tabList.current.length < index) {
				newList = newList.slice(0, index);
			}
			newList[index] = ref;

			tabList.current = newList;
		};
	}, []);

	const registerPanel = useCallback(({ index }) => {
		return ref => {
			let newList = [...panelList.current];
			if (panelList.current.length < index) {
				newList = newList.slice(0, index);
			}
			newList[index] = ref;

			panelList.current = newList;
		};
	}, []);

	const context = useMemo(
		() => ({
			variant,
			selectedTabIndex,
			onSelectTab,
			registerTab,
			panelList,
			registerPanel,
			label,
			labeledBy,
			tabList,
		}),
		[variant, selectedTabIndex, onSelectTab, registerTab, registerPanel, labeledBy, label],
	);

	return <TabContextProvider value={context}>{children}</TabContextProvider>;
}

TabManager.defaultProps = {
	variant: 'modal',
};

const Tab = React.forwardRef(({ ...props }, ref) => {
	const id = useId();
	return <TabCore id={`tab:${id}`} ref={ref} {...props} />;
});

Tab.displayName = 'Tab';

function TabList({ children, ...props }) {
	const {
		variant,
		selectedTabIndex,
		tabList,
		onSelectTab,
		registerTab,
		panelList,
		label,
		labeledBy,
	} = useTabContext();
	const handleKeyboardNav = useKeyboardNav(tabList, selectedTabIndex, onSelectTab);

	return (
		<TabListCore
			variant={variant}
			label={label}
			labeledBy={labeledBy}
			onKeyDown={handleKeyboardNav}
			{...props}
		>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							variant,
							selected: selectedTabIndex === index,
							onClick: onSelectTab(index),
							panelId: panelList.current[index]?.id,
							ref: registerTab({ index }),
					  })
					: null,
			)}
		</TabListCore>
	);
}

const TabPanel = React.forwardRef(({ ...props }, ref) => {
	return <TabPanelCore ref={ref} {...props} />;
});

TabPanel.displayName = 'TabPanel';

function TabPanels({ children, ...props }) {
	const { registerPanel, selectedTabIndex, tabList } = useTabContext();

	return (
		<TabPanelsCore {...props}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							ref: registerPanel({ index }),
							tabId: tabList.current[index]?.id,
					  })
					: null,
			)}
		</TabPanelsCore>
	);
}

Tab.Manager = TabManager;
Tab.List = TabList;
Tab.Panels = TabPanels;
Tab.Panel = TabPanel;

export { Tab };

const handledKeys = {
	arrowRight: 'ArrowRight',
	arrowLeft: 'ArrowLeft',
	arrowDown: 'ArrowDown',
	home: 'Home',
	end: 'End',
};

function useKeyboardNav(tabList, selectedIndex, onSelectTab) {
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
