import localizedResources from '@faithlife/smart-media-editor/dist/locales/en-US/resources.json';

export const defaultLocalizedResources = {
	uploadTab: {
		recommendedMinSize: 'recommended minimum image size: 800 x 400',
		uploadFile: 'Upload File',
		uploadFiles: 'Upload Files',
		addText: 'Insert',
		cancelText: 'Cancel',
		dragDropText: 'Drag and drop to upload image',
		browseText: 'or browse files',
	},
	...localizedResources,
};
