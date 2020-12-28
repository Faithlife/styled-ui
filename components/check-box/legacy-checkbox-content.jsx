import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './legacy-styled';
import { Text } from '../Text';

export function CheckboxContent({
	isChecked,
	title,
	children,
	disabled,
	themeOverrides,
	...props
}) {
	return (
		<>
			<Styled.CheckboxDiv disabled={disabled} themeOverrides={themeOverrides} {...props}>
				<Styled.CheckedIndicator
					isChecked={isChecked}
					disabled={disabled}
					themeOverrides={themeOverrides}
				/>
			</Styled.CheckboxDiv>
			{title && <Label>{title}</Label>}
			{children && <Label>{children}</Label>}
		</>
	);
}

CheckboxContent.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	isChecked: PropTypes.oneOf([true, false, 'mixed']),
	disabled: PropTypes.bool,
};

const Label = ({ children }) => (
	<Text
		css={`
			margin-left: 22px;

			& + & {
				margin-left: 6px;
			}
		`}
	>
		{children}
	</Text>
);
