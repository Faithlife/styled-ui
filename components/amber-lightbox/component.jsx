/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TabManager, TabList, TabPanels, Tab, TabPanel } from '../tabs';
import { AmberContent } from './amber-content';
import * as Styled from './styled';
import { UploadPage } from './upload-page';

// TODO standardize localization

export function AmberLightbox({
	tabs,
	onFileSelected,
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
							onFileSelected={onFileSelected}
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
									vaultId={t.vaultId}
									onFileSelected={onFileSelected}
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

AmberLightbox.propTypes = {
	tabs: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			vaultId: PropTypes.number.isRequired,
			filter: PropTypes.string,
			viewStyle: PropTypes.string,
		}),
	),
	// fileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
	onFileSelected: PropTypes.func.isRequired,
	allowMultiSelect: PropTypes.bool,
	localizationProps: PropTypes.shape({
		addText: PropTypes.string,
		cancelText: PropTypes.string,
	}),
	onCancel: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
	minFileSize: PropTypes.string,
};

AmberLightbox.defaultProps = {
	localizationProps: {},
};
