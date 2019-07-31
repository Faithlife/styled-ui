import React from 'react';
import PropTypes from 'prop-types';
import { TabManager, TabList, TabPanels, Tab, TabPanel } from '../tabs';
import { AmberContent } from './amber-content';
import * as Styled from './styled';
import { UploadPage } from './upload-page';

export function FilePicker({
	tabs,
	onFilesSelected,
	allowMultiSelect,
	localizationProps,
	onCancel,
	minFileSize,
}) {
	return (
		<Styled.Container>
			<TabManager>
				<TabList>
					<Tab>{allowMultiSelect ? 'Upload Files' : 'Upload File'}</Tab>
					{tabs.length && tabs.map((t, index) => <Tab key={`tab:${index}`}>{t.title}</Tab>)}
				</TabList>
				<TabPanels>
					<TabPanel>
						<UploadPage
							allowMultiSelect={allowMultiSelect}
							onFilesSelected={onFilesSelected}
							localizationProps={localizationProps}
							onCancel={onCancel}
							minFileSize={minFileSize}
						/>
					</TabPanel>
					{tabs.length &&
						tabs.map((t, index) => (
							<TabPanel key={index}>
								<AmberContent
									title={t.title}
									accountId={t.accountId}
									onFilesSelected={onFilesSelected}
									filter={t.filter}
									viewStyle={t.viewStyle}
									allowMultiSelect={allowMultiSelect}
									onCancel={onCancel}
								/>
							</TabPanel>
						))}
				</TabPanels>
			</TabManager>
		</Styled.Container>
	);
}

FilePicker.propTypes = {
	/** An array of the tabs; each tab is a lightbox to a different Amber group */
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			accountId: PropTypes.number.isRequired,
			filter: PropTypes.string,
			viewStyle: PropTypes.string,
		}),
	),
	/** This function handles your files once selected */
	onFilesSelected: PropTypes.func.isRequired,
	/** Is selecting multiple files allowed */
	allowMultiSelect: PropTypes.bool,
	/** Customized text */
	localizationProps: PropTypes.shape({
		addText: PropTypes.string,
		cancelText: PropTypes.string,
	}),
	/** This function handles exiting the file picker */
	onCancel: PropTypes.func.isRequired,
	/** The minimum allowed file size; optional */
	minFileSize: PropTypes.string,
};

FilePicker.defaultProps = {
	localizationProps: {},
};
