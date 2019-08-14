import React, { useContext } from 'react';

const filePickerContext = React.createContext();

export const FilePickerContextProvider = filePickerContext.Provider;

export function useFilePickerContext() {
	const context = useContext(filePickerContext);
	return context;
}
