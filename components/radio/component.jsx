import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system } from 'styled-system';
import { resetStyles } from '../utils';
import { colors as sharedColors } from '../shared-styles';
import { Box } from '../Box';
import { Text } from '../Text';

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
		const { onClick, title, isChecked, type, children, className, disabled } = this.props;
		return (
			<RadioContainer
				ref={this.componentRef}
				onMouseUp={this.onMouseUp}
				onClick={onClick}
				type={type}
				className={className}
				role={'radio'}
				aria-checked={isChecked}
				disabled={disabled}
			>
				<HoverableBox
					position="absolute"
					width="14px"
					height="14px"
					borderRadius="50%"
					border={1}
					borderColor={disabled ? 'gray22' : '#95908f'}
					hoverBorderColor={disabled || 'blue4'}
					background="transparent"
					backgroundColor={disabled && 'gray8'}
				>
					<Box
						position="absolute"
						top="2px"
						left="2px"
						width="8px"
						height="8px"
						borderRadius="50%"
						opacity={isChecked ? '1' : '0'}
						backgroundColor="blue4"
					/>
				</HoverableBox>
				{title && (
					<Label marginLeft="22px" siblingMarginLeft="6px" textStyle="c.14">
						{title}
					</Label>
				)}
				{children && (
					<Label marginLeft="22px" siblingMarginLeft="6px">
						{children}
					</Label>
				)}
			</RadioContainer>
		);
	}
}

const hoverBorderColor = { hoverBorderColor: { property: 'borderColor', scale: 'colors' } };
const HoverableBox = styled(Box)`
	@media (hover: hover) {
		&:hover {
			${system(hoverBorderColor)};
		}
	}
	@media (hover: none) {
		&:active {
			${system(hoverBorderColor)};
		}
	}
`;

const Label = styled(Text)`
	& + & {
		${system({ siblingMarginLeft: { property: 'margin-left', scale: 'space' } })};
	}
`;

const RadioContainer = styled.button`
	${resetStyles};

	display: flex;
	align-items: center;
	position: relative;
	border: none;
	padding: 0px;
	min-width: 14px;
	min-height: 14px;
	background: transparent;
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
