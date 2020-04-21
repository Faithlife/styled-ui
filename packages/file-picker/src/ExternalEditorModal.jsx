import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Box, LoadingSpinner } from '@faithlife/styled-ui';
import { Button, Modal } from '@faithlife/styled-ui/v6';

export const ExternalEditorModal = ({
	ExternalEditorComponent,
	accountId,
	isCreatingNewAsset,
	isOpen,
	title,
	model: modelProp,
	onCancel,
	onDone,
	onLoadModelForSaving,
	onSave,
}) => {
	const editorRef = useRef();
	const [model, setModel] = useState(modelProp);
	const [isModified, setIsModified] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		setIsModified(false);
		setModel(modelProp);
	}, [modelProp]);

	const handleChange = useCallback(
		model => {
			if (!isModified) {
				setIsModified(true);
			}
			setModel(model);
		},
		[isModified]
	);

	const handleSave = useCallback(async () => {
		if (!editorRef.current) {
			return;
		}
		setIsSaving(true);
		const { blob, metadata } = await onLoadModelForSaving(editorRef, model);
		onSave(blob, metadata)
			.then(() => {
				setIsSaving(false);
			})
			.catch(error => {
				// TODO: add error handling/messaging
				console.error(error);
				setIsSaving(false);
			});
	}, [model, onLoadModelForSaving, onSave]);

	return (
		<Modal isOpen={isOpen} onClose={onCancel} container="body" fullscreen>
			<Modal.Header
				textStyle="h.24"
				paddingBottom={5}
				title={title}
				actions={
					<Box
						display="grid"
						alignItems="center"
						gridAutoFlow="column"
						gridAutoColumns="min-content"
						gridGap={[3, 5]}
					>
						{isSaving && <LoadingSpinner small />}
						<Button variant="secondary" size={['medium', 'small']} minWidth={78} onClick={onCancel}>
							{'Cancel'}
						</Button>
						{isModified ? (
							<Button
								variant="primary"
								size={['medium', 'small']}
								minWidth={78}
								onClick={handleSave}
								disabled={isSaving}
							>
								{'Save'}
							</Button>
						) : (
							<Button variant="primary" size={['medium', 'small']} minWidth={78} onClick={onDone}>
								{'Done'}
							</Button>
						)}
					</Box>
				}
			/>
			<Modal.Content padding={0} borderTop={`1px solid`} borderColor="gray8">
				<ExternalEditorComponent
					model={model}
					onChange={handleChange}
					ref={editorRef}
					isCreatingNewAsset={isCreatingNewAsset}
					accountId={accountId}
				/>
			</Modal.Content>
		</Modal>
	);
};
