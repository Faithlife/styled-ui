import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div.attrs(({ left, top, width, height }: IOverlayCoordinates) => ({
	style: {
		left: `${left}px`,
		top: `${top}px`,
		width: `${width}px`,
		height: `${height}px`,
	},
}))<IOverlayCoordinates>`
	position: absolute;
	border: 1px solid #278ed4;
	outline: none;
`;

interface IHandleProps {
	cursorStyle: string;
	location: {
		top?: number;
		right?: number;
		bottom?: number;
		left?: number;
	};
}

const DragHandle = styled.div.attrs(({ location, cursorStyle }: IHandleProps) => ({
	style: {
		top: location.top && `${location.top}px`,
		right: location.right && `${location.right}px`,
		bottom: location.bottom && `${location.bottom}px`,
		left: location.left && `${location.left}px`,
		cursor: cursorStyle,
	},
}))<IHandleProps>`
	position: absolute;
	height: 8px;
	width: 8px;
	background-color: #278ed4;
`;

export interface IOverlayCoordinates {
	left: number;
	top: number;
	width: number;
	height: number;
}

export interface IOverlayDimensions {
	width: number;
	height: number;
}

interface IResizableOverlayProps {
	onOverlayResizeComplete: () => void;
	onOverlayResize: (dimensions: IOverlayDimensions) => void;
	onWheel: (event: React.WheelEvent) => void;
	onKeyUp: (event: KeyboardEvent) => void;
	top: number;
	left: number;
	initialWidth: number;
	initialHeight: number;
	quillEditorQuery: string;
}

// prevent scrolling on document body when hovering overlay
// react onWheel is passive so cannot prevent default in onWheel hander within component
const preventMousewheel = event => event.preventDefault();

const handleOffsetPixels = -4;
const minimumOverlayWidthPixels = 10;

