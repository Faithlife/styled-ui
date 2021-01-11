import React, { useContext } from 'react';

const ListboxContext = React.createContext();

export const ListboxContextProvider = ListboxContext.Provider;

export function useListboxContext() {
	const context = useContext(ListboxContext);

	return context;
}
