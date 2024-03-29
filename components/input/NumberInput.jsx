import React, { useCallback, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { Box } from '../Box';
import { Input } from './Input';
import { Button } from '../button';
import { ChevronUp, ChevronDown } from '../icons/12px';
import { theme } from '../../theme';
import { useCopyRefs } from '../shared-hooks/use-copy-refs';

const NumberInput = React.memo(
	React.forwardRef(function NumberInput(props, ref) {
		const { variant, width, onStep, ...rest } = props;
		const inputRef = useRef();
		const innerRef = useCopyRefs(useMemo(() => [ref, inputRef], [inputRef, ref]));

		const dispatchChangeEvent = useCallback(() => {
			inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
			inputRef.current.focus();
		}, []);

		const handleStepUp = useCallback(() => {
			if (!inputRef.current.value) {
				inputRef.current.value = 0;
			}
			inputRef.current.stepUp();
			dispatchChangeEvent();
			if (onStep) {
				onStep(inputRef.current.value);
			}
		}, [dispatchChangeEvent, onStep]);

		const handleStepDown = useCallback(() => {
			if (!inputRef.current.value) {
				inputRef.current.value = 0;
			}
			inputRef.current.stepDown();
			dispatchChangeEvent();
			if (onStep) {
				onStep(inputRef.current.value);
			}
		}, [dispatchChangeEvent, onStep]);

		const buttonPadding = variant === 'small' ? 2 : 3;

		return (
			<InputContainer width={width}>
				<Input
					paddingRight="24px"
					width={width && '100%'}
					textAlign="right"
					{...rest}
					ref={innerRef}
					variant={variant}
					type="number"
					css={`
						-webkit-appearance: textfield;
						-moz-appearance: textfield;
						appearance: textfield;

						&::-webkit-inner-spin-button,
						&::-webkit-outer-spin-button {
							-webkit-appearance: none;
							margin: 0;
						}
					`}
				/>
				<StepButton
					onClick={handleStepUp}
					top={0}
					paddingTop={buttonPadding}
					icon={<ChevronUp />}
					disabled={props.disabled}
					alwaysShowButtons={props.alwaysShowButtons}
				/>
				<StepButton
					onClick={handleStepDown}
					bottom={0}
					paddingBottom={buttonPadding}
					icon={<ChevronDown />}
					disabled={props.disabled}
					alwaysShowButtons={props.alwaysShowButtons}
				/>
			</InputContainer>
		);
	}),
);

NumberInput.defaultProps = {
	selectOnFocus: true,
	theme,
};

NumberInput.propTypes = {
	...Input.PropTypes,
	alwaysShowButtons: PropTypes.bool,
	/**
	 * Runs when either step button is pressed.
	 * @type {(inputValue: string) => void}
	 */
	onStep: PropTypes.func,
};

const InputContainer = ({ children, ...props }) => (
	<Box
		display="inline-block"
		position="relative"
		alignSelf="center"
		className="input-container"
		{...props}
	>
		{children}
	</Box>
);

const StepButton = props => (
	<Button
		tabIndex={-1}
		position="absolute"
		right="1px"
		variant="minorTransparent"
		size="small"
		css={`
			height: 50%;

			${!props.alwaysShowButtons &&
				css`
					visibility: hidden;
				`}

			${!props.disabled &&
				css`
					path {
						fill: ${theme.colors.input.icon};
					}

					.input-container:hover &,
					.input-container:focus-within & {
						visibility: visible;
					}

					.input-container:focus-within & path {
						fill: ${theme.colors.input.iconFocused};
					}
				`}
		`}
		{...props}
	/>
);

export { NumberInput };
