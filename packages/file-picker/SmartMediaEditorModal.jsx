import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
	SmartMediaEditor,
	smartMediaToolbarFeatures,
	fetchFontFamilies,
	SmartMediaEditorProvider,
} from '@faithlife/smart-media-editor';
import localizedResources from '@faithlife/smart-media-editor/dist/locales/en-US/resources.json';
import { Modal } from '@faithlife/styled-ui/v6';

const undesiredFeatures = ['background', 'bold', 'italic'];

const toolbarFeatures = smartMediaToolbarFeatures.filter(
	feature => !undesiredFeatures.includes(feature)
);

export const SmartMediaEditorModal = ({ isOpen, title, model: modelProp, onCancel, onSaved }) => {
	const editorRef = useRef();
	const handleSave = useCallback(async () => {
		if (!editorRef.current) {
			return;
		}
		const blob = await editorRef.current.getImageData();
		const url = URL.createObjectURL(blob);
		onSaved(url);
	}, [onSaved]);
	const [model, setModel] = useState(modelProp);
	useEffect(() => {
		setModel(modelProp);
	}, [modelProp]);

	return (
		<Modal isOpen={isOpen} onClose={onCancel} container="body" fullscreen>
			<Modal.Header title={title} textStyle={'h.24'} paddingBottom={5} />
			<Modal.Content padding={0} borderTop={`1px solid`} borderColor="gray8">
				<SmartMediaEditorProvider
					fetchFontFamilies={fetchFontFamilies}
					localizedResources={localizedResources}
				>
					<SmartMediaEditor
						ref={editorRef}
						model={model}
						onChange={setModel}
						toolbarFeatures={toolbarFeatures}
					/>
				</SmartMediaEditorProvider>
			</Modal.Content>
			<Modal.Footer>
				<Modal.FooterButtons
					commitButton={{ text: 'Save', onClick: handleSave }}
					cancelButton={{ text: 'Cancel', onClick: onCancel }}
				/>
			</Modal.Footer>
		</Modal>
	);
};
