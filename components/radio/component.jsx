import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { DefaultThemeProvider } from '../DefaultThemeProvider';
import * as Styled from './styled';

/** A styled radio control that uses a `<button>` instead of an `<input>`. */
export function Radio({
	onClick,
	title,
	isChecked,
	type,
	children,
	disableAutoBlur,
	disabled,
	onMouseUp: propsOnMouseUp,
	...buttonProps
}) {
	const buttonRef = useRef();

	const onMouseUp = e => {
		if (propsOnMouseUp) {
			propsOnMouseUp(e);
		}

		if (!disableAutoBlur && buttonRef.current) {
			buttonRef.current.blur();
		}
	};

	return (
		<DefaultThemeProvider>
			<Styled.RadioContainer
				ref={buttonRef}
				onMouseUp={onMouseUp}
				onClick={onClick}
				type={type}
				role="radio"
				aria-checked={isChecked}
				disabled={disabled}
				{...buttonProps}
			>
				<Styled.RadioSvg viewBox="0 0 28 28">
					<Styled.RadioBorder cx="14" cy="14" r="13" />
					{isChecked && <Styled.CheckedIndicator cx="14" cy="14" r="8" />}
				</Styled.RadioSvg>
				{title && <Styled.Label>{title}</Styled.Label>}
				{children && <Styled.Label>{children}</Styled.Label>}
			</Styled.RadioContainer>
		</DefaultThemeProvider>
	);
}

Radio.propTypes = {
	/** A handler passed to the `<button>` element. */
	onClick: PropTypes.func.isRequired,
	/** The text of the radio button. */
	title: PropTypes.string,
	/** Whether the button is currently checked. */
	isChecked: PropTypes.bool,
	/** The `type` passed to the `<button>` element. */
	type: PropTypes.string,
	/** The text of the radio button (may be used instead of `title`). */
	children: PropTypes.node,
	/** Disables automatic blur. */
	disableAutoBlur: PropTypes.bool,
	/** Disables the radio button. */
	disabled: PropTypes.bool,
	/** A handler passed to the `<button>` element. */
	onMouseUp: PropTypes.func,
};

Radio.defaultProps = {
	type: 'button',
};
