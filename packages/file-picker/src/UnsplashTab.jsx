import React from 'react';
import { AmberTab } from './AmberTab';
import { useIsInternal } from './useIsInternal';
import { unsplashAmberId, unsplashInternalAmberId } from './constants';

export const UnsplashTab = ({
	title,
	filter,
	footerText,
	pickerMode,
	fields,
	sort,
	theme,
	viewStyle,
}) => {
	const isInternal = useIsInternal();
	const accountId = isInternal ? unsplashInternalAmberId : unsplashAmberId;
	return (
		<AmberTab
			title={title}
			accountId={accountId}
			filter={filter}
			footerText={footerText}
			pickerMode={pickerMode}
			fields={fields}
			sort={sort}
			theme={theme}
			viewStyle={viewStyle}
		/>
	);
};

UnsplashTab.defaultProps = {
	title: 'Unsplash',
};
