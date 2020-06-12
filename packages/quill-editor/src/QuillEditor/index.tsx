import React, {
	useCallback,
	useRef,
	useMemo,
	useEffect,
	useState,
	useImperativeHandle,
} from 'react';
import ReactQuill from 'react-quill';
import styled, { css } from 'styled-components';
import './styles.css';
import { LocalizationProvider } from '../components/Localization';
import localizedResources from '../locales/en-US/resources.json';
import { FilePickerModal } from '../components/FilePickerModal';
import { useImageControls } from '../utility/useImageControls';
import { ResizableOverlay } from '../components/ResizableOverlay';
import { throttle } from '../utility/throttle';
import ImageBlot from '../components/Blots/ImageBlot';
import { useImageDrop } from '../utility/useImageDrop';
import { SafeQuill, SafeReactQuill } from './SafeQuill';
import { convertDeltaToHtml } from '../utility/htmlUtility';
import { getShortcuts } from './shortcuts';

export interface IQuillRichTextEditorProps {
	groupId?: string;
	defaultValue?: any;
	value?: any;
	formats?: string[];
	toolbarHandlers?: { [key: string]: any };
	modules?: { [key: string]: any };
	placeholder?: string;
	onContentChange: (delta: any | null) => void;
	onClick?: (e: React.MouseEvent) => void;
	onBlur?: (previousRange?: any, source?: string, editor?: any) => void;
	className?: string;
	classNames?: string[];
	editorId?: string;
	onFocus?: (range?: any, source?: string, editor?: any) => void;
	onKeyDown?: () => void;
	onKeyPress?: () => void;
	onKeyUp?: () => void;
	onChangeSelection?: (range?: any, source?: string, editor?: any) => void;
	onImageUpload?: (file: File) => void;
	autofocus?: string;
	tabMode?: 'insert' | 'exit';
	disableImageControls?: boolean;
	htmlOptions?: { [key: string]: any };
	plainTextMode?: boolean;
	paragraphSpacing?: boolean;
	readOnly?: boolean;
	children?: React.ReactElement;
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

const ReactQuillStyled = styled(SafeReactQuill)`
	min-height: 32px;
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	position: relative;

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
		padding: 8px;
		flex: 1;
	}

	.ql-editor.nwse-resize > * {
		cursor: nwse-resize !important;
	}

	.ql-editor.nesw-resize > * {
		cursor: nesw-resize !important;
	}

	img {
		cursor: move;
	}

	.ql-image-wrap img {
		float: left;
		margin-right: 16px;
		margin-bottom: 8px;
	}

	.ql-align-right .ql-image-wrap img {
		float: right;
		margin-left: 16px;
	}
`;

const QuillContainer = styled.div<{ isEmpty: boolean; paragraphSpacing: boolean }>`
	display: flex;
	flex-direction: column;
	position: relative;

	border: 1px solid #a8a8a8;
	border-radius: 3px;
	box-sizing: border-box;

	${({ paragraphSpacing }) =>
		paragraphSpacing &&
		css`
			p {
				margin-bottom: 0;
				margin-top: 12px;
			}

			p:first-child {
				margin-top: 0;
			}

