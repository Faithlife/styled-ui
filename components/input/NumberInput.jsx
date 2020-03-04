import React, { useCallback, useRef, useMemo } from 'react';
import { css } from 'styled-components';
import { Box } from '../Box';
import { Input } from './Input';
import { Button } from '../button';
import { ChevronUp, ChevronDown } from '../icons/12px';
import { theme } from '../../theme';
import { useCopyRefs } from '../shared-hooks/use-copy-refs';

const NumberInput = React.memo(
	React.forwardRef(function NumberInput(props, ref) {
		const { variant, width, ...rest } = props;
		const inputRef = useRef();
		const innerRef = useCopyRefs(useMemo(() => [ref, inputRef], [inputRef, ref]));

		const dispatchChangeEvent = useCallback(() => {
			inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
		}, []);

		const handleStepUp = useCallback(() => {
			inputRef.current.stepUp();
			dispatchChangeEvent();
		}, [dispatchChangeEvent]);

		const handleStepDown = useCallback(() => {
			inputRef.current.stepDown();
			dispatchChangeEvent();
		}, [dispatchChangeEvent]);

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
				/>
				<StepButton
					onClick={handleStepDown}
					bottom={0}
					paddingBottom={buttonPadding}
					icon={<ChevronDown />}
					disabled={props.disabled}
				/>
			</InputContainer>
		);
	}),
);

NumberInput.defaultProps = {
	theme,
};

NumberInput.propTypes = {
	...Input.PropTypes,
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
			visibility: hidden;

			${!props.disabled &&
				css`
					.input-container:hover &,
					.input-container:focus-within & {
						visibility: visible;
					}
				`}
		`}
		{...props}
	/>
);

export { NumberInput };
