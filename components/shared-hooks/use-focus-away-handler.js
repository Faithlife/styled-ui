import { useCallback, useRef, useEffect } from 'react';
import { useId } from './use-id';
import { useBasicMap } from './use-basic-map';

export function useFocusAwayHandler(onFocusAwayCallback) {
	const targetRef = useRef();
	const { map, add, remove } = useBasicMap();

	const onBlur = useCallback(
		event => {
			const inboundsElementsList = Object.values(map).filter(ref => !!ref.current);
			if (targetRef.current || inboundsElementsList.length > 0) {
				const relatedTarget =
					event.relatedTarget || event.explicitOriginalTarget || document.activeElement;
				if (
					onFocusAwayCallback &&
					(!relatedTarget ||
						(!targetRef.current.contains(relatedTarget) &&
							!inboundsElementsList.some(
								ref => ref.current && ref.current.contains(relatedTarget),
							)))
				) {
					onFocusAwayCallback();
				}
			}
		},
		[onFocusAwayCallback, map],
	);

	useEffect(
		// There is no reason to return a cleanup function if an event listener is not created
		// eslint-disable-next-line consistent-return
		() => {
			const targetList = [targetRef.current, ...Object.values(map).map(x => x.current)].filter(
				x => x !== null && x !== undefined,
			);
			if (targetList.length > 0) {
				for (const target of targetList) {
					target.addEventListener('focusout', onBlur);
				}
				return () => {
					for (const target of targetList) {
						target.removeEventListener('focusout', onBlur);
					}
				};
			}
		},
		[onBlur, map],
	);

	const addInboundsElement = useCallback((id, ref) => add(id, ref), [add]);
	const removeInboundsElement = useCallback(id => remove(id), [remove]);

	return { targetRef, addInboundsElement, removeInboundsElement };
}

export function useAddInboundsElement(addInboundsElement, removeInboundsElement) {
	const targetRef = useRef();
	const id = useId();

	useEffect(
		// There is no reason to return a cleanup function if an event listener is not created
		// eslint-disable-next-line consistent-return
		() => {
			if (id) {
				addInboundsElement(id, targetRef);

				return () => {
					removeInboundsElement(id);
				};
			}
		},
		[addInboundsElement, removeInboundsElement, id],
	);

	return targetRef;
}