			p.ql-nomargin-active {
				margin-top: 0;
			}
		`}

	.ql-snow .ql-tooltip {
		z-index: 1;
	}

	.ql-snow .ql-tooltip[data-mode=link]::before {
		content: '${({ linkHelpText }) => linkHelpText}';
	}

	.ql-snow .ql-tooltip[data-mode=link] .ql-action::after {
		content: '${({ linkSaveText }) => linkSaveText}';
	}

	.ql-header .ql-picker-item {
		line-height: 1.4em;
	}

	${({ imageIsSelected }) =>
		imageIsSelected &&
		`img::selection {
			background: rgba(0, 0, 0, 0);
		}
	`}

	& [data-placeholder]:not(.ql-editor)::before {
		top: 7px;
		left: 6px;
	}

	& [data-placeholder]::before {
		position: absolute;
		font-style: normal;
		color: #a8a8a8;
		font-size: 16px;
		font-family: Source Sans Pro, sans-serif;
	}

	${({ isEmpty }) =>
		isEmpty &&
		css`
			& [data-placeholder]:not(.ql-container)::before {
				content: attr(data-placeholder);
			}
		`}
`;

const OverlayContainer = styled.div<{ hasToolbar: boolean }>`
	overflow: auto;
	position: absolute;
	left: 0;
	right: 0;
	top: ${({ hasToolbar }) => (hasToolbar ? '41px' : '0')};
	bottom: 0;
	pointer-events: none;
`;

if (SafeQuill) {
	const Parchment = SafeQuill.import('parchment');
	const ImageAlignClass = new Parchment.Attributor.Class('imageAlign', 'ql-image', {
		scope: Parchment.Scope.INLINE,
	});
	SafeQuill.register(ImageAlignClass);
	SafeQuill.register({ 'formats/faithlifeImage': ImageBlot });
	const NoMarginClass = new Parchment.Attributor.Class('nomargin', 'ql-nomargin', {
		scope: Parchment.Scope.BLOCK,
	});
	SafeQuill.register(NoMarginClass);
}

const QuillEditorCore: React.FunctionComponent<IQuillRichTextEditorProps> = (
	{
		groupId,
		defaultValue,
		value,
		formats,
		toolbarHandlers,
		modules,
		placeholder: initialPlaceholder,
		onContentChange,
		onChangeSelection,
		onClick,
		className,
		classNames,
		editorId,
		onImageUpload,
		autofocus,
		tabMode,
		disableImageControls,
		htmlOptions,
		plainTextMode,
		paragraphSpacing,
		readOnly,
		children,
		...otherProps
	},
	ref
) => {
	const quillRef = useRef<ReactQuill>(null);
	const quillContainerRef = useRef<HTMLDivElement>(null);
	const [showFilePicker, setShowFilePicker] = useState<boolean>(false);
	const [filePickerKind, setFilePickerKind] = useState(FilePickerKind.Image);
	const [storedValue, setStoredValue] = useState(value);
	const [allowImageLink, setAllowImageLink] = useState(false);
	const placeholder = initialPlaceholder ?? '';

	// hasMounted is an anti-pattern, used here only to workaround a bug in ReactQuill.
	// ReactQuill has a bug that will autofocus unless set to readOnly on initial render.
	// See https://github.com/zenoamaro/react-quill/issues/317
	const [hasMounted, setHasMounted] = useState<boolean>(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);

	const onlyChild: any = useMemo(() => children && React.Children.only(children), [children]);
	const hasOnlyChild = useMemo(() => !!onlyChild, [onlyChild]);

	const plainTextOverride = useMemo(
		() => plainTextMode && (defaultValue || value).replace(/\n/g, '<br/>'), // Newlines are not understood by quill when loading default value
		[defaultValue, plainTextMode, value]
	);

	const setContents = useCallback(
		contents => {
			const editor = quillRef.current && quillRef.current.getEditor();
			if (editor) {
				const preSelection = editor.getSelection();
				const preLength = editor.getLength();
				const preSelectionAtEnd =
					preSelection && preSelection.length === 0 && preSelection.index === preLength - 1;
				const shouldFocus = editor.hasFocus();

				if (contents.ops) {
					editor.setContents(contents, 'api');
				} else {
					if (plainTextMode) {
						editor.setText(contents, 'api');
					} else {
						editor.setContents(editor.clipboard.convert(contents), 'api');
					}
				}

				const postLength = editor.getLength();
				if (shouldFocus || preSelection) {
					setTimeout(() => {
						if (shouldFocus) {
							editor.focus();
							if (preSelectionAtEnd && postLength > 0) {
								editor.setSelection({
									index: postLength - 1,
									length: 0,
								});
							}
						}
					}, 0);
				}

				editor && setIsEmpty(editor.getLength() === 1);
			}
		},
		[plainTextMode]
	);

	const setText = useCallback(
		plainText => {
			if (plainText.ops) {
				throw new Error('Cannot call setText with a Delta');
			}
			setContents(plainText);
		},
		[setContents]
	);

	const [quillEditorId] = useState<any>(
		() =>
			editorId ||
			(hasOnlyChild &&
				`ql-${Math.random()
					.toString(36)
					.substring(7)}`)
	);

	const [quillEditorQuery] = useState(() => `.${quillEditorId}`);
	const [isEmpty, setIsEmpty] = useState(!(defaultValue || value));

	useEffect(() => {
		const editor = quillRef.current && quillRef.current.getEditor();
		if (!defaultValue && value !== null && (value !== storedValue || value === '') && editor) {
			setContents(value);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	useEffect(() => {
		if (quillRef.current) {
			quillRef.current.getEditor().root.dataset.placeholder = placeholder;
		}
	}, [placeholder]);

	useEffect(() => {
		if (quillContainerRef.current) {
			const elements = quillContainerRef.current.querySelectorAll('.ql-picker-label');
			elements.forEach(element => {
				element.removeAttribute('tabindex');
			});
		}

		if (quillRef.current) {
			const history = (quillRef.current.getEditor() as any).history;
			if (history) {
				history.clear(); // Don't allow undo of initial content insertion
			}

			if (autofocus) {
				quillRef.current.getEditor().focus();
				if (autofocus === 'end') {
					quillRef.current.getEditor().setSelection(quillRef.current.getEditor().getLength(), 0);
				}
			}
		}

		// Disable Firefox native image resizing
		document.execCommand('enableObjectResizing', false, 'false');

		if (htmlOptions?.format === 'inline' && paragraphSpacing) {
			console.warn(
				"QuillEditor: 'inline' html format is not compatible with the paragraphSpacing flag"
			);
		}
		if (plainTextMode && paragraphSpacing) {
			console.warn('QuillEditor: plainTextMode is not compatible with the paragraphSpacing flag');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		}
		setShowFilePicker(true);
	}, []);

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

							quillApi.insertText(insertLocation++, '\n', 'user');
							quillApi.insertEmbed(
								insertLocation++,
								'faithlifeImage',
								{ url: asset.file.url, width: imageWidth, imageAlign: '' },
								'user'
							);

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
		handleOverlayResize,
		handleOverlayResizeComplete,
		handleAlignmentChange,
		currentAlignment,
		updateImageFormat,
	} = useImageControls(quillEditorQuery, setAllowImageLink);

	const onEditorClick = useCallback(
		event => {
			handleClickOnEditor(event.target, quillRef.current);
		},
		[handleClickOnEditor]
	);

	const updateLinkButton = useCallback(() => {
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
			if ((selection && editorNode && !selection.isCollapsed) || allowImageLink) {
				linkNodes.forEach(link => link.removeAttribute('disabled'));
			} else {
				linkNodes.forEach(link => link.setAttribute('disabled', 'disabled'));
			}
		}
	}, [allowImageLink]);

	useEffect(() => {
		updateLinkButton();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allowImageLink]);

	const throttledSelectionChange = useCallback(throttle(updateLinkButton, 200), [allowImageLink]);

	const handleSelectionChange = useCallback(
		(...args) => {
			onChangeSelection && onChangeSelection(...args);
			throttledSelectionChange();
		},
		[onChangeSelection, throttledSelectionChange]
	);

	const handleTextChange = useCallback(
		(_, _1, source) => {
			if (!quillRef.current) {
				return;
			}
			const editor = quillRef.current.getEditor();
			let content = defaultValue;

			if (!content) {
				const deltaContent = editor.getContents();
				if (value && value.ops) {
					content = deltaContent;
				} else if (plainTextMode) {
					content = editor.getText().slice(0, -1);
				} else if (htmlOptions?.format === 'raw') {
					content = editor.root.innerHTML;
				} else {
					content = convertDeltaToHtml(deltaContent, htmlOptions);
				}
			}

			if (content) {
				setStoredValue(content);
			}

			if (source !== 'api' && onContentChange) {
				onContentChange(content);
			}

			handleTextChangeOnEditor();
			setIsEmpty(editor.getLength() === 1);
		},
		[defaultValue, onContentChange, handleTextChangeOnEditor, value, plainTextMode, htmlOptions]
	);

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

	const getHTML = useCallback(
		(options?: { [key: string]: any }) => {
			if (quillRef.current) {
				if (options?.format === 'inline' && paragraphSpacing) {
					console.warn(
						"QuillEditor: 'inline' html format is not compatible with the paragraphSpacing flag"
					);
				}
				const deltas = quillRef.current.getEditor().getContents();
				const finalOptions: any = { ...htmlOptions, ...options };
				if (finalOptions.format === 'raw') {
					return quillRef.current.getEditor().root.innerHTML;
				} else {
					return convertDeltaToHtml(deltas, finalOptions);
				}
			}
		},
		[htmlOptions, paragraphSpacing]
	);

	useImperativeHandle(
		ref,
		() => ({
			insertText,
			deleteText,
			getHTML,
			setText,
			setContents,
			getEditor: () => quillRef.current && quillRef.current.getEditor(),
		}),
		[insertText, deleteText, getHTML, setText, setContents]
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
			quillApi.deleteText(selection.index, selection.length, 'user');
			quillApi.insertText(selection.index, textToInsert, 'user');
			quillApi.setSelection({ index: selection.index + textToInsert.length, length: 0 });
		}
	}, []);

