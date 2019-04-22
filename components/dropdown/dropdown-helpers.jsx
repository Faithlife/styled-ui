import React, { useContext } from 'react';

export const DropdownContext = React.createContext();

export function useDropdownContext() {
	const context = useContext(DropdownContext);

	return context;
}
