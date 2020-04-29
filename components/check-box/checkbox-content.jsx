import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function CheckboxContent({ isChecked, title, children, disabled, themeOverrides }) {
	return (
		<React.Fragment>
			<Styled.CheckboxDiv disabled={disabled} themeOverrides={themeOverrides}>
				<Styled.CheckedIndicator
					isChecked={isChecked}
					disabled={disabled}
					themeOverrides={themeOverrides}
				/>
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
