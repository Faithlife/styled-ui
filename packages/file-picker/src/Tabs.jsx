import React, { useEffect, useState } from 'react';
import { TabManager, Tab, TabList, TabPanels, TabPanel } from '@faithlife/styled-ui';

export const Tabs = ({ children, selectedTab }) => (
	<TabManager selectedTab={selectedTab}>
		<TabList>
			{React.Children.map(children, tab =>
				tab ? <Tab paddingX={4}>{tab.props.title}</Tab> : null
			)}
		</TabList>
		<TabPanels display="grid" flexGrow={1}>
			{React.Children.map(children, tab =>
				tab ? (
					<TabPanel display="grid" padding={tab.props.padding || 0}>
						{({ selected }) => (
							<RenderChildrenIfWasEverSelected selected={selected}>
								{React.cloneElement(tab)}
							</RenderChildrenIfWasEverSelected>
						)}
					</TabPanel>
				) : null
			)}
		</TabPanels>
	</TabManager>
);

// Waiting to create the tab's UI until it is selected works around a problem where we create
// multiple Amber iframes that all try to auto sign in at the same time, which causes one of them
// to succeed and the rest to fail because on the backend all of the requests were given the same
// single use token.
const RenderChildrenIfWasEverSelected = ({ children, selected }) => {
	const [wasEverSelected, setWasEverSelected] = useState(selected);
	useEffect(() => {
		if (selected) {
			setWasEverSelected(true);
		}
	}, [selected]);

	return wasEverSelected ? children : null;
};
