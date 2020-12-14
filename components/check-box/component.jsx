import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CheckboxContent } from './checkbox-content';
import * as Styled from './styled';
import { DefaultThemeProvider } from '../DefaultThemeProvider';

/** Styled checkbox control with consistent styling across platforms */
const Checkbox = function Checkbox(props) {
	const { onClick, title, isChecked, type, children, className, disabled } = props;

	/* eslint-disable react/prop-types */
	const handleMouseUp = e => {
		if (props.onMouseUp) {
			props.onMouseUp(e);
		}

		if (!props.disableAutoBlur) {
			componentRef.current.blur();
		}
	};

	const componentRef = useRef();

	return (
		<DefaultThemeProvider>
			<Styled.CheckboxContainer
				ref={componentRef}
				onClick={onClick}
				onMouseUp={handleMouseUp}
				type={type}
				className={className}
				role={'checkbox'}
				aria-checked={isChecked}
				disabled={disabled}
			>
				<CheckboxContent isChecked={isChecked} title={title} disabled={disabled}>
					{children}
				</CheckboxContent>
			</Styled.CheckboxContainer>
		</DefaultThemeProvider>
	);
};

Checkbox.propTypes = {
	/** Handler passed to native `button` */
	onClick: PropTypes.func.isRequired,
	onMouseUp: PropTypes.func,
	title: PropTypes.string,
	isChecked: PropTypes.oneOf([true, false, 'mixed']),
	type: PropTypes.string,
	children: PropTypes.node,
	/** See the docs for how to override styles properly  */
	className: PropTypes.string,
	/** Disables automatic blur */
	disableAutoBlur: PropTypes.bool,
	disabled: PropTypes.bool,
};

Checkbox.defaultProps = {
	type: 'button',
};

export { Checkbox };
