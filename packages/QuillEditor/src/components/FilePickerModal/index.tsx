import React from 'react';
import styled from 'styled-components';
import {
	Modal,
	ModalContent,
	FilePicker,
	AmberContent,
	TabManager,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@faithlife/styled-ui';
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

const Skeleton = styled.div`
	width: 80vw;

	& [role='tabpanel'] {
		padding: 0;
	}
`;

const TabSpace = styled.span`
	width: 8px;
	order: -1;
`;

const stockImagesAmberAccount = 6817140;
const unsplashAmberAccount = 7259195;
const unsplashInternalAmberAccount = 10808484;
const textSnippetsAmberAccount = 7838557;

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
			isOpen={showFilePicker}
			onClose={closeFilePicker}
			title={pickerKind === FilePickerKind.Image ? res.imageTitle : res.textTitle}
			subtitle={pickerKind === FilePickerKind.Image ? res.subtitle : null}
			headerBottomBorder={'none'}
			withoutFooter
		>
			<ModalContent padding={0}>
				<Skeleton>
					{pickerKind === FilePickerKind.Image ? (
						<FilePicker onFilesSelected={insertFile} onCancel={closeFilePicker} allowMultiSelect>
							<TabManager>
								<TabList>
									{groupId && <Tab>{res.groupImages}</Tab>}
									<Tab>{res.stockImages}</Tab>
									<Tab>{res.unsplash}</Tab>
									<TabSpace />
								</TabList>
								<TabPanels>
									{groupId && (
										<TabPanel>
											<AmberContent
												accountId={parseInt(groupId)}
												filter={'kind:"image"'}
												viewStyle={'tinygrid'}
											/>
										</TabPanel>
									)}
									<TabPanel>
										<AmberContent
											accountId={stockImagesAmberAccount}
											filter={'kind:"image"'}
											viewStyle={'tinygrid'}
										/>
									</TabPanel>
									<TabPanel>
										<AmberContent
											accountId={isInternal ? unsplashInternalAmberAccount : unsplashAmberAccount}
											viewStyle={'tinygrid'}
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
								<TabPanels>
									<TabPanel>
										<AmberContent
											accountId={textSnippetsAmberAccount}
											viewStyle={'tinygrid'}
											footerText={' '}
										/>
									</TabPanel>
									{groupId && (
										<TabPanel>
											<AmberContent
												accountId={parseInt(groupId)}
												filter={'!kind:"image"'}
												viewStyle={'tinygrid'}
												footerText={' '}
											/>
										</TabPanel>
									)}
								</TabPanels>
							</TabManager>
						</FilePicker>
					)}
				</Skeleton>
			</ModalContent>
		</Modal>
	);
};
