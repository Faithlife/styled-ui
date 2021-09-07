import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styledSystemPropTypes from '@styled-system/prop-types';
import { getConfigChild } from '../utils';
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

	const [icon, iconFilteredChildren] = getConfigChild(children, RadioIcon.childConfigComponent);
	const [label, otherChildren] = getConfigChild(
		iconFilteredChildren,
		Styled.RadioLabel.childConfigComponent,
	);

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
				<Styled.RadioSvg viewBox="0 0 28 28" {...(icon?.props ?? {})}>
					<Styled.RadioBorder cx="14" cy="14" r="13" />
					{isChecked && <Styled.CheckedIndicator cx="14" cy="14" r="8" />}
				</Styled.RadioSvg>
				{label}
				{title && <Styled.RadioLabel>{title}</Styled.RadioLabel>}
				{otherChildren && <Styled.RadioLabel>{otherChildren}</Styled.RadioLabel>}
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
	/** The `type` attribute passed to the `<button>` element. */
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

/**
 * An optional configuration component that passes Styled System props directly to the radio icon.
 */
export const RadioIcon = props => null;
RadioIcon.propTypes = {
	...styledSystemPropTypes.position,
	...styledSystemPropTypes.space,
	...styledSystemPropTypes.layout,
};
RadioIcon.childConfigComponent = 'RadioIcon';
