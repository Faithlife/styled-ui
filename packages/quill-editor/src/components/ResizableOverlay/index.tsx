import React, { useRef, useEffect, useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocalization } from '../Localization';

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
	pointer-events: all;
`;

const AlignmentControls = styled.div<{ top: number }>`
	position: absolute;
	padding: 5px;
	white-space: nowrap;
	background-color: white;
	border: 1px solid #d4d0cf;
	top: ${({ top }) => top + 8}px;
	pointer-events: all;
`;

const AlignmentButton = styled.a<{ isActive: boolean }>`
	${({ isActive }) =>
		isActive
			? css`
					color: #585250;
					cursor: default;
					font-weight: 700;
					&:hover {
						color: #585250;
					}
			  `
			: css`
					cursor: pointer;
					color: #1e91d6;
					&:hover {
						text-decoration: underline;
					}
			  `}
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
	top: number;
	left: number;
	initialWidth: number;
	initialHeight: number;
	quillEditorQuery: string;
	currentAlignment: string;
	onAlignmentChange: (alignment: string) => void;
}

const handleOffsetPixels = -4;
const minimumOverlayWidthPixels = 10;

export const ResizableOverlay: React.FunctionComponent<IResizableOverlayProps> = ({
	onOverlayResizeComplete,
	onOverlayResize,
	top,
	left,
	initialWidth,
	initialHeight,
	quillEditorQuery,
	currentAlignment,
	onAlignmentChange,
}) => {
	const res = useLocalization();

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

	const setResizeCursor = useCallback(
		value => {
			document.body.style.cursor = value;
			const container = overlayRef.current && overlayRef.current.closest(quillEditorQuery);
			const editor = container && container.querySelector('.ql-editor');
			if (editor && value === '') {
				editor.classList.remove('nwse-resize');
				editor.classList.remove('nesw-resize');
			} else if (editor) {
				editor.classList.add(value);
			}
		},
		[quillEditorQuery]
	);

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
		[overlayCoordinates.height, overlayCoordinates.width, setResizeCursor]
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
	}, [onOverlayResizeComplete, setResizeCursor]);

	useEffect(() => {
		document.body.addEventListener('mousemove', handleDrag, false);
		document.body.addEventListener('mouseup', handleMouseup, false);
		return () => {
			document.body.removeEventListener('mousemove', handleDrag, false);
			document.body.removeEventListener('mouseup', handleMouseup, false);
		};
	}, [handleDrag, handleMouseup]);

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

	const alignInline = useCallback(() => {
		onAlignmentChange('');
	}, [onAlignmentChange]);

	const alignWrap = useCallback(() => {
		onAlignmentChange('wrap');
	}, [onAlignmentChange]);

	return (
		<Overlay
			ref={overlayRef}
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
			<AlignmentControls top={overlayCoordinates.height}>
				<AlignmentButton
					isActive={currentAlignment === ''}
					disabled={currentAlignment === ''}
					minorTransparent
					onClick={alignInline}
				>
					{res.image.inline}
				</AlignmentButton>
				{' | '}
				<AlignmentButton
					isActive={currentAlignment === 'wrap'}
					disabled={currentAlignment === 'wrap'}
					minorTransparent
					onClick={alignWrap}
				>
					{res.image.wordWrap}
				</AlignmentButton>
			</AlignmentControls>
		</Overlay>
	);
};
