import React, { useContext } from 'react';

const ModalContext = React.createContext();

export const ModalContextProvider = ModalContext.Provider;

export function useModalContext() {
	const context = useContext(ModalContext);

	return context;
}
