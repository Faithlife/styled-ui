import React, { useState, useCallback } from 'react';
import { Select } from '../../../components/text-input-v2';
import * as Styled from './styled.jsx';

export function CustomOptionsSelectDemo() {
	const [selection, setSelection] = useState('');

	const handleGroupChanged = useCallback(
		group => {
			setSelection(group.value);
		},
		[setSelection]
	);

	return (
		<div>
			<div>Current selection: {selection}</div>
			<Select
				onChange={handleGroupChanged}
				isSearchable={false}
				options={[
					{ value: "washington", group: "Washington", subtitle: "yo", avatar:"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA" },
					{ value: "california", group: "California", subtitle: "yo", avatar:"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA" },
					{ value: "Texas", group: "Texas", subtitle: "yo", avatar:"https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA" }
				]}
				placeholder="Choose a state..."
				formatOptionLabel={MenuItem}
			/>
		</div>
	);
}

function MenuItem({ value, group, subtitle, avatar }) {
	return (
		<Styled.MenuItem>
			<Styled.Avatar src={avatar} />
			<Styled.GroupInfo>
				<Styled.GroupName>{group}</Styled.GroupName>
				<Styled.GroupSubtitle>{subtitle}</Styled.GroupSubtitle>
			</Styled.GroupInfo>
		</Styled.MenuItem>
	);
}
