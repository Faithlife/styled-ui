import React from 'react';
import PropTypes from 'prop-types';
import styledSystemPropTypes from '@styled-system/prop-types';
import styled from 'styled-components';
import { getConfigChild } from '../utils';
import { Text } from '../Text';
import * as Styled from './styled';

export function CheckboxContent({ isChecked, title, disabled, children, ...otherProps }) {
	const [box, boxFilteredChildren] = getConfigChild(children, CheckboxBox.childConfigComponent);
	const [label, otherChildren] = getConfigChild(
		boxFilteredChildren,
		CheckboxLabel.childConfigComponent,
	);

	return (
		<>
			<Styled.CheckboxDiv disabled={disabled} {...otherProps} {...box?.props ?? {}}>
				<Styled.CheckedIndicator isChecked={isChecked} disabled={disabled} />
			</Styled.CheckboxDiv>
			{label}
			{title && <CheckboxLabel>{title}</CheckboxLabel>}
			{otherChildren && <CheckboxLabel>{otherChildren}</CheckboxLabel>}
		</>
	);
}

CheckboxContent.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	isChecked: PropTypes.oneOf([true, false, 'mixed']),
	disabled: PropTypes.bool,
	...styledSystemPropTypes.position,
	...styledSystemPropTypes.space,
	...styledSystemPropTypes.layout,
};

/**
 * An optional configuration component that passes Styled System props directly to the checkbox
 * itself, avoiding the label.
 */
export const CheckboxBox = props => null;
CheckboxBox.propTypes = {
	...styledSystemPropTypes.position,
	...styledSystemPropTypes.space,
	...styledSystemPropTypes.layout,
};
CheckboxBox.childConfigComponent = 'CheckboxBox';

/**
 * An optional configuration component that allows styling just the label via Styled System props.
 */
export const CheckboxLabel = styled(Text).attrs({ as: 'label' })`
	margin-left: 6px;
`;
CheckboxLabel.propTypes = Text.propTypes;
CheckboxLabel.childConfigComponent = 'CheckboxLabel';
