import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styled from './styled';

/** Styled checkbox control with consistent styling across platforms */
export class Checkbox extends Component {
	static propTypes = {
		/** Handler passed to native `button` */
		onClick: PropTypes.func.isRequired,
		onMouseUp: PropTypes.func,
		title: PropTypes.string,
		isChecked: PropTypes.bool,
		theme: PropTypes.object,
		type: PropTypes.string,
		children: PropTypes.node,
		/** See the docs for how to override styles properly  */
		className: PropTypes.string,
		/** Disables automatic blur */
		disableAutoBlur: PropTypes.bool,
	};

	/* eslint-disable react/prop-types */
	onMouseUp = e => {
		if (this.props.onMouseUp) {
			this.props.onMouseUp(e);
		}

		if (!this.props.disableAutoBlur && this.componentRef.current) {
			this.componentRef.current.blur();
		}
	};

	componentRef = React.createRef();

	render() {
		const { onClick, title, isChecked, theme, type, children, className } = this.props;
		return (
			<ThemeProvider theme={theme}>
				<Styled.CheckboxContainer
					ref={this.componentRef}
					onClick={onClick}
					onMouseUp={this.onMouseUp}
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
}

Checkbox.defaultProps = {
	theme: {
		primary: '#1E91D6',
		border: '#95908f',
	},
	type: 'button',
};
