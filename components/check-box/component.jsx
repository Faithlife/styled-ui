import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CheckboxContent } from './checkbox-content';
import * as Styled from './styled';
import { DefaultThemeProvider } from '../DefaultThemeProvider';
import { common, typography } from '../../theme/system';

/** Styled checkbox control with consistent styling across platforms */
export const Checkbox = function Checkbox({
	onClick,
	onMouseUp,
	title,
	isChecked,
	type,
	children,
	disableAutoBlur,
	disabled,
	...otherProps
}) {
	const handleMouseUp = e => {
		if (onMouseUp) {
			onMouseUp(e);
		}

		if (!disableAutoBlur) {
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
				role={'checkbox'}
				aria-checked={isChecked}
				disabled={disabled}
				{...otherProps}
			>
				<CheckboxContent isChecked={isChecked} title={title} disabled={disabled}>
					{children}
				</CheckboxContent>
			</Styled.CheckboxContainer>
		</DefaultThemeProvider>
	);
};

Checkbox.propTypes = {
	/**
	 * Click handler passed to the native `<button>`.
	 * @type {(event: React.MouseEvent<HTMLElement>) => void}
	 */
	onClick: PropTypes.func.isRequired,
	/**
	 * Mouse-up handler passed to the native `<button>`.
	 * @type {(event: React.MouseEvent<HTMLElement>) => void}
	 */
	onMouseUp: PropTypes.func,
	title: PropTypes.string,
	isChecked: PropTypes.oneOf([true, false, 'mixed']),
	/** `type` attribute passed to the native `<button>`. */
	type: PropTypes.string,
	children: PropTypes.node,
	/** Disables automatic blur. */
	disableAutoBlur: PropTypes.bool,
	disabled: PropTypes.bool,
	...common.propTypes,
	...typography.propTypes,
};

Checkbox.defaultProps = {
	type: 'button',
};
