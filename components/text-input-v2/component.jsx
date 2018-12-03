import React from 'react';
import ExternalSelect from 'react-select';
import { colors } from '../shared-styles';

export const Select = props => (
	<ExternalSelect
		styles={{
			multiValue: styles => ({
				...styles,
				backgroundColor: colors.blueTint,
			}),
			multiValueLabel: styles => ({
				...styles,
				color: colors.blueDark,
			}),
		}}
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
