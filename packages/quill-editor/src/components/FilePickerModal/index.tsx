import React from 'react';
import styled from 'styled-components';
import {
	FilePicker,
	AmberContent,
	TabManager,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@faithlife/styled-ui';
import { Modal } from '@faithlife/styled-ui/v6';
import { useIsInternal } from '../../utility/useIsInternal';
import { useLocalization } from '../Localization';
import { FilePickerKind } from '../../QuillEditor';

interface IFilePickerModalProps {
	showFilePicker: boolean;
	insertFile: (files: any[]) => void;
	closeFilePicker: () => void;
	groupId?: string;
	pickerKind: FilePickerKind;
}

const TabSpace = styled.span`
	width: 8px;
	order: -1;
`;

const stockImagesAmberAccount = 6817140;
const unsplashAmberAccount = 7259195;
const unsplashInternalAmberAccount = 10808484;
const textSnippetsInternalAmberAccount = 7838557;
const textSnippetsAmberAccount = 6824228;

export const FilePickerModal: React.FunctionComponent<IFilePickerModalProps> = ({
	showFilePicker,
	insertFile,
	closeFilePicker,
	groupId,
	pickerKind,
}) => {
	const res = useLocalization().image;
	const isInternal = useIsInternal();
	return (
		<Modal
			container="body"
			isOpen={showFilePicker}
			onClose={closeFilePicker}
			fullscreen={true}
			withoutFooter
		>
			<Modal.Header
				title={pickerKind === FilePickerKind.Image ? res.imageTitle : res.textTitle}
				subtitle={pickerKind === FilePickerKind.Image ? res.subtitle : null}
				paddingBottom={'16px'}
			/>
			<Modal.Content padding={0}>
				{pickerKind === FilePickerKind.Image ? (
					<FilePicker onFilesSelected={insertFile} onCancel={closeFilePicker} allowMultiSelect>
						<TabManager>
							<TabList>
								{groupId && <Tab>{res.groupImages}</Tab>}
								<Tab>{res.stockImages}</Tab>
								<Tab>{res.unsplash}</Tab>
								<TabSpace />
							</TabList>
							<TabPanels display="grid">
								{groupId && (
									<TabPanel display="grid">
										<AmberContent
											accountId={parseInt(groupId)}
											filter={'kind:"image"'}
											viewStyle={'tinygrid'}
											height="100%"
										/>
									</TabPanel>
								)}
								<TabPanel display="grid">
									<AmberContent
										accountId={stockImagesAmberAccount}
										filter={'kind:"image"'}
										viewStyle={'tinygrid'}
										height="100%"
									/>
								</TabPanel>
								<TabPanel display="grid">
									<AmberContent
										accountId={isInternal ? unsplashInternalAmberAccount : unsplashAmberAccount}
										viewStyle={'tinygrid'}
										height="100%"
									/>
								</TabPanel>
							</TabPanels>
						</TabManager>
					</FilePicker>
				) : (
					<FilePicker onFilesSelected={insertFile} onCancel={closeFilePicker} allowMultiSelect>
						<TabManager>
							<TabList>
								<Tab>{res.textSnippets}</Tab>
								{groupId && <Tab>{res.groupTextFiles}</Tab>}
								<TabSpace />
							</TabList>
							<TabPanels display="grid">
								<TabPanel display="grid">
									<AmberContent
										accountId={
											isInternal ? textSnippetsInternalAmberAccount : textSnippetsAmberAccount
										}
										viewStyle={'tinygrid'}
										footerText={' '}
										height="100%"
									/>
								</TabPanel>
								{groupId && (
									<TabPanel display="grid">
										<AmberContent
											accountId={parseInt(groupId)}
											filter={'!kind:"image"'}
											viewStyle={'tinygrid'}
											footerText={' '}
											height="100%"
										/>
									</TabPanel>
								)}
							</TabPanels>
						</TabManager>
					</FilePicker>
				)}
			</Modal.Content>
		</Modal>
	);
};
