import React from 'react';
import { TabManager, Tab, TabList, TabPanels, TabPanel } from '@faithlife/styled-ui';

export const Tabs = ({ children }) => (
	<TabManager>
		<TabList>
			{React.Children.map(children, tab =>
				tab ? <Tab paddingX={4}>{tab.props.title}</Tab> : null
			)}
		</TabList>
		<TabPanels display="grid" flexGrow={1}>
			{React.Children.map(children, tab =>
				tab ? (
					<TabPanel display="grid" padding={tab.props.padding || 0}>
						{React.cloneElement(tab)}
					</TabPanel>
				) : null
			)}
		</TabPanels>
	</TabManager>
);
