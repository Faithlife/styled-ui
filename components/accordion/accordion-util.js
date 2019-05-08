import React, { useContext } from 'react';

const AccordionContext = React.createContext();

export const AccordionContextProvider = AccordionContext.Provider;

export function useAccordionContext() {
	const context = useContext(AccordionContext);

	return context;
}
