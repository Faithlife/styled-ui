import React from 'react';
import {
	FilePicker as FilePickerProvider,
	TabManager,
	Tab,
	TabList,
	TabPanels,
	TabPanel,
} from '@faithlife/styled-ui';
import { Modal } from '@faithlife/styled-ui/v6';

export const FilePicker = ({ children, title, isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} container="body" fullscreen>
			<Modal.Header title={title} textStyle="h.24" />
			<Modal.Content>
				<FilePickerProvider>
					<TabManager>
						<TabList>
							{React.Children.map(children, tab => (
								<Tab paddingX={4}>{tab.props.title}</Tab>
							))}
						</TabList>
						<TabPanels display="grid">
							{React.Children.map(children, tab => (
								<TabPanel display="grid" padding={tab.props.padding || 0}>
									{React.cloneElement(tab, { title: null })}
								</TabPanel>
							))}
						</TabPanels>
					</TabManager>
				</FilePickerProvider>
			</Modal.Content>
		</Modal>
	);
};
