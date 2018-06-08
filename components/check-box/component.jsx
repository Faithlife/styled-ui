import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styled from './styled.jsx';

// Ported from https://git/Logos/Sites.Admin/blob/db17162da13a47c82eea000cfdd6384e8a174874/src/Sites.Admin/Private/scripts/components/checkbox/checkbox.jsx
export default function Checkbox({ onClick, title, isChecked, theme }) {
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
