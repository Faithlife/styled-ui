import React from 'react';
import { TabManager, Tab, TabList, TabPanels, TabPanel } from '@faithlife/styled-ui';
import { Modal } from '@faithlife/styled-ui/v6';

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
			<TabManager>
				<TabList>
					{React.Children.map(children, tab => (
						<Tab paddingX={4}>{tab.props.title}</Tab>
					))}
				</TabList>
				<TabPanels display="grid">
					{React.Children.map(children, tab => (
						<TabPanel display="grid" padding={tab.props.padding || 0}>
							{React.cloneElement(tab)}
						</TabPanel>
					))}
				</TabPanels>
			</TabManager>
		</Modal.Content>
	</Modal>
);
