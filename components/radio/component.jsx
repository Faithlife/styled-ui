import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import * as Styled from './styled';

/** Styled radio control (uses a button instead of an input) */
export class Radio extends Component {
	static propTypes = {
		/** Handler passed to native `button` */
		onClick: PropTypes.func.isRequired,
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

	static defaultProps = {
		theme: {
			primary: '#1E91D6',
			border: '#95908f',
		},
		type: 'button',
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
				<Styled.RadioContainer
					innerRef={this.componentRef}
					onMouseUp={this.onMouseUp}
					onClick={onClick}
					type={type}
					className={className}
					role={'radio'}
					aria-checked={isChecked}
				>
					<Styled.RadioDiv>
						<Styled.CheckedIndicator isChecked={isChecked} />
					</Styled.RadioDiv>
					{title && <Styled.Label>{title}</Styled.Label>}
					{children && <Styled.Label>{children}</Styled.Label>}
				</Styled.RadioContainer>
			</ThemeProvider>
		);
	}
}
