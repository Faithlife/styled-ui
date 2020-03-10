import React, { useCallback, useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useBasicMap } from '../shared-hooks';
import { useId } from '../shared-hooks';
import { Box } from '../Box';
import { TabContextProvider, useTabContext } from './tab-utils';
import * as Styled from './styled.jsx';

// ARIA for Tabs are documented in https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel
// Tabs from Reach-Ui were used as a base https://ui.reach.tech/tabs

function TabManager({ children, selectedTab, onSelectedTabChange }) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(selectedTab || 0);
	const { panelIdsMap, registerPanelId, unRegisterPanelId } = usePanelIdsHandler();

	useEffect(() => {
		if (selectedTab !== null && selectedTab !== undefined) {
			setSelectedTabIndex(selectedTab);
		}
	}, [selectedTab]);

	const handleSelectTab = useCallback(
		tabIndex => {
			if (onSelectedTabChange) {
				onSelectedTabChange(tabIndex);
			}
			setSelectedTabIndex(tabIndex);
		},
		[onSelectedTabChange],
	);

	const context = useMemo(
		() => ({
			selectedTabIndex,
			onSelectTab: handleSelectTab,
			panelIdsMap,
			registerPanelId,
			unRegisterPanelId,
		}),
		[selectedTabIndex, handleSelectTab, panelIdsMap, registerPanelId, unRegisterPanelId],
	);

	return <TabContextProvider value={context}>{children}</TabContextProvider>;
}

TabManager.propTypes = {
	children: PropTypes.node.isRequired,
	selectedTab: PropTypes.number,
	onSelectedTabChange: PropTypes.func,
};

function Tab({ children, disabled, index, selected, onSelectTab, panelId, ...props }) {
	const tabRef = useRef();

	useEffect(() => {
		if (selected && tabRef.current) {
			tabRef.current.focus();
		}
	}, [selected]);

	const handleSelectTab = useCallback(() => {
		onSelectTab(index);
	}, [onSelectTab, index]);

	return (
		<Styled.Tab
			disabled={disabled}
			panelId={panelId || ''}
			selected={selected}
			onClick={handleSelectTab}
		>
			<Styled.TabContent
				ref={tabRef}
				disabled={disabled}
				fontSize={3}
				paddingX={5}
				paddingY={3}
				selected={selected}
				{...props}
			>
				{typeof children === 'function' ? children({ selected, disabled }) : children}
			</Styled.TabContent>
		</Styled.Tab>
	);
}

Tab.propTypes = {
	/** The tab's label */
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	disabled: PropTypes.bool,
};

Tab.defaultProps = {
	styleOverrides: {},
};

function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelIdsMap } = useTabContext();

	const handleKeyboardNav = useKeyboardNavLegacy(selectedTabIndex, onSelectTab, children);
	return (
		<Styled.TabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							onSelectTab,
							index,
							panelId: panelIdsMap[index],
					  })
					: null,
			)}
		</Styled.TabList>
	);
}

TabList.propTypes = {
	children: PropTypes.node.isRequired,
};

function TabPanels({ children, ...props }) {
	const { selectedTabIndex, registerPanelId, unRegisterPanelId } = useTabContext();
	return (
		<Box {...props}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							registerPanelId,
							unRegisterPanelId,
							index,
							selected: selectedTabIndex === index,
					  })
					: null,
			)}
		</Box>
	);
}

TabPanels.propTypes = {
	children: PropTypes.node.isRequired,
};

function TabPanel({ children, selected, registerPanelId, unRegisterPanelId, index, ...props }) {
	const id = useId();

	useEffect(() => {
		if (id) {
			registerPanelId(index, id);
			return () => {
				unRegisterPanelId(index);
			};
		}
	}, [index, id, registerPanelId, unRegisterPanelId]);

	return (
		<Styled.TabPanel panelId={id} selected={selected} position="relative" padding={3} {...props}>
			{children}
		</Styled.TabPanel>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node.isRequired,
};

export { TabManager, Tab, TabList, TabPanels, TabPanel };

const handledKeys = {
	arrowRight: 'ArrowRight',
	arrowLeft: 'ArrowLeft',
	arrowDown: 'ArrowDown',
	home: 'Home',
	end: 'End',
};

function useKeyboardNavLegacy(selectedIndex, onSelectTab, children) {
	const currentChildren = useRef();

	useEffect(() => {
		currentChildren.current = children;
	}, [children]);

	const handleKeyboardNav = useCallback(
		event => {
			const enabledTabIndexes = React.Children.map(currentChildren.current, (child, index) =>
				!child || child.props.disabled ? null : index,
			).filter(index => index !== null);
			const currentEnabledIndex = enabledTabIndexes.indexOf(selectedIndex);

			switch (event.key) {
				case handledKeys.arrowRight: {
					const nextEnabledIndex =
						currentEnabledIndex === enabledTabIndexes.length - 1
							? currentEnabledIndex
							: currentEnabledIndex + 1;
					onSelectTab(enabledTabIndexes[nextEnabledIndex]);
					break;
				}
				case handledKeys.arrowLeft: {
					const nextEnabledIndex =
						currentEnabledIndex === 0 ? currentEnabledIndex : currentEnabledIndex - 1;
					onSelectTab(enabledTabIndexes[nextEnabledIndex]);
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
		[selectedIndex, onSelectTab],
	);

	return handleKeyboardNav;
}

function usePanelIdsHandler() {
	const { map, add, remove } = useBasicMap();

	const registerPanelId = useCallback(
		(index, id) => {
			add(index, id);
		},
		[add],
	);

	const unRegisterPanelId = useCallback(
		index => {
			remove(index);
		},
		[remove],
	);

	return { panelIdsMap: map, registerPanelId, unRegisterPanelId };
}
