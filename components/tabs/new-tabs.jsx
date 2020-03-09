import React, { useContext, useRef, useState, useMemo, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { variant, layout, position, textStyle, border, background } from 'styled-system';
import 'focus-visible';
import { common, typography } from '../../theme/system';
import { tabs, tabLists, selected } from '../../theme/tabs';
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

const TabListCore = styled(Box).attrs({})`
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

const TabPanelCore = styled(Box).attrs({})`
	display: ${({ selected }) => (selected ? 'block' : 'none')};
`;

const TabPanelsCore = styled(Box).attrs({})``;

function TabManager({ variant, selectedTab, onSelectedTabChange, children }) {
	const tabList = useRef([]);
	const panelList = useRef([]);
	const [selectedTabIndex, setCurrentTab] = useState(selectedTab || 0);

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
		}),
		[variant, selectedTabIndex, onSelectTab, registerTab, panelList, registerPanel],
	);

	return <TabContextProvider value={context}>{children}</TabContextProvider>;
}

const Tab = React.forwardRef(({ ...props }, ref) => {
	return <TabCore ref={ref} {...props} />;
});

Tab.displayName = 'Tab';

function TabList({ children, ...props }) {
	const { variant, selectedTabIndex, onSelectTab, registerTab, panelList } = useTabContext();

	return (
		<TabListCore variant={variant} {...props}>
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
	const { registerPanel, selectedTabIndex } = useTabContext();

	return (
		<TabPanelsCore {...props}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							ref: registerPanel({ index }),
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
