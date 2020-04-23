import React from 'react';
import { Modal } from '@faithlife/styled-ui/v6';
import { Tabs } from './Tabs';

export const FilePickerModal = ({ isOpen, onClose, title, children }) => (
	<Modal isOpen={isOpen} onClose={onClose} container="body" fullscreen>
		<Modal.Header title={title} textStyle="h.24" />
		<Modal.Content
			background="white"
			width="100%"
			height="100%"
			display="grid"
			gridTemplateRows="min-content 1fr"
			justifyContent="stretch"
			alignItems="stretch"
		>
			<Tabs>{children}</Tabs>
		</Modal.Content>
	</Modal>
);