export const ResizableOverlay: React.FunctionComponent<IResizableOverlayProps> = ({
	onOverlayResizeComplete,
	onOverlayResize,
	onWheel,
	onKeyUp,
	top,
	left,
	initialWidth,
	initialHeight,
	quillEditorQuery,
}) => {
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [overlayCoordinates, setOverlayCoordinates] = useState<IOverlayCoordinates>({
		top,
		left,
		width: initialWidth,
		height: initialHeight,
	});
	useEffect(() => {
		// prop change doesn't impact overlay width and height while in-process of resizing
		// top and left may change while resizing (e.g. image needs to move to new line), so these props should always impact overlay position, even while resizing
		setOverlayCoordinates(currentState => ({
			top,
			left,
			width: isMouseDown ? currentState.width : initialWidth,
			height: isMouseDown ? currentState.height : initialHeight,
		}));
	}, [initialHeight, initialWidth, isMouseDown, left, top]);

	const overlayRef = useRef<any>();
	const mouseDownRef = useRef<any>();

	const setResizeCursor = value => {
		document.body.style.cursor = value;
		const container = overlayRef.current && overlayRef.current.closest(quillEditorQuery);
		const editor = container && container.querySelector('.ql-editor');
		if (editor && value === '') {
			editor.classList.remove('nwse-resize');
			editor.classList.remove('nesw-resize');
		} else if (editor) {
			editor.classList.add(value);
		}
	};

	const handleMousedown = useCallback(
		(
			event: React.MouseEvent,
			dragHandleSide: 'right' | 'left',
			direction: 'nw' | 'ne' | 'se' | 'sw'
		) => {
			// avoid triggering native quill image drag and drop while resizing
			event.preventDefault();
			mouseDownRef.current = {
				dragStartX: event.clientX,
				dragHandleSide,
				initialWidth: overlayCoordinates.width,
				initialHeight: overlayCoordinates.height,
			};
			setIsMouseDown(true);
			setResizeCursor(direction === 'nw' || direction === 'se' ? 'nwse-resize' : 'nesw-resize');
		},
		[overlayCoordinates.height, overlayCoordinates.width]
	);

	const setAndReportOverlayDimensions = useCallback(
		(dimensions: IOverlayDimensions) => {
			setOverlayCoordinates(currentState => ({
				...currentState,
				width: dimensions.width,
				height: dimensions.height,
			}));
			onOverlayResize(dimensions);
		},
		[onOverlayResize]
	);

	const handleDrag = useCallback(
		event => {
			if (isMouseDown && mouseDownRef.current) {
				const { dragStartX, dragHandleSide, initialWidth, initialHeight } = mouseDownRef.current;
				const deltaX = event.clientX - (dragStartX || 0);
				const newWidth =
					dragHandleSide === 'left'
						? Math.max(Math.round(initialWidth - deltaX), minimumOverlayWidthPixels)
						: Math.max(Math.round(initialWidth + deltaX), minimumOverlayWidthPixels);
				const percentWidthChange = newWidth / initialWidth;
				const newHeight = initialHeight * percentWidthChange;
				setAndReportOverlayDimensions({
					width: newWidth,
					height: newHeight,
				});
			}
		},
		[isMouseDown, setAndReportOverlayDimensions]
	);

	const handleMouseup = useCallback(() => {
		setIsMouseDown(false);
		onOverlayResizeComplete();
		setResizeCursor('');
	}, [onOverlayResizeComplete]);

	useEffect(() => {
		const overlayElement = overlayRef.current;
		if (overlayElement && onWheel) {
			overlayElement.addEventListener('mousewheel', preventMousewheel, false);
		}
		document.body.addEventListener('mousemove', handleDrag, false);
		document.body.addEventListener('mouseup', handleMouseup, false);
		document.body.addEventListener('keyup', onKeyUp, false);
		return () => {
			if (overlayElement) {
				overlayElement.removeEventListener('mousewheel', preventMousewheel, false);
			}
			document.body.removeEventListener('mousemove', handleDrag, false);
			document.body.removeEventListener('mouseup', handleMouseup, false);
			document.body.removeEventListener('keyup', onKeyUp, false);
		};
	}, [handleDrag, handleMouseup, onKeyUp, onWheel]);

	const handleMouseDownOnNWHandle = useCallback(
		(e: React.MouseEvent) => handleMousedown(e, 'left', 'nw'),
		[handleMousedown]
	);
	const handleMouseDownOnNEHandle = useCallback(
		(e: React.MouseEvent) => handleMousedown(e, 'right', 'ne'),
		[handleMousedown]
	);
	const handleMouseDownOnSEHandle = useCallback(
		(e: React.MouseEvent) => handleMousedown(e, 'right', 'se'),
		[handleMousedown]
	);
	const handleMouseDownOnSWHandle = useCallback(
		(e: React.MouseEvent) => handleMousedown(e, 'left', 'sw'),
		[handleMousedown]
	);

	return (
		<Overlay
			ref={overlayRef}
			onWheel={onWheel}
			left={overlayCoordinates.left}
			top={overlayCoordinates.top}
			width={overlayCoordinates.width}
			height={overlayCoordinates.height}
		>
			<DragHandle
				cursorStyle={'nwse-resize'}
				location={{ left: handleOffsetPixels, top: handleOffsetPixels }}
				onMouseDown={handleMouseDownOnNWHandle}
			/>
			<DragHandle
				cursorStyle={'nesw-resize'}
				location={{ right: handleOffsetPixels, top: handleOffsetPixels }}
				onMouseDown={handleMouseDownOnNEHandle}
			/>
			<DragHandle
				cursorStyle={'nwse-resize'}
				location={{ right: handleOffsetPixels, bottom: handleOffsetPixels }}
				onMouseDown={handleMouseDownOnSEHandle}
			/>
			<DragHandle
				cursorStyle={'nesw-resize'}
				location={{ left: handleOffsetPixels, bottom: handleOffsetPixels }}
				onMouseDown={handleMouseDownOnSWHandle}
			/>
		</Overlay>
	);
};