	// If handleClean updates, then quill re-renders the entire component
	// We avoid that by using a ref for the one method it needs
	const updateImageFormatRef = useRef(updateImageFormat);
	useEffect(() => {
		updateImageFormatRef.current = updateImageFormat;
	}, [updateImageFormat]);

	const handleClean = useCallback(() => {
		const getImages = blot => {
			if (blot.domNode.tagName === 'IMG') {
				return [blot];
			}
			return (
				(blot.children && blot.children.reduce((all, blot) => [...all, ...getImages(blot)], [])) ||
				[]
			);
		};
		if (quillRef.current) {
			const editor = quillRef.current.getEditor();
			const range = editor.getSelection();
			if (!range) {
				return;
			}

			if (range.length === 0) {
				updateImageFormatRef.current('imageAlign', '');
				updateImageFormatRef.current('link', false);
				const { width, ...otherFormats } = editor.getFormat();
				Object.keys(otherFormats).forEach(name => {
					editor.format(name, false, 'user');
				});
			} else {
				const lines = editor.getLines(range);
				const images = lines
					.reduce((all, line) => [...all, ...getImages(line)], [])
					.map(image => [image.offset(editor.scroll), image])
					.filter(
						([imageIndex]) => imageIndex >= range.index && imageIndex <= range.index + range.length
					);

				images.forEach(([_, image]) => {
					updateImageFormatRef.current('imageAlign', '', image.domNode);
					updateImageFormatRef.current('link', '', image.domNode);
				});

				images.concat([[range.index + range.length]]).reduce((last, [curr]) => {
					editor.removeFormat(last, curr - last, 'user');
					return curr + 1;
				}, range.index);
			}
		}
	}, []);

