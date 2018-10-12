import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styled from './styled.jsx';

/** Styled radio control (uses a button instead of an input) */
export function Radio({ onClick, title, isChecked, theme, type, children, className }) {
	return (
		<ThemeProvider theme={theme}>
			<Styled.RadioContainer onClick={onClick} type={type} className={className}>
				<Styled.RadioDiv>
					<Styled.CheckedIndicator isChecked={isChecked} />
				</Styled.RadioDiv>
				{title && <Styled.Label>{title}</Styled.Label>}
				{children && <Styled.Label>{children}</Styled.Label>}
			</Styled.RadioContainer>
		</ThemeProvider>
	);
}

Radio.propTypes = {
	/** Handler passed to native `button` */
	onClick: PropTypes.func.isRequired,
	title: PropTypes.string,
	isChecked: PropTypes.bool,
	theme: PropTypes.object,
	type: PropTypes.string,
	children: PropTypes.node,
	/** See the docs for how to override styles properly  */
	className: PropTypes.string,
};

Radio.defaultProps = {
	theme: {
		primary: '#1E91D6',
		border: '#95908f',
	},
	type: 'button',
};
