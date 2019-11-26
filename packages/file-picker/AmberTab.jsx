import React from 'react';
import { AmberContent } from '@faithlife/styled-ui';
import { Tab } from './Tab';

export const AmberTab = ({ title, accountId, filter, footerText, pickerMode, sort, viewStyle }) => {
	return (
		<Tab title={title} padding={0}>
			<AmberContent
				accountId={accountId}
				filter={filter}
				footerText={footerText}
				pickerMode={pickerMode}
				sort={sort}
				viewStyle={viewStyle}
				height="100%"
			/>
		</Tab>
	);
};
