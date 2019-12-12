import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { IOverlayCoordinates, IOverlayDimensions } from '../components/ResizableOverlay';
import { SafeQuill } from '../QuillEditor/SafeQuill';

const Parchment = SafeQuill && SafeQuill.import('parchment');

const overlayMarginPixels = 2;

const backspaceCode = 8;
const deleteCode = 46;
const rightCode = 39;
const leftCode = 37;
const upCode = 38;
const downCode = 40;

// loosely inspired by faithlife sites image controls:
// https://git.faithlife.dev/Logos/Sites.Admin/tree/dc55976323022c4f47ebca57fc07b263ef695155/src/Sites.Admin/Private/scripts/components/text-editor/modules/ImageControls
export const useImageControls = (
	quillEditorQuery,
	setAllowImageLink
): {
	overlayCoordinates: IOverlayCoordinates | null;
	handleClickOnEditor: (target: HTMLElement, editorRef: any | null) => void;
	handleTextChangeOnEditor: () => void;
	handleScrollOnEditor: () => void;
	handleOverlayResizeComplete: () => void;
	handleOverlayResize: (dimensions: IOverlayDimensions) => void;
	handleAlignmentChange: (alignement: string) => void;
	currentAlignment: string;
} => {
	const editor = useRef<any>();
	const [overlayCoordinates, setOverlayCoordinates] = useState<IOverlayCoordinates | null>(null);
	const [hasResizeOccurred, setHasResizeOccurred] = useState(false);
	const getEditor = useCallback(() => editor.current, []);
	const selectedImage = useRef<HTMLImageElement | null>();
	const [currentAlignment, setCurrentAlignment] = useState('');

	const selectImage = useCallback(
		(element: HTMLImageElement | null) => {
			selectedImage.current = element;
			if (element) {
				const blot = Parchment.find(element);
				const parentBlot = Parchment.find(element.parentElement);
				setCurrentAlignment(
					(blot.attributes && blot.attributes.attributes.imageAlign) ||
						(parentBlot.attributes && parentBlot.attributes.attributes.imageAlign)
						? 'wrap'
						: ''
				);
				setAllowImageLink(true);
			} else {
				setAllowImageLink(false);
			}
		},
		[setAllowImageLink]
	);

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

	const getSelectedImageParent = useCallback(() => {
		const selectedImage = getSelectedImage();
		if (selectedImage) {
			return selectedImage.parentElement;
		}
	}, [getSelectedImage]);

	const repositionOverlay = useCallback(() => {
		const editor = getEditor();
		const selectedImage = getSelectedImage();
		if (!editor || !selectedImage) {
			return;
		}

		const bounds = editor.root.closest(quillEditorQuery);
		const parent = editor.root.parentElement;
		const toolbarHeight = 42;
		if (bounds && parent) {
			const imageRect = selectedImage.getBoundingClientRect();
			const containerRect = bounds.getBoundingClientRect();
			setOverlayCoordinates({
				left: imageRect.left + bounds.scrollLeft - containerRect.left - overlayMarginPixels * 2,
				top:
					imageRect.top +
					bounds.scrollTop -
					containerRect.top -
					toolbarHeight -
					overlayMarginPixels * 2,
				width: imageRect.width + overlayMarginPixels * 2,
				height: imageRect.height + overlayMarginPixels * 2,
			});
		}
	}, [getEditor, getSelectedImage, quillEditorQuery]);

	const setSelectionOnImage = useCallback(
		(select: 'highlight' | 'before' | 'after' = 'highlight') => {
			const editor = getEditor();
			const selectedImage = getSelectedImage();
			const offsetAdjust = select === 'after' ? 1 : 0;
			const length = select === 'highlight' ? 1 : 0;
			if (selectedImage && editor) {
				const imageBlot = Parchment.find(selectedImage);
				const parent = getSelectedImageParent();
				const parentIsLink = parent && parent.tagName === 'A';
				editor.setSelection(
					imageBlot.offset(editor.scroll) + offsetAdjust,
					parentIsLink ? 0 : length,
					'user'
				);
			}
		},
		[getEditor, getSelectedImage, getSelectedImageParent]
	);

	const interpretKeyboardEvent = useCallback(
		(keyCode: number) => {
			const editor = getEditor();
			const selectedImage = getSelectedImage();
			const isSelected = !!(selectedImage && editor);
			const deleteWhileSelected =
				isSelected && (keyCode === backspaceCode || keyCode === deleteCode);

			const isRight = keyCode === rightCode;
			const isLeft = keyCode === leftCode;
			const isUp = keyCode === upCode;
			const isDown = keyCode === downCode;

			const selection = editor.getSelection();
			const previousDelta =
				(isRight || isLeft) &&
				selection &&
				editor.getContents({
					index: selection.index + (isRight ? -1 : 0),
					length: 1,
				});

			const ontoImage =
				!isSelected &&
				previousDelta &&
				previousDelta.ops.length &&
				!!previousDelta.ops[0].insert.faithlifeImage;

			let imageBlot;
			if (ontoImage) {
				const nativeSelection = editor.selection.getNativeRange();
				const selectedNode = nativeSelection && nativeSelection.end.node;
				const nodeAsImg = node => node && node.tagName === 'IMG' && node;

				// Picking the correct img node to select required a trial and error method of determining where selection lands
				if (selectedNode) {
					let resultNode;
					if (isLeft) {
						resultNode = nodeAsImg(selectedNode.nextSibling);
						resultNode = resultNode || nodeAsImg(selectedNode.parentElement);
						resultNode =
							resultNode ||
							(selectedNode.parentElement && nodeAsImg(selectedNode.parentElement.nextSibling));
						resultNode =
							resultNode ||
							(selectedNode.nextSibling && nodeAsImg(selectedNode.nextSibling.firstElementChild));
					} else {
						resultNode = nodeAsImg(selectedNode) || nodeAsImg(selectedNode.previousSibling);
						resultNode =
							resultNode ||
							(selectedNode.parentElement && nodeAsImg(selectedNode.parentElement.previousSibling));
					}
					imageBlot = resultNode && Parchment.find(resultNode);
				}
			}

			const offImage = isSelected && (isRight || isLeft || isUp || isDown);
			return { deleteWhileSelected, offImage, isLeft, isRight, ontoImage, imageBlot };
		},
		[getEditor, getSelectedImage]
	);

	// must programatically delete selected image on backspace / delete since overlay element has focus
	// if image is highlighted but overlay remains present, quill editor keeps focus so just need to remove overlay
	// also including functionality to move left or right of selected image on arrow key press
	const handleKeyUpOnBody: (event: KeyboardEvent) => void = useCallback(
		event => {
			const selectedImage = getSelectedImage();
			const {
				deleteWhileSelected,
				offImage,
				isLeft,
				isRight,
				ontoImage,
				imageBlot,
			} = interpretKeyboardEvent(event.keyCode);
			const editor = getEditor();
			if (editor && ontoImage && imageBlot) {
				selectImage(imageBlot.domNode as HTMLImageElement);
				const parent = getSelectedImageParent();
				const parentIsLink = parent && parent.tagName === 'A';
				if (parentIsLink) {
					repositionOverlay();
					setSelectionOnImage();
				} else {
					setSelectionOnImage();
					repositionOverlay();
				}
			} else if (editor && deleteWhileSelected) {
				const image = Parchment.find(selectedImage);
				const removeIndex = image.offset(editor.scroll);
				editor.deleteText(removeIndex, 1);
				editor.setSelection(removeIndex, 0);
				selectImage(null);
				setOverlayCoordinates(null);
			} else if (editor && offImage) {
				if (isLeft || isRight) {
					setSelectionOnImage(isLeft ? 'before' : 'after');
				}
				selectImage(null);
				setOverlayCoordinates(null);
				editor.focus();
			}
		},
		[
			getEditor,
			getSelectedImage,
			interpretKeyboardEvent,
			selectImage,
			repositionOverlay,
			setSelectionOnImage,
			getSelectedImageParent,
		]
	);

	useEffect(() => {
		document.body.addEventListener('keyup', handleKeyUpOnBody, false);

		return () => document.body.removeEventListener('keyup', handleKeyUpOnBody, false);
	}, [handleKeyUpOnBody]);

	const handleClickOnEditor = useCallback(
		(target: HTMLElement, editorRef: any | null) => {
			if (editorRef) {
				editor.current = editorRef.getEditor();
				const selectedImage = getSelectedImage();
				if (hasResizeOccurred) {
					return;
				}
				if (target && target.tagName && target.tagName.toLowerCase() === 'img') {
					selectImage(target as HTMLImageElement);
					const parent = getSelectedImageParent();
					const parentIsLink = parent && parent.tagName === 'A';
					if (parentIsLink) {
						repositionOverlay();
						setSelectionOnImage();
					} else {
						setSelectionOnImage();
						repositionOverlay();
					}
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
			getSelectedImageParent,
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

	const handleAlignmentChange = useCallback(
		alignment => {
			const selectedImage = getSelectedImage();
			const editor = getEditor();
			if (editor && selectedImage) {
				const parent = getSelectedImageParent();
				const parentIsContainer = parent && (parent.tagName === 'SPAN' || parent.tagName === 'A');
				const blotElement = parentIsContainer ? parent : selectedImage;
				const blot = Parchment.find(blotElement);
				blot.format('imageAlign', alignment);
				setCurrentAlignment(alignment);
				repositionOverlay();
			}
		},
		[setCurrentAlignment, getEditor, getSelectedImage, getSelectedImageParent, repositionOverlay]
	);

	return useMemo(
		() => ({
			overlayCoordinates,
			handleClickOnEditor,
			handleTextChangeOnEditor,
			handleScrollOnEditor,
			handleOverlayResize,
			handleOverlayResizeComplete,
			handleAlignmentChange,
			currentAlignment,
		}),
		[
			overlayCoordinates,
			handleClickOnEditor,
			handleTextChangeOnEditor,
			handleScrollOnEditor,
			handleOverlayResize,
			handleOverlayResizeComplete,
			handleAlignmentChange,
			currentAlignment,
		]
	);
};
