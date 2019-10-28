import React, { useContext } from 'react';

const ModalSpacingContext = React.createContext();

export const ModalSpacingContextProvider = ModalSpacingContext.Provider;

export function useModalSpacingContext() {
	const context = useContext(ModalSpacingContext);

	return context;
}
