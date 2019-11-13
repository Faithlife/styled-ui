import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useId } from '../shared-hooks';
import { useTabContext, useKeyboardNav, useSequencedKeyboardNav } from './tab-utils';
import * as Styled from './styled';

export function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelIdsMap } = useTabContext();

	const handleKeyboardNav = useKeyboardNav(selectedTabIndex, onSelectTab, children);
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

export function SequencedTabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelIdsMap } = useTabContext();

	const [touchedTabs, setTouchedTabs] = useState(new Set());

	useEffect(() => {
		setTouchedTabs(touchedTabs => new Set(touchedTabs).add(selectedTabIndex));
	}, [selectedTabIndex]);

	const handleKeyboardNav = useSequencedKeyboardNav(selectedTabIndex, onSelectTab, children);
	return (
		<Styled.SequencedTabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							disabled:
								!touchedTabs.has(index) &&
								(child.props.disabled ||
									(selectedTabIndex < index - 1 &&
										!children
											.slice(selectedTabIndex + 1, index)
											.every(value => value.props.disabled))),
							completed:
								selectedTabIndex !== index &&
								(touchedTabs.has(index) ||
									(child.props.disabled
										? false
										: child.props.completed || selectedTabIndex > index)),
							onSelectTab,
							index,
							panelId: panelIdsMap[index],
					  })
					: null,
			)}
		</Styled.SequencedTabList>
	);
}

SequencedTabList.propTypes = {
	children: PropTypes.node.isRequired,
};

export function TabPanels({ children, ...props }) {
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

export function TabPanel({
	children,
	selected,
	registerPanelId,
	unRegisterPanelId,
	index,
	...props
}) {
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
