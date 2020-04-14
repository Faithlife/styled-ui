import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors as sharedColors } from '../shared-styles';
import * as Styled from './styled';

/** Styled radio control (uses a button instead of an input) */
export class Radio extends Component {
	static propTypes = {
		/** Handler passed to native `button` */
		onClick: PropTypes.func.isRequired,
		title: PropTypes.string,
		isChecked: PropTypes.bool,
		theme: PropTypes.shape({
			primary: PropTypes.string,
			border: PropTypes.string,
			disabledBackground: PropTypes.string,
			disabledBorder: PropTypes.string,
		}),
		type: PropTypes.string,
		children: PropTypes.node,
		/** See the docs for how to override styles properly  */
		className: PropTypes.string,
		/** Disables automatic blur */
		disableAutoBlur: PropTypes.bool,
		disabled: PropTypes.bool,
	};

	static defaultProps = {
		theme: {
			primary: sharedColors.blueBase,
			border: '#95908f',
			disabledBackground: sharedColors.gray8,
			disabledBorder: sharedColors.gray22,
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
		const { onClick, title, isChecked, theme, type, children, className, disabled } = this.props;
		return (
			<Styled.RadioContainer
				ref={this.componentRef}
				onMouseUp={this.onMouseUp}
				onClick={onClick}
				type={type}
				className={className}
				role={'radio'}
				aria-checked={isChecked}
				disabled={disabled}
				theme={theme}
			>
				<Styled.RadioDiv disabled={disabled} theme={theme}>
					<Styled.CheckedIndicator isChecked={isChecked} disabled={disabled} theme={theme} />
				</Styled.RadioDiv>
				{title && <Styled.Label>{title}</Styled.Label>}
				{children && <Styled.Label>{children}</Styled.Label>}
			</Styled.RadioContainer>
		);
	}
}
