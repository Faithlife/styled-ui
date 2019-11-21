import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
const Parchment = Quill.import('parchment');
import { throttle } from './throttle';
import { IOverlayCoordinates, IOverlayDimensions } from '../components/ResizableOverlay';

const overlayMarginPixels = 2;

const scroll = {
	speed: 3,
	throttle: 25,
};

const backspaceCode = 8;
const deleteCode = 46;
const rightCode = 39;
const leftCode = 37;

// loosely inspired by faithlife sites image controls:
// https://git.faithlife.dev/Logos/Sites.Admin/tree/dc55976323022c4f47ebca57fc07b263ef695155/src/Sites.Admin/Private/scripts/components/text-editor/modules/ImageControls
export const useImageControls = (
	quillEditorQuery
): {
	overlayCoordinates: IOverlayCoordinates | null;
	handleClickOnEditor: (target: HTMLElement, editorRef: ReactQuill | null) => void;
	handleTextChangeOnEditor: () => void;
	handleScrollOnEditor: () => void;
	handleKeyUpOnBody: (event: KeyboardEvent) => void;
	handleMouseWheelOnOverlay: (event: React.WheelEvent) => void;
	handleOverlayResizeComplete: () => void;
	handleOverlayResize: (dimensions: IOverlayDimensions) => void;
} => {
	const editor = useRef<Quill>();
	const [overlayCoordinates, setOverlayCoordinates] = useState<IOverlayCoordinates | null>(null);
	const [hasResizeOccurred, setHasResizeOccurred] = useState(false);
	const getEditor = useCallback(() => editor.current, []);
	const selectedImage = useRef<HTMLImageElement | null>();
	const selectImage = useCallback((element: HTMLImageElement | null) => {
		selectedImage.current = element;
	}, []);
	const getSelectedImage = useCallback(() => {
		if (selectedImage.current) {
			if (document.body.contains(selectedImage.current)) {
				return selectedImage.current;
			} else {
				selectImage(null);
				setOverlayCoordinates(null);
			}
		} else {
			setOverlayCoordinates(null);
		}
	}, [selectImage]);

	const repositionOverlay = useCallback(() => {
		const editor = getEditor();
		const selectedImage = getSelectedImage();
		if (!editor || !selectedImage) {
			return;
		}
		if (editor.hasFocus()) {
			editor.blur();
		}
		const bounds = editor.root.closest(quillEditorQuery);
		const parent = editor.root.parentElement;
		if (bounds && parent) {
			const imageRect = selectedImage.getBoundingClientRect();
			const containerRect = bounds.getBoundingClientRect();
			setOverlayCoordinates({
				left: imageRect.left + parent.scrollLeft - containerRect.left - overlayMarginPixels * 2,
				top: imageRect.top + parent.scrollTop - containerRect.top - overlayMarginPixels * 2,
				width: imageRect.width + overlayMarginPixels * 2,
				height: imageRect.height + overlayMarginPixels * 2,
			});
		}
	}, [getEditor, getSelectedImage, quillEditorQuery]);

	const simulateEditorScroll = useCallback(
		(deltaX, deltaY) => {
			const editor = getEditor();
			if (editor && editor.root) {
				const top = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY * scroll.speed : 0;
				const left = Math.abs(deltaX) >= Math.abs(deltaY) ? deltaX * scroll.speed : 0;
				editor.root.scrollBy({ top, left });
			}
		},
		[getEditor]
	);
	const throttledScroll = useRef<any>();
	useEffect(() => {
		throttledScroll.current = throttle(
			(deltaX, deltaY) => simulateEditorScroll(deltaX, deltaY),
			scroll.throttle
		);
		return () => throttledScroll.current.cancel();
	}, [simulateEditorScroll]);

	const handleMouseWheelOnOverlay = useCallback((event: React.WheelEvent) => {
		const deltaX = event.deltaX;
		const deltaY = event.deltaY;
		throttledScroll.current(deltaX, deltaY);
	}, []);

	const interpretKeyboardEvent = useCallback(
		(keyCode: number) => {
			const editor = getEditor();
			const selectedImage = getSelectedImage();
			const isSelected = !!(selectedImage && editor);
			const deleteWhileSelected =
				isSelected && (keyCode === backspaceCode || keyCode === deleteCode);
			const rightWhileSelected = isSelected && keyCode === rightCode;
			const leftWhileSelected = isSelected && keyCode === leftCode;
			return { deleteWhileSelected, rightWhileSelected, leftWhileSelected };
		},
		[getEditor, getSelectedImage]
	);

	const setSelectionOnImage = useCallback(
		(select: 'highlight' | 'before' | 'after' = 'highlight') => {
			const editor = getEditor();
			const selectedImage = getSelectedImage();
			const offsetAdjust = select === 'after' ? 1 : 0;
			const length = select === 'highlight' ? 1 : 0;
			if (selectedImage && editor) {
				const quillImage = Parchment.find(selectedImage);
				quillImage &&
					editor.setSelection(quillImage.offset(editor.scroll) + offsetAdjust, length, 'user');
			}
		},
		[getEditor, getSelectedImage]
	);

	// must programatically delete selected image on backspace / delete since overlay element has focus
	// if image is highlighted but overlay remains present, quill editor keeps focus so just need to remove overlay
	// also including functionality to move left or right of selected image on arrow key press
	const handleKeyUpOnBody: (event: KeyboardEvent) => void = useCallback(
		({ keyCode, target }) => {
			const selectedImage = getSelectedImage();
			if (target !== document.body || !selectedImage) {
				return;
			}
			const { deleteWhileSelected, rightWhileSelected, leftWhileSelected } = interpretKeyboardEvent(
				keyCode
			);
			const editor = getEditor();
			if (editor && deleteWhileSelected) {
				const image = Parchment.find(selectedImage);
				const removeIndex = image.offset(editor.scroll);
				editor.deleteText(removeIndex, 1);
				editor.setSelection(removeIndex, 0);
				selectImage(null);
				setOverlayCoordinates(null);
			} else if (editor && (rightWhileSelected || leftWhileSelected)) {
				setSelectionOnImage(leftWhileSelected ? 'before' : 'after');
				selectImage(null);
				setOverlayCoordinates(null);
				editor.focus();
			}
		},
		[getEditor, getSelectedImage, interpretKeyboardEvent, selectImage, setSelectionOnImage]
	);

	const handleClickOnEditor = useCallback(
		(target: HTMLElement, editorRef: ReactQuill | null) => {
			if (editorRef) {
				editor.current = editorRef.getEditor();
				const selectedImage = getSelectedImage();
				if (target === selectedImage || hasResizeOccurred) {
					return;
				}
				if (target && target.tagName && target.tagName.toLowerCase() === 'img') {
					selectImage(target as HTMLImageElement);
					setSelectionOnImage();
					repositionOverlay();
				} else {
					selectedImage && selectImage(null);
					overlayCoordinates && setOverlayCoordinates(null);
				}
			}
		},
		[
			getSelectedImage,
			hasResizeOccurred,
			overlayCoordinates,
			repositionOverlay,
			selectImage,
			setSelectionOnImage,
		]
	);

	const handleTextChangeOnEditor = useCallback(() => {
		if (getSelectedImage()) {
			setSelectionOnImage();
			repositionOverlay();
		}
	}, [getSelectedImage, repositionOverlay, setSelectionOnImage]);

	const handleScrollOnEditor = useCallback(() => {
		if (overlayCoordinates) {
			repositionOverlay();
		}
	}, [overlayCoordinates, repositionOverlay]);

	const dragTimer = useRef<any>();
	useEffect(
		() => () => {
			if (dragTimer.current) {
				clearTimeout(dragTimer.current);
			}
		},
		[]
	);
	const handleOverlayResize = useCallback(
		(dimensions: IOverlayDimensions) => {
			setHasResizeOccurred(true);
			const selectedImage = getSelectedImage();
			if (selectedImage) {
				selectedImage.width = dimensions.width - overlayMarginPixels * 2;
			}
		},
		[getSelectedImage]
	);
	const handleOverlayResizeComplete = useCallback(() => {
		if (dragTimer.current) {
			clearTimeout(dragTimer.current);
		}
		// wait until after handleClickOnEditor has fired to reset hasResizeOccurred
		dragTimer.current = setTimeout(() => setHasResizeOccurred(false), 0);
	}, []);

	return useMemo(
		() => ({
			overlayCoordinates,
			handleClickOnEditor,
			handleTextChangeOnEditor,
			handleScrollOnEditor,
			handleKeyUpOnBody,
			handleMouseWheelOnOverlay,
			handleOverlayResize,
			handleOverlayResizeComplete,
		}),
		[
			overlayCoordinates,
			handleClickOnEditor,
			handleTextChangeOnEditor,
			handleScrollOnEditor,
			handleKeyUpOnBody,
			handleMouseWheelOnOverlay,
			handleOverlayResize,
			handleOverlayResizeComplete,
		]
	);
};
