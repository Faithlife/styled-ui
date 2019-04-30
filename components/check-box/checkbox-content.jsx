import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function CheckboxContent({ isChecked, title, children }) {
	return (
		<React.Fragment>
			<Styled.CheckboxDiv>
				<Styled.CheckedIndicator isChecked={isChecked} />
			</Styled.CheckboxDiv>
			{title && <Styled.Label>{title}</Styled.Label>}
			{children && <Styled.Label>{children}</Styled.Label>}
		</React.Fragment>
	);
}

CheckboxContent.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	isChecked: PropTypes.bool,
};
