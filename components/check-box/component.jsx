import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetStyles } from '../utils';
import { CheckboxContent } from './checkbox-content';

/** Styled checkbox control with consistent styling across platforms */
export class Checkbox extends Component {
	static propTypes = {
		/** Handler passed to native `button` */
		onClick: PropTypes.func.isRequired,
		onMouseUp: PropTypes.func,
		title: PropTypes.string,
		isChecked: PropTypes.bool,
		type: PropTypes.string,
		children: PropTypes.node,
		/** See the docs for how to override styles properly  */
		className: PropTypes.string,
		/** Disables automatic blur */
		disableAutoBlur: PropTypes.bool,
		disabled: PropTypes.bool,
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
		const { onClick, title, isChecked, type, children, className, disabled, ...props } = this.props;
		return (
			<CheckboxContainer
				ref={this.componentRef}
				onClick={onClick}
				onMouseUp={this.onMouseUp}
				type={type}
				className={className}
				role={'checkbox'}
				aria-checked={isChecked}
				disabled={disabled}
			>
				<CheckboxContent isChecked={isChecked} title={title} disabled={disabled} {...props}>
					{children}
				</CheckboxContent>
			</CheckboxContainer>
		);
	}
}

Checkbox.defaultProps = {
	type: 'button',
};

const CheckboxContainer = styled.button`
	${resetStyles};

	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0px 16px;
	min-height: 44px;
	min-width: 44px;
	background: transparent;
	text-align: unset;
	cursor: ${props => props.disabled || 'pointer'};

	&:not(:disabled) {
		&:active {
			color: buttontext;
		}
	}

	&:focus {
		&:not(:active) {
			box-shadow: 0 0 0 0.2rem rgba(30, 145, 214, 0.5);
		}
		outline: none;
	}
`;
