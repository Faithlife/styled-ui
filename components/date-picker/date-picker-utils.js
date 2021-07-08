import React, { useContext, useRef, useState, useCallback } from 'react';

const handledKeys = {
	arrowUp: 'ArrowUp',
	arrowDown: 'ArrowDown',
	arrowLeft: 'ArrowLeft',
	arrowRight: 'ArrowRight',
	home: 'Home',
	end: 'End',
	pageUp: 'PageUp',
	pageDown: 'PageDown',
	escape: 'Escape',
};

const DateFunctionsContext = React.createContext();

export function DateFunctionsContextProvider({ children, dateFunctions }) {
	return (
		<DateFunctionsContext.Provider value={dateFunctions}>{children}</DateFunctionsContext.Provider>
	);
}

function useDateFunctionsContext() {
	const context = useContext(DateFunctionsContext);

	return context;
}

export function useDateFunctions(dateFunctionsProp) {
	const dateFnsContext = useDateFunctionsContext();

	if (!dateFunctionsProp && !dateFnsContext && process.env.NODE_ENV !== 'production') {
		throw new Error(
			'DatePicker requires dateFunctions to be supplied. See https://faithlife.github.io/styled-ui/#/date-picker/variations for more info.',
		);
	}

	const fns = dateFunctionsProp ?? dateFnsContext;
	const [dateFunctions] = useState(typeof fns === 'function' ? new fns() : fns);

	return dateFunctions;
}

export function useKeyboardNav({ setCurrentDate, onCloseMenu, focusCatchRef, dateFunctions }) {
	const currentMonth = useRef();
	const dayRefs = useRef([]);

	const dateFns = useDateFunctions(dateFunctions);

	const register = useCallback(
		monthRef => {
			if (monthRef !== currentMonth.current) {
				dayRefs.current = [];
				currentMonth.current = monthRef;
			}

			return {
				ref: ref => {
					if (!ref) {
						return;
					}

					const newRef = React.createRef();
					newRef.current = ref;

					const [weekIndex, dayIndex] = newRef.current.id.split('-').map(x => Number.parseInt(x));
					if (dayRefs.current.length <= weekIndex) {
						dayRefs.current.length = weekIndex + 1;
					}
					if (!dayRefs.current[weekIndex]) {
						dayRefs.current[weekIndex] = new Array(7);
					}

					dayRefs.current[weekIndex][dayIndex] = newRef;
				},
				onKeyDown: event => {
					const [weekIndex, dayIndex] = event.target.id.split('-').map(x => Number.parseInt(x));
					const shiftKey = event.shiftKey;
					switch (event.key) {
						case handledKeys.escape: {
							if (onCloseMenu) {
								event.preventDefault();
								onCloseMenu();
							}
							break;
						}

						case handledKeys.arrowUp: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(dateFns.getPrevWeek);
							if (weekIndex > 0 && !dayRefs.current[weekIndex - 1][dayIndex].current.disabled) {
								dayRefs.current[weekIndex - 1][dayIndex].current.focus();
							}
							break;
						}
						case handledKeys.arrowDown: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(dateFns.getNextWeek);
							if (
								weekIndex < dayRefs.current.length - 1 &&
								!dayRefs.current[weekIndex + 1][dayIndex].current.disabled
							) {
								dayRefs.current[weekIndex + 1][dayIndex].current.focus();
							}
							break;
						}
						case handledKeys.arrowLeft: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(dateFns.getPrevDay);
							if (dayIndex > 0 && !dayRefs.current[weekIndex][dayIndex - 1].current.disabled) {
								dayRefs.current[weekIndex][dayIndex - 1].current.focus();
							}
							if (dayIndex === 0 && weekIndex > 0) {
								dayRefs.current[weekIndex - 1][6].current.focus();
							}
							break;
						}
						case handledKeys.arrowRight: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(dateFns.getNextDay);
							if (dayIndex < 6 && !dayRefs.current[weekIndex][dayIndex + 1].current.disabled) {
								dayRefs.current[weekIndex][dayIndex + 1].current.focus();
							}
							if (dayIndex === 6 && weekIndex < dayRefs.current.length - 1) {
								dayRefs.current[weekIndex + 1][0].current.focus();
							}
							break;
						}
						case handledKeys.home: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => dateFns.startOfWeek(currentDate));
							if (dayIndex > 0 && !dayRefs.current[weekIndex][0].current.disabled) {
								dayRefs.current[weekIndex][0].current.focus();
							}
							break;
						}
						case handledKeys.end: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(currentDate => dateFns.endOfWeek(currentDate));
							if (dayIndex < 6 && !dayRefs.current[weekIndex][6].current.disabled) {
								dayRefs.current[weekIndex][6].current.focus();
							}
							break;
						}
						case handledKeys.pageUp: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(shiftKey ? dateFns.getPrevYear : dateFns.getPrevMonth);
							break;
						}
						case handledKeys.pageDown: {
							event.preventDefault();
							focusCatchRef.current.focus();
							setCurrentDate(shiftKey ? dateFns.getNextYear : dateFns.getNextMonth);
							break;
						}
						default:
							return;
					}
				},
			};
		},
		[onCloseMenu, focusCatchRef, setCurrentDate, dateFns],
	);

	return {
		register,
	};
}
