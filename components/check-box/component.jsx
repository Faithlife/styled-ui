import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors as sharedColors } from '../shared-styles';
import { CheckboxContent } from './checkbox-content';
import * as Styled from './styled';

/** Styled checkbox control with consistent styling across platforms */
export class Checkbox extends Component {
	static propTypes = {
		/** Handler passed to native `button` */
		onClick: PropTypes.func.isRequired,
		onMouseUp: PropTypes.func,
		title: PropTypes.string,
		isChecked: PropTypes.oneOf([true, false, 'mixed']),
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
			<Styled.CheckboxContainer
				ref={this.componentRef}
				onClick={onClick}
				onMouseUp={this.onMouseUp}
				type={type}
				className={className}
				role={'checkbox'}
				aria-checked={isChecked}
				disabled={disabled}
				theme={theme}
			>
				<CheckboxContent isChecked={isChecked} title={title} disabled={disabled} theme={theme}>
					{children}
				</CheckboxContent>
			</Styled.CheckboxContainer>
		);
	}
}

Checkbox.defaultProps = {
	theme: {
		primary: sharedColors.blueBase,
		border: '#95908f',
		disabledBackground: sharedColors.gray8,
		disabledBorder: sharedColors.gray22,
	},
	type: 'button',
};
