import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styled from './styled';

/** Styled checkbox control with consistent styling across platforms */
export function Checkbox({ onClick, title, isChecked, theme, type, children, className }) {
	return (
		<ThemeProvider theme={theme}>
			<Styled.CheckboxContainer
				onClick={onClick}
				type={type}
				className={className}
				role={'checkbox'}
				aria-checked={isChecked}
			>
				<Styled.CheckboxDiv>
					<Styled.CheckedIndicator isChecked={isChecked} />
				</Styled.CheckboxDiv>
				{title && <Styled.Label>{title}</Styled.Label>}
				{children && <Styled.Label>{children}</Styled.Label>}
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
	type: PropTypes.string,
	children: PropTypes.node,
	/** See the docs for how to override styles properly  */
	className: PropTypes.string,
};

Checkbox.defaultProps = {
	theme: {
		primary: '#1E91D6',
		border: '#95908f',
	},
	type: 'button',
};
