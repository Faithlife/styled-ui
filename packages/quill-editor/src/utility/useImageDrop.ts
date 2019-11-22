import { useCallback } from 'react';
const editorMaxContentWidthPixels = 495;

export const useImageDrop = (quillRef, onImageUpload) => {
	const insert = useCallback(
		(file, imageSrc) => {
			const editor = quillRef.current && quillRef.current.getEditor();
			const index = (editor.getSelection() || {}).index || editor.getLength();

			const originalWidth = file.dimensions && file.dimensions.width;
			const imageWidth = originalWidth
				? `${Math.min(editorMaxContentWidthPixels, originalWidth)}px`
				: `${editorMaxContentWidthPixels}px`;

			editor.insertEmbed(
				index,
				'image',
				{ file, url: imageSrc, width: imageWidth, align: '' },
				'user'
			);
		},
		[quillRef]
	);

	const readFiles = useCallback(
		files => {
			[...files].forEach(file => {
				if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
					return;
				}

				const reader = new FileReader();
				reader.onload = evt => {
					insert(file, evt.target && evt.target.result);
				};

				const blob = file.getAsFile ? file.getAsFile() : file;
				if (blob instanceof Blob) {
					reader.readAsDataURL(blob);
				}

				onImageUpload && onImageUpload(file);
			});
		},
		[onImageUpload, insert]
	);

	return useCallback(
		dropEvent => {
			if (
				dropEvent.dataTransfer &&
				dropEvent.dataTransfer.files &&
				dropEvent.dataTransfer.files.length
			) {
				dropEvent.preventDefault();
				if (document.caretRangeFromPoint) {
					const selection = document.getSelection();
					const range = document.caretRangeFromPoint(dropEvent.clientX, dropEvent.clientY);
					if (selection && range) {
						selection.setBaseAndExtent(
							range.startContainer,
							range.startOffset,
							range.startContainer,
							range.startOffset
						);
					}
				}
				readFiles(dropEvent.dataTransfer.files);
			}
		},
		[readFiles]
	);
};
