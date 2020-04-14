import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function CheckboxContent({ isChecked, title, children, disabled, theme }) {
	return (
		<React.Fragment>
			<Styled.CheckboxDiv disabled={disabled} theme={theme}>
				<Styled.CheckedIndicator isChecked={isChecked} disabled={disabled} theme={theme} />
			</Styled.CheckboxDiv>
			{title && <Styled.Label>{title}</Styled.Label>}
			{children && <Styled.Label>{children}</Styled.Label>}
		</React.Fragment>
	);
}

CheckboxContent.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	isChecked: PropTypes.oneOf([true, false, 'mixed']),
	disabled: PropTypes.bool,
};
