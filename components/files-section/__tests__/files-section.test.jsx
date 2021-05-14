import React from 'react';
import { render, axe } from '../../../test-utils';

import { FilesSection } from '../';

const files = [
	{
		id: 'one',
		mediaType: 'image/png',
		name: 'File one',
		byteCount: 1244124,
		isProcessing: false,
	},
	{
		id: 'two',
		mediaType: 'video/mp4',
		name: 'File two',
		byteCount: 123,
		isProcessing: false,
	},
	{
		id: 'three',
		mediaType: 'audio/mpeg',
		name: 'File three',
		byteCount: 923992344124,
		isProcessing: false,
	},
];

// TODO: add an interaction test
describe('FilesSection', () => {
	it('is truthy', () => {
		expect.hasAssertions();

		expect(FilesSection).toBeTruthy();
	});

	// TODO: make aXe compliant
	it.skip('should satisfy aXe accessibility', async () => {
		expect.hasAssertions();

		const { container } = render(
			<FilesSection files={files} onFileClicked={() => {}} onUploadFiles={() => {}} />,
		);

		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});
});
