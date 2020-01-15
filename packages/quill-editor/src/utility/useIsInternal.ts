import { useState, useEffect } from 'react';

const isInternalRegex = /https?:\/\/(local\.|internal\.|test\.|pr\d+\.(?!beta)|\d+\.|internal\.|localhost[:/])/;

export const useIsInternal = () => {
	const [isInternal, setIsInternal] = useState<boolean>(false);
	useEffect(() => {
		if (window.location && isInternalRegex.test(window.location.href)) {
			setIsInternal(true);
		}
	}, []);
	return isInternal;
};
