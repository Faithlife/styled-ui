import React from 'react';
import PropTypes from 'prop-types';
import { position as positionPropTypes, space as spacePropTypes } from '@styled-system/prop-types';
import styled from 'styled-components';
import * as Styled from './styled';
import { Text } from '../Text';

export function CheckboxContent({ isChecked, title, disabled, children, ...props }) {
	return (
		<>
			<Styled.CheckboxDiv disabled={disabled} {...props}>
				<Styled.CheckedIndicator isChecked={isChecked} disabled={disabled} />
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
	...positionPropTypes,
	...spacePropTypes,
};

const Label = styled(Text)`
	margin-left: 22px;
	& + & {
		margin-left: 6px;
	}
`;
