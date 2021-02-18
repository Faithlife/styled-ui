import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useId } from '../shared-hooks';
import { useTabContext, useKeyboardNav, useSequencedKeyboardNav } from './tab-utils';
import { Box } from '../Box';
import * as Styled from './styled';

/** A wrapper that handles the tab labels. */
export function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelIdsMap, variant } = useTabContext();

	const handleKeyboardNav = useKeyboardNav(selectedTabIndex, onSelectTab, children);
	return (
		<Styled.TabListCore onKeyDown={handleKeyboardNav} variant={variant}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							onSelectTab,
							index,
							panelId: panelIdsMap[index],
							variant,
					  })
					: null,
			)}
		</Styled.TabListCore>
	);
}

TabList.propTypes = {
	/** One or more `Tab` components. */
	children: PropTypes.node.isRequired,
};

/** A wrapper that handles `SequencedTab` components. */
export function SequencedTabList({ children }) {
	const { onSelectTab, selectedTabIndex, panelIdsMap } = useTabContext();

	const handleKeyboardNav = useSequencedKeyboardNav(selectedTabIndex, onSelectTab, children);
	return (
		<Styled.SequencedTabList onKeyDown={handleKeyboardNav}>
			{React.Children.map(children, (child, index) =>
				React.isValidElement(child)
					? React.cloneElement(child, {
							selected: selectedTabIndex === index,
							disabled:
								child.props.disabled ||
								(selectedTabIndex < index - 1 &&
									!children
										.slice(selectedTabIndex + 1, index)
										.every(value => value.props.disabled)),
							completed:
								selectedTabIndex !== index &&
								(child.props.disabled ? false : child.props.completed || selectedTabIndex > index),
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
	/** One or more `SequencedTab` components. */
	children: PropTypes.node.isRequired,
};

/** A wrapper that handles `Tab.Panel` components. */
export function TabPanels({ children, ...props }) {
	const { selectedTabIndex, registerPanelId, unRegisterPanelId } = useTabContext();
	return (
		<Styled.TabPanelsCore {...props}>
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
		</Styled.TabPanelsCore>
	);
}

TabPanels.propTypes = {
	/** One or more `Tab.Panel` components. */
	children: PropTypes.node.isRequired,
	...Box.propTypes,
};

/**
 * Wraps the content associated with a particular tab. Optional if `SequencedTab`s are being used.
 */
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
		<Styled.TabPanelCore
			panelId={id}
			selected={selected}
			position="relative"
			padding={3}
			{...props}
		>
			{typeof children === 'function' ? children({ selected }) : children}
		</Styled.TabPanelCore>
	);
}

TabPanel.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
	...Box.propTypes,
};
