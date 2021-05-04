import { useCallback } from 'react';
import { useOptionallyControlledState } from '../utils/use-optionally-controlled-state';

/**
 * A React Select workaround to clear the `Select` value when the user is typing into the `Select`'s
 * input (as long as the `Select` is only for a single value and is clearable).
 */
export function useClearableSelectValue({
	value: controlledSelectValue,
	defaultValue: defaultSelectValue,
	onChange: onSelectChange,
	inputValue: controlledInputValue,
	defaultInputValue,
	onInputChange,
	isClearable,
	isMulti,
}) {
	const [selectValue, trySetSelectValue] = useOptionallyControlledState(
		controlledSelectValue,
		defaultSelectValue,
	);
	const [inputValue, trySetInputValue] = useOptionallyControlledState(
		controlledInputValue,
		defaultInputValue,
	);

	const innerOnSelectChange = useCallback(
		(newSelectValue, meta) => {
			trySetSelectValue(newSelectValue);
			if (onSelectChange) {
				onSelectChange(newSelectValue, meta);
			}
		},
		[onSelectChange, trySetSelectValue],
	);
	const innerOnInputChange = useCallback(
		(newInputValue, meta) => {
			const userIsTyping = meta.action === 'input-change';
			if (isClearable && !isMulti && userIsTyping) {
				innerOnSelectChange(null, { action: 'set-value' });
			}

			trySetInputValue(newInputValue);
			if (onInputChange) {
				onInputChange(newInputValue, meta);
			}
		},
		[innerOnSelectChange, isClearable, isMulti, onInputChange, trySetInputValue],
	);

	return {
		innerValue: selectValue,
		innerOnChange: innerOnSelectChange,
		innerInputValue: inputValue,
		innerOnInputChange,
	};
}