	const moduleConfiguration = useMemo(
		() => ({
			toolbar:
				quillEditorId && hasOnlyChild
					? {
							container: `#${quillEditorId}`,
							handlers: {
								insertTemplate,
								insertImage: imageHandler,
								textSnippet: textHandler,
								insertLink: handleLinkInsert,
								clean: handleClean,
								...toolbarHandlers,
							},
					  }
					: false,
			...modules,
			keyboard: {
				...((modules && modules.keyboard) || {}),
				bindings: {
					...(paragraphSpacing
						? {
								linebreak: {
									key: 13,
									shiftKey: true,
									handler: function(range) {
										const quillApi = quillRef.current && quillRef.current.getEditor();
										if (quillApi) {
											quillApi.insertText(range.index, '\n', 'user');
											const newBlock = quillApi.getLeaf(range.index + 1)[0].parent;
											const index = newBlock.offset(quillApi.scroll);
											const length = newBlock.length();
											quillApi.formatText(index, length, 'nomargin', 'active');

											// Now that we've inserted a line break, move the cursor forward
											quillApi.setSelection(range.index + 1, 'silent');
										}
									},
								},
								realbreak: {
									key: 13,
									handler: function(range) {
										const quillApi = quillRef.current && quillRef.current.getEditor();
										if (quillApi) {
											quillApi.insertText(range.index, '\n', 'user');
											const newBlock = quillApi.getLeaf(range.index + 1)[0].parent;
											const index = newBlock.offset(quillApi.scroll);
											const length = newBlock.length();
											if (newBlock.attributes.attributes.nomargin) {
												quillApi.formatText(index, length, 'nomargin', false);
											}
											// Now that we've inserted a line break, move the cursor forward
											quillApi.setSelection(range.index + 1, 'silent');
										}
									},
								},
						  }
						: {}),
					...(tabMode === 'insert' ? {} : { tab: false }),
					...getShortcuts(quillRef),
					...((modules && modules.keyboard && modules.keyboard.bindings) || {}),
				},
			},
			clipboard: { matchVisual: false, ...((modules && modules.clipboard) || {}) },
		}),
		[
			quillEditorId,
			hasOnlyChild,
			insertTemplate,
			imageHandler,
			textHandler,
			handleLinkInsert,
			handleClean,
			toolbarHandlers,
			modules,
			paragraphSpacing,
			tabMode,
		]
	);

