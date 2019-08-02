import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system } from 'styled-system';
import { useId } from '../shared-hooks';
import { Box } from '../Box';
import { useTabContext, useKeyboardNav } from './tab-utils';

export function TabList({ children }) {
	const { onSelectTab, selectedTabIndex, theme, panelIdsMap } = useTabContext();

	const handleKeyboardNav = useKeyboardNav(selectedTabIndex, onSelectTab, children);

	return (
		<TabListBox
			onKeyDown={handleKeyboardNav}
			role="tablist"
			display="flex"
			marginRight={0}
			notLastSiblingMarginRight={3}
			borderBottom={1}
			borderColor="gray14"
		>
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
		</TabListBox>
	);
}

TabList.propTypes = {
	children: PropTypes.node.isRequired,
};

const TabListBox = styled(Box)`
	& > *:not(:last-child) {
		${system({ notLastSiblingMarginRight: { property: 'margin-right', scale: 'space' } })};
	}
`;

export function TabPanels({ children }) {
	const { selectedTabIndex, registerPanelId, unRegisterPanelId } = useTabContext();
	return (
		<Box>
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
		<TabPanelBox
			role="tabpanel"
			id={`panel:${id}`}
			aria-expanded={selected}
			display={!selected && 'none'}
			position="relative"
			padding={3}
			focusOutline="none"
		>
			{children}
		</TabPanelBox>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node.isRequired,
};

const TabPanelBox = styled(Box)`
	${system({ focusOutline: { property: 'outline' } })};
`;
