import React, { useState, useCallback } from 'react';

export const TabContext = React.createContext();

export function useTabList() {
	const [tabList, setTabList] = useState([]);

	const registerTab = useCallback(name => {
		setTabList(prevState => [...prevState, name]);
	}, []);

	const editTabName = useCallback(
		(index, newName) => {
			const newList = [...tabList];
			newList.splice(index, 1, newName);
			setTabList(newList);
		},
		[tabList],
	);

	return { tabList, registerTab, editTabName };
}
