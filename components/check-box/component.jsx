import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styled from './styled.jsx';

/** Styled checkbox control (uses a button instead of an input) */
export function Checkbox({ onClick, title, isChecked, theme }) {
	return (
		<ThemeProvider theme={theme}>
			<Styled.CheckboxContainer onClick={onClick}>
				<Styled.CheckboxDiv>
					<Styled.CheckedIndicator isChecked={isChecked} />
				</Styled.CheckboxDiv>
				{title && <Styled.Label>{title}</Styled.Label>}
			</Styled.CheckboxContainer>
		</ThemeProvider>
	);
}

Checkbox.propTypes = {
	/** Handler passed to native `button` */
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string,
	isChecked: PropTypes.bool,
	theme: PropTypes.object,
};

Checkbox.defaultProps = {
	theme: {
		primary: '#1E91D6',
		border: '#95908f',
	},
};
