import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TabContext, useTabList } from './use-tab-list';
import * as Styled from './styled.jsx';

export function TabManager({ children, theme, styleOverrides }) {
	const { tabList, registerTab, editTabName } = useTabList();
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);

	const handleSelectTab = useCallback(
		tabIndex => () => {
			setSelectedTabIndex(tabIndex);
		},
		[],
	);

	const context = useMemo(
		() => ({ tabList, selectedTabIndex, handleSelectTab, registerTab, editTabName }),
		[tabList, selectedTabIndex, handleSelectTab, registerTab, editTabName],
	);

	return (
		<React.Fragment>
			<Styled.TabGroup>
				{tabList.map((tabName, index) => (
					<Styled.Tab key={`${tabName}-${index}`} onClick={handleSelectTab(index)}>
						<Styled.TabContent
							theme={theme}
							styleOverrides={styleOverrides}
							selected={selectedTabIndex === index}
						>
							{tabName}
						</Styled.TabContent>
					</Styled.Tab>
				))}
			</Styled.TabGroup>
			<TabContext.Provider value={context}>{children}</TabContext.Provider>
		</React.Fragment>
	);
}

TabManager.propTypes = {
	children: PropTypes.node.isRequired,
	theme: PropTypes.shape({
		tabHighlightColor: PropTypes.string,
		activeBackgroundColor: PropTypes.string,
		inactiveBackgroundColor: PropTypes.string,
	}),
	styleOverrides: PropTypes.shape({
		fontSize: PropTypes.string,
		width: PropTypes.string,
		padding: PropTypes.string,
	}),
};

TabManager.defaultProps = {
	theme: {},
	styleOverrides: {},
};
