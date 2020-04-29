import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxContent } from './checkbox-content';
import * as Styled from './styled';
import { isSystemTheme } from '../../theme';
import { DefaultThemeProvider } from '../DefaultThemeProvider';

/** Styled checkbox control with consistent styling across platforms */
const Checkbox = React.forwardRef(function Checkbox(props) {
	const {
		onClick,
		onMouseUp,
		title,
		isChecked,
		theme,
		type,
		children,
		className,
		disableAutoBlur,
		disabled,
		...checkboxProps
	} = props;

	const isCoreTheme = isSystemTheme(theme);
	const themedProps = { ...(isCoreTheme ? {} : theme) };

	/* eslint-disable react/prop-types */
	const handleMouseUp = e => {
		if (props.onMouseUp) {
			props.onMouseUp(e);
		}

		if (!props.disableAutoBlur) {
			blur();
		}
	};

	return (
		<DefaultThemeProvider>
			<Styled.CheckboxContainer
				ref={this}
				onClick={onClick}
				onMouseUp={handleMouseUp}
				type={type}
				className={className}
				role={'checkbox'}
				aria-checked={isChecked}
				disabled={disabled}
				themeOverrides={themedProps}
			>
				<CheckboxContent
					isChecked={isChecked}
					title={title}
					disabled={disabled}
					themeOverrides={themedProps}
				>
					{children}
				</CheckboxContent>
			</Styled.CheckboxContainer>
		</DefaultThemeProvider>
	);
});

Checkbox.propTypes = {
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

Checkbox.defaultProps = {
	theme: {},
	type: 'button',
};

export { Checkbox };
