import React from 'react';
import { AmberContent } from './AmberContent';
import { Tab } from './Tab';

export const AmberTab = ({
	title,
	accountId,
	filter,
	footerText,
	pickerMode,
	fields,
	sort,
	viewStyle,
}) => {
	return (
		<Tab title={title} padding={0}>
			<AmberContent
				accountId={accountId}
				filter={filter}
				footerText={footerText}
				pickerMode={pickerMode}
				fields={fields}
				sort={sort}
				viewStyle={viewStyle}
			/>
		</Tab>
	);
};
