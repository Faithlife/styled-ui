import React from 'react';
import { AmberTab } from './AmberTab';
import { useIsInternal } from './useIsInternal';
import { faithlifeStockAmberId, faithlifeStockInternalAmberId } from './constants';

export const FaithlifeStockTab = ({ title, filter, footerText, pickerMode, sort, viewStyle }) => {
	const isInternal = useIsInternal();
	const accountId = isInternal ? faithlifeStockInternalAmberId : faithlifeStockAmberId;
	return (
		<AmberTab
			title={title}
			accountId={accountId}
			filter={filter}
			footerText={footerText}
			pickerMode={pickerMode}
			sort={sort}
			viewStyle={viewStyle}
		/>
	);
};

FaithlifeStockTab.defaultProps = {
	title: 'Faithlife Stock',
};
