import React, {
	useCallback,
	useRef,
	useMemo,
	useEffect,
	useState,
	useImperativeHandle,
} from 'react';
import ReactQuill from 'react-quill';
import Quill, { Delta } from 'quill';
import styled from 'styled-components';
import './styles.css';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { LocalizationProvider } from '../components/Localization';
import localizedResources from '../locales/en-US/resources.json';
import { FilePickerModal } from '../components/FilePickerModal';
import { useImageControls } from '../utility/useImageControls';
import { ResizableOverlay } from '../components/ResizableOverlay';
import { throttle } from '../utility/throttle';
import ImageBlot from '../components/Blots/ImageBlot';
import { useImageDrop } from '../utility/useImageDrop';

export interface IQuillRichTextEditorProps {
	groupId?: string;
	defaultValue?: Delta;
	value?: Delta;
	formats?: string[];
	toolbarHandlers?: { [key: string]: any };
	modules?: { [key: string]: any };
	placeholder?: string;
	onContentChange: (delta: Delta | null) => void;
	onClick?: (e: React.MouseEvent) => void;
	onBlur?: () => void;
	className?: string;
	editorId?: string;
	onFocus?: () => void;
	onKeyDown?: () => void;
	onKeyPress?: () => void;
	onKeyUp?: () => void;
	onChangeSelection?: () => void;
	onImageUpload?: (file: File) => void;
}

export interface IQuillContainerProps {
	linkHelpText?: string;
	linkSaveText?: string;
}

export enum FilePickerKind {
	Image = 'image',
	Text = 'text',
}

type Source = 'user' | 'api' | 'silent';

const ReactQuillStyled = styled(ReactQuill)`
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;

	.ql-container.ql-snow {
		border: none;

		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
		overflow: auto;
	}

	.ql-editor {
		font-family: Source Sans Pro;
		font-size: 16px;
		line-height: normal;

		flex: 1;
	}

	.ql-editor.nwse-resize > * {
		cursor: nwse-resize !important;
	}

	.ql-editor.nesw-resize > * {
		cursor: nesw-resize !important;
	}

	// Placeholder styling
	.ql-editor.ql-blank::before {
		font-style: normal;
		color: #a8a8a8;
	}

	.ql-snow .ql-tooltip[data-mode=link]::before {
		content: '${({ linkHelpText }) => linkHelpText}';
	}

	.ql-snow .ql-tooltip[data-mode=link] .ql-action::after {
		content: '${({ linkSaveText }) => linkSaveText}';
	}

	img {
		cursor: move;
	}

	img[align="left"] {
		margin-right: 16px;
		margin-bottom: 8px;
	}
`;

const QuillContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;

	border: 1px solid #a8a8a8;
	border-radius: 3px;
	box-sizing: border-box;
