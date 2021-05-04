import { useState } from 'react';

const EMPTY_FUNCTION = () => {};

/**
 * For situations when a value can be controlled externally via props, but if it isn't controlled
 * you'd like to control it internally via state.
 * @param {any} controlledValue - The prop that can externally control the value when defined.
 * @param {any} defaultValue - An optional default value to initialize the state with when the value
 * is not externally controlled.
 * @returns {[value: any, trySetValue: (newValue?: any) => void]} An array of the state value and
 * either a setter function or (if the value is externally controlled) an empty function.
 */
export function useOptionallyControlledState(controlledValue, defaultValue) {
	const [value, setValue] = useState(defaultValue);

	if (controlledValue !== undefined) {
		return [controlledValue, EMPTY_FUNCTION];
	} else {
		return [value, setValue];
	}
}
