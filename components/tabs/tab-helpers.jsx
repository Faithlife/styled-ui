import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { useTabContext, useKeyboardNav, useSequencedKeyboardNav } from './tab-utils';
import * as Styled from './styled';

export function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, theme, panelIdsMap } = useTabContext();

	const handleKeyboardNav = useKeyboardNav(selectedTabIndex, onSelectTab, children);
	return (
		<Styled.TabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							onSelectTab,
							index,
							theme,
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
	const { onSelectTab, selectedTabIndex, theme, panelIdsMap } = useTabContext();

	const [touchedTabs, setTouchedTabs] = useState(new Set());

	useEffect(() => {
		const newTouchedTabs = touchedTabs;
		newTouchedTabs.add(selectedTabIndex);
		setTouchedTabs(new Set(newTouchedTabs));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedTabIndex]);

	const handleKeyboardNav = useSequencedKeyboardNav(selectedTabIndex, onSelectTab, children);
	return (
		<Styled.SequencedTabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							disabled:
								!touchedTabs.has(index) && (child.props.disabled || selectedTabIndex < index - 1),
							completed:
								selectedTabIndex !== index &&
								(touchedTabs.has(index) ||
									(child.props.disabled
										? false
										: child.props.completed || selectedTabIndex > index)),
							onSelectTab,
							index,
							theme,
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

export function TabPanels({ children }) {
	const { selectedTabIndex, registerPanelId, unRegisterPanelId } = useTabContext();
	return (
		<div>
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
		</div>
	);
}

TabPanels.propTypes = {
	children: PropTypes.node.isRequired,
};

export function TabPanel(props) {
	// PropType linting is diabled so out hidden props can be destuctured along with own consumer props
	// eslint-disable-next-line react/prop-types
	const { children, selected, registerPanelId, unRegisterPanelId, index } = props;
	const id = useId();

	useEffect(
		// eslint-disable-next-line consistent-return
		() => {
			if (id) {
				registerPanelId(index, id);
				return () => {
					unRegisterPanelId(index);
				};
			}
		},
		[index, id, registerPanelId, unRegisterPanelId],
	);

	return (
		<Styled.TabPanel panelId={id} selected={selected}>
			{children}
		</Styled.TabPanel>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node.isRequired,
};
