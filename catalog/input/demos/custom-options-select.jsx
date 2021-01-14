import React, { useState, useCallback } from 'react';
import { Select } from '../../../components/text-input';
import * as Styled from './styled.jsx';

export function CustomOptionsSelectDemo() {
	const [selection, setSelection] = useState('');

	const handleGroupChanged = useCallback(
		group => {
			setSelection(group.value);
		},
		[setSelection],
	);

	const customStyles = {
		option: (provided, state) => ({
			...provided,
			padding: 0,
		}),
	};

	return (
		<div>
			<div>Current selection: {selection}</div>
			<Select
				onChange={handleGroupChanged}
				isSearchable={false}
				styles={customStyles}
				options={[
					{
						value: 'employees',
						group: 'Faithlife Employees',
						subtitle: 'Organization',
						avatar:
							'https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA',
					},
					{
						value: 'coders',
						group: 'Faithlife Coders',
						subtitle: 'General',
						avatar:
							'https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA',
					},
					{
						value: 'ecc',
						group: 'Example Community Church',
						subtitle: 'Church',
						avatar:
							'https://files.logoscdn.com/v1/files/42382171/content.svg?signature=6V_cO8zkG4kob-qZTjNlJkCuNTA',
					},
				]}
				placeholder="Choose a group..."
				formatOptionLabel={MenuItem}
				components={{ SingleValue: SelectedItem }}
			/>
		</div>
	);
}

function MenuItem({ group, subtitle, avatar }) {
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

function SelectedItem({ data }) {
	return <div>To: {data.group}</div>;
}
