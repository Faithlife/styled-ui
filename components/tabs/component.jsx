import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { useId } from '../shared-hooks';
import { TabContextProvider, useTabContext, useKeyboardNav } from './tab-utils';
import { TabCore, TabListCore, TabPanelsCore, TabPanelCore } from './Tab';

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

	const handleSelectTab = useCallback(
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
			handleSelectTab,
			registerTab,
			panelList,
			registerPanel,
			label,
			labeledBy,
			tabList,
		}),
		[variant, selectedTabIndex, handleSelectTab, registerTab, registerPanel, labeledBy, label],
	);

	return <TabContextProvider value={context}>{children}</TabContextProvider>;
}

TabManager.defaultProps = {
	variant: 'modal',
};

const Tab = React.forwardRef(function Tab(props, ref) {
	const id = useId();
	return <TabCore id={`tab:${id}`} ref={ref} {...props} />;
});

function TabList({ children, ...props }) {
	const {
		variant,
		selectedTabIndex,
		tabList,
		handleSelectTab,
		registerTab,
		panelList,
		label,
		labeledBy,
	} = useTabContext();
	const handleKeyboardNav = useKeyboardNav(tabList, selectedTabIndex, handleSelectTab);

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
							onClick: handleSelectTab(index),
							panelId: panelList.current[index]?.id,
							ref: registerTab({ index }),
					  })
					: null,
			)}
		</TabListCore>
	);
}

const TabPanel = React.forwardRef(function TabPanel(props, ref) {
	return <TabPanelCore ref={ref} {...props} />;
});

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