`;

const QuillEditorCore: React.FunctionComponent<IQuillRichTextEditorProps> = (
	{
		groupId,
		defaultValue,
		value,
		formats,
		toolbarHandlers,
		modules,
		placeholder,
		onContentChange,
		onClick,
		onBlur,
		className,
		editorId,
		onImageUpload,
		children,
		...otherProps
	},
	ref
) => {
	const quillRef = useRef<ReactQuill>(null);
	const quillContainerRef = useRef<any>(null);
	const [showFilePicker, setShowFilePicker] = useState<boolean>(false);
	const [filePickerKind, setFilePickerKind] = useState(FilePickerKind.Image);
	const [storedValue, setStoredValue] = useState(value);

	const [quillEditorId] = useState(
		() =>
			editorId ||
			`ql-${Math.random()
				.toString(36)
				.substring(7)}`
	);

	const [quillEditorQuery] = useState(() => `.${quillEditorId}`);

	useEffect(() => {
		if (!defaultValue && value && value !== storedValue && quillRef.current) {
			quillRef.current.getEditor().setContents(value, 'user');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		const elements = quillContainerRef.current.querySelectorAll('.ql-picker-label');
		elements.forEach(element => {
			element.removeAttribute('tabindex');
		});

		if (quillRef.current) {
			const history = (quillRef.current.getEditor() as any).history;
			if (history) {
				history.clear(); // Don't allow undo of initial content insertion
			}
		}

		Quill.register({ 'formats/image': ImageBlot });
	}, []);

	const [imageInsertRange, setImageInsertRange] = useState<{
		index: number;
		length: number;
	} | null>();

	const openFilePicker = useCallback(() => {
		if (quillRef.current) {
			const quillApi = quillRef.current.getEditor();
			const range = quillApi.getSelection();
			setImageInsertRange(range ? range : null);
			quillRef.current.blur();
			onBlur && onBlur();
		}
		setShowFilePicker(true);
	}, [onBlur]);

	const insertFile = useCallback(
		async data => {
			const { assets } = data;
			const editorMaxContentWidthPixels = 495;

			if (quillRef.current) {
				const quillApi = quillRef.current.getEditor();
				let insertLocation = (imageInsertRange && imageInsertRange.index) || 0;
				if (imageInsertRange && imageInsertRange.length) {
					quillApi.deleteText(imageInsertRange.index, imageInsertRange.length);
				}
				assets.forEach(async asset => {
					switch (asset.kind) {
						case 'image': {
							// todo: optimize link based on size (e.g. HTML width) of embedded image
							// various formats are available at asset.formats, with dimensions of format at asset.formats[x].file.dimensions
							const originalWidth =
								asset.file && asset.file.dimensions && asset.file.dimensions.width;
							const imageWidth = originalWidth
								? `${Math.min(editorMaxContentWidthPixels, originalWidth)}px`
								: `${editorMaxContentWidthPixels}px`;

							quillApi.insertEmbed(
								insertLocation,
								'image',
								{ url: asset.file.url, width: imageWidth, align: '' },
								'user'
							);

							insertLocation++;
							quillApi.setSelection({ index: insertLocation, length: 0 });
							break;
						}
						case 'word':
						case 'text': {
							const htmlFormat = asset.formats.find(
								format => format.firstFile && format.firstFile.mediaType === 'text/html'
							);
							const plaintextFormat = asset.formats.find(
								format => format.firstFile && format.firstFile.mediaType === 'text/plain'
							);
							const format = htmlFormat || plaintextFormat;
							const fileUrl =
								(format && format.file && format.file.url) ||
								(format.firstFile && format.firstFile.url);
							if (fileUrl) {
								const response = await fetch(fileUrl);
								const content = await response.text();
								quillApi.clipboard.dangerouslyPasteHTML(insertLocation, content);
							}
							break;
						}
						default: {
							if (imageInsertRange) {
								if (imageInsertRange.length === 0) {
									quillApi.insertText(
										imageInsertRange.index,
										asset.file.name,
										'link',
										asset.file.linkUri
									);
									quillApi.setSelection(imageInsertRange.index, asset.file.name.length);
								} else {
									quillApi.formatText(
										imageInsertRange.index,
										imageInsertRange.length,
										'link',
										asset.file.linkUri
									);
								}
								quillApi.format('download', asset.file.name);
							}
						}
					}
					setShowFilePicker(false);
				});
			}
		},
		[imageInsertRange]
	);

	const closeFilePicker = useCallback(() => {
		setShowFilePicker(false);
		if (quillRef.current) {
			quillRef.current.focus();
		}
	}, []);

	const {
		overlayCoordinates,
		handleClickOnEditor,
		handleTextChangeOnEditor,
		handleScrollOnEditor,
		handleKeyUpOnBody,
		handleMouseWheelOnOverlay,
		handleOverlayResize,
		handleOverlayResizeComplete,
		handleAlignmentChange,
		currentAlignment,
	} = useImageControls(quillEditorQuery);

	const onEditorClick = useCallback(
		event => {
			handleClickOnEditor(event.target, quillRef.current);
		},
		[handleClickOnEditor]
	);

	const handleSelectionChange = useCallback(
		throttle(() => {
			if (quillContainerRef.current) {
				const selection = window.getSelection();
				const textNodeType = 3;
				const childNode: any =
					selection &&
					selection.focusNode &&
					((selection.focusNode.nodeType === textNodeType && selection.focusNode.parentElement) ||
						selection.focusNode);
				const editorNode: any = childNode && childNode.closest && childNode.closest('.ql-editor');
				const linkNodes = quillContainerRef.current.querySelectorAll('.ql-insertLink');
				if (selection && editorNode && !selection.isCollapsed) {
					linkNodes.forEach(link => link.removeAttribute('disabled'));
				} else {
					linkNodes.forEach(link => link.setAttribute('disabled', 'disabled'));
				}
			}
		}, 200),
		[]
	);

	useEffect(() => {
		document.addEventListener('selectionchange', handleSelectionChange);
		return () => {
			document.removeEventListener('selectionchange', handleSelectionChange);
		};
	}, [handleSelectionChange]);

	const handleTextChange = useCallback(() => {
		const content =
			defaultValue || (quillRef.current && quillRef.current.getEditor().getContents());
		if (content) {
			setStoredValue(content);
		}
		onContentChange && onContentChange(content);
		handleTextChangeOnEditor();
	}, [handleTextChangeOnEditor, onContentChange, defaultValue]);

	useEffect(() => {
		let editor;
		if (quillRef.current) {
			editor = quillRef.current.getEditor();
			if (editor) {
				editor.on('text-change', handleTextChange);
			}
		}
		return () => editor && editor.off('text-change', handleTextChange);
	}, [handleTextChange]);

	useEffect(() => {
		let editorElement;
		if (quillContainerRef.current) {
			editorElement = quillContainerRef.current.querySelector('.ql-editor');
			if (editorElement) {
				editorElement.addEventListener('click', onEditorClick);
			}
		}
		return () => editorElement && editorElement.removeEventListener('click', onEditorClick);
	}, [onEditorClick]);

	const handleImageDrop = useImageDrop(quillRef, onImageUpload);
	useEffect(() => {
		const editorElement = quillRef.current && quillRef.current.getEditor().root;
		editorElement && editorElement.addEventListener('drop', handleImageDrop);
		return () =>
			(editorElement && editorElement.removeEventListener('drop', handleImageDrop)) || undefined;
	}, [handleImageDrop]);

	const insertText = useCallback(
		(text: string, start?: number, end?: number, source: Source = 'user') => {
			if (quillRef.current) {
				const quillApi = quillRef.current.getEditor();
				const selection = quillApi.getSelection(true);
				const from = start || selection.index;
				const to = end || start || selection.index + selection.length;

				quillApi.deleteText(from, to - from, source);
				quillApi.insertText(from, text, source);
				quillApi.setSelection(from + text.length, 0, source);
			}
		},
		[]
	);

	const deleteText = useCallback((start?: number, end?: number, source: Source = 'user') => {
		if (quillRef.current) {
			const quillApi = quillRef.current.getEditor();
			const selection = quillApi.getSelection(true);
			const from = start || selection.index;
			const to = end || start || selection.index + selection.length;

			quillApi.deleteText(from, to - from, source);
		}
	}, []);

	const getHTML = useCallback((options: any) => {
		if (quillRef.current) {
			const deltas = quillRef.current.getEditor().getContents();
			if (deltas.ops) {
				const converter = new QuillDeltaToHtmlConverter(deltas.ops, options);
				const html = converter.convert();
				return html;
			}
		}
	}, []);

	useImperativeHandle(
		ref,
		() => ({
			insertText,
			deleteText,
			getHTML,
			getEditor: () => quillRef.current && quillRef.current.getEditor(),
		}),
		[insertText, deleteText, getHTML]
	);

	const handleLinkInsert = useCallback(function(this: any) {
		const tooltip = this.quill.theme.tooltip;
		tooltip.textbox.dataset.link = 'https://example.com';
		tooltip.edit('link', '');
	}, []);

	const imageHandler = useCallback(() => {
		setFilePickerKind(FilePickerKind.Image);
		openFilePicker();
	}, [openFilePicker]);

	const textHandler = useCallback(() => {
		setFilePickerKind(FilePickerKind.Text);
		openFilePicker();
	}, [openFilePicker]);

	const insertTemplate = useCallback((textToInsert: string) => {
		if (quillRef.current) {
			const quillApi = quillRef.current.getEditor();
			const selection = quillApi.getSelection(true);
			quillApi.deleteText(selection.index, selection.length);
			quillApi.insertText(selection.index, textToInsert);
		}
	}, []);

	const moduleConfiguration = useMemo(
		() => ({
			toolbar: editorId
				? {
						container: `#${quillEditorId}`,
						handlers: {
							insertTemplate,
							insertImage: imageHandler,
							textSnippet: textHandler,
							insertLink: handleLinkInsert,
							...toolbarHandlers,
						},
				  }
				: false,
			keyboard: { bindings: { tab: false } },
			clipboard: { matchVisual: false },
			...modules,
		}),
		[
			insertTemplate,
			imageHandler,
			textHandler,
			handleLinkInsert,
			editorId,
			modules,
			quillEditorId,
			toolbarHandlers,
		]
	);

	const allowedFormats = formats || [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'indent',
		'align',
		'link',
		'image',
		'width',
		'align',
	];

	return (
		<LocalizationProvider localizedResources={localizedResources}>
			<QuillContainer
				ref={quillContainerRef}
				onClick={onClick}
				onScroll={handleScrollOnEditor}
				className={[className, quillEditorId]}
			>
				{children}
				<ReactQuillStyled
					ref={quillRef}
					linkHelpText={localizedResources.toolbar.enterLink}
					linkSaveText={localizedResources.toolbar.save}
					defaultValue={defaultValue || value}
					placeholder={placeholder}
					modules={moduleConfiguration}
					formats={allowedFormats}
					bounds={quillEditorQuery}
					onBlur={onBlur}
					{...otherProps}
				/>
				{overlayCoordinates && (
					<ResizableOverlay
						onOverlayResizeComplete={handleOverlayResizeComplete}
						onOverlayResize={handleOverlayResize}
						onWheel={handleMouseWheelOnOverlay}
						onKeyUp={handleKeyUpOnBody}
						top={overlayCoordinates.top}
						left={overlayCoordinates.left}
						initialWidth={overlayCoordinates.width}
						initialHeight={overlayCoordinates.height}
						quillEditorQuery={quillEditorQuery}
						currentAlignment={currentAlignment}
						onAlignmentChange={handleAlignmentChange}
					/>
				)}
				<FilePickerModal
					showFilePicker={showFilePicker}
					insertFile={insertFile}
					closeFilePicker={closeFilePicker}
					groupId={groupId}
					pickerKind={filePickerKind}
				/>
			</QuillContainer>
		</LocalizationProvider>
	);
};

export const QuillEditor = React.forwardRef(QuillEditorCore);