	const allowedFormats = plainTextMode
		? []
		: formats || [
				'header',
				'bold',
				'italic',
				'underline',
				'strike',
				'blockquote',
				'list',
				'indent',
				'link',
				'image',
				'faithlifeImage',
				'width',
				'align',
				'imageAlign',
				'nomargin',
		  ];

	const [placeholderDiv] = useState(() => <div data-placeholder={placeholder} />);

	const setToolbarRef = useCallback(
		ref => {
			if (ref) {
				ref.id = quillEditorId;
			}
		},
		[quillEditorId]
	);

	return (
		<LocalizationProvider localizedResources={localizedResources}>
			<QuillContainer
				ref={quillContainerRef}
				onClick={onClick}
				onScroll={handleScrollOnEditor}
				className={[...(classNames || []), className, quillEditorId]}
				linkHelpText={localizedResources.toolbar.enterLink}
				linkSaveText={localizedResources.toolbar.save}
				imageIsSelected={!!overlayCoordinates}
				isEmpty={isEmpty}
				paragraphSpacing={paragraphSpacing}
			>
				{hasOnlyChild &&
					React.cloneElement(onlyChild, {
						...onlyChild.props,
						editorId: onlyChild.props.editorId || quillEditorId,
						ref: setToolbarRef,
					})}
				<ReactQuillStyled
					ref={quillRef}
					defaultValue={plainTextOverride || defaultValue || value}
					placeholder={placeholder}
					modules={moduleConfiguration}
					formats={allowedFormats}
					bounds={quillEditorQuery}
					onChange={handleTextChange}
					onChangeSelection={handleSelectionChange}
					// ReactQuill has a bug that will autofocus unless set to readOnly on initial render.
					// See https://github.com/zenoamaro/react-quill/issues/317
					// We still want to allow normal autofocus behavior if the autofocus prop is set.
					readOnly={readOnly || (!hasMounted && !autofocus)}
					{...otherProps}
				>
					{placeholderDiv}
				</ReactQuillStyled>
				<OverlayContainer hasToolbar={!!moduleConfiguration.toolbar}>
					{overlayCoordinates && (
						<ResizableOverlay
							onOverlayResizeComplete={handleOverlayResizeComplete}
							onOverlayResize={handleOverlayResize}
							top={overlayCoordinates.top}
							left={overlayCoordinates.left}
							initialWidth={overlayCoordinates.width}
							initialHeight={overlayCoordinates.height}
							quillEditorQuery={quillEditorQuery}
							currentAlignment={currentAlignment}
							onAlignmentChange={handleAlignmentChange}
							disableImageControls={disableImageControls}
						/>
					)}
				</OverlayContainer>
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
