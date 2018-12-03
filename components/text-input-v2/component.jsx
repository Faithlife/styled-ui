import React from 'react';
import ExternalSelect from 'react-select';
import { colors } from '../shared-styles';

export const Select = props => (
	<ExternalSelect
		styles={{
			control: styles => ({
				...styles,
				minHeight: '30px',
				fontSize: '16px',
			}),
			valueContainer: styles => ({
				...styles,
				padding: '0 8px',
			}),
			input: styles => ({
				...styles,
				lineHeight: 1,
			}),
			indicatorSeparator: () => ({
				display: 'none',
			}),
			clearIndicator: () => ({
				display: 'none',
			}),
			dropdownIndicator: styles => ({
				...styles,
				padding: '5px 8px',
			}),
			placeholder: styles => ({
				...styles,
				lineHeight: 1,
			}),
			multiValue: styles => ({
				...styles,
				backgroundColor: colors.blueTint,
			}),
			multiValueLabel: styles => ({
				...styles,
				color: colors.blueDark,
			}),
		}}
		classNamePrefix="fl-select"
		theme={theme => ({
			...theme,
			colors: {
				...theme.colors,
				primary: colors.blueDark,
				primary25: colors.gray8,
				primary50: colors.blueTint,
				primary75: colors.blueTint,
				danger: colors.redBase,
				dangerLight: colors.redLight,
			},
		})}
		{...props}
	/>
);
