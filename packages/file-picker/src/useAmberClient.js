import { useCallback, useEffect, useRef } from 'react';
import { createHttpClient as createAmberClient } from '@faithlife/amber-api';
import formatUri from '@faithlife/format-uri';
import { useAmberBucket } from './useAmberBucket';
import { fetchJson } from './request';

export const useAmberClient = accountId => {
	const bucketId = useAmberBucket(accountId);

	const amberClient = useRef(null);
	useEffect(() => {
		amberClient.current = createAmberClient({
			fetch: fetch,
			baseUri: '/proxy/files/v1',
		});
	}, []);

	const createSmartMediaAsset = useCallback(
		async (asset, blob, metadata) => {
			const sourceId = asset.source ? asset.source.id : asset.file ? asset.file.id : null;

			const isUnsplashAsset = /^us_/.test(sourceId);

			const copiedSourceFile = isUnsplashAsset
				? { id: sourceId }
				: await fetchJson(
						formatUri('/proxy/files/v1/assets/{assetId}/files/{fileId}/copy', {
							assetId: asset.id,
							fileId: sourceId,
						}),
						{
							method: 'POST',
						}
				  );

			const startUploadResponse = await amberClient.current.createDirectUpload();
			if (startUploadResponse.error) {
				throw startUploadResponse.error;
			}

			await fetch(startUploadResponse.value.uploadUri, {
				method: 'PUT',
				headers: {
					'Content-Type': blob.type,
					'Content-Length': blob.size,
				},
				body: blob,
			});

			const finishUploadResponse = await amberClient.current.finishUpload({
				uploadId: startUploadResponse.value.uploadId,
				finishUploadSettings: {
					fileName: 'Smart Media',
					mediaType: blob.type,
					size: blob.size,
				},
			});
			if (finishUploadResponse.error) {
				throw finishUploadResponse.error;
			}

			const createAssetResponse = await amberClient.current.createAssetWithOperations({
				assetEditRequest: {
					bucket: bucketId,
					forceJob: true,
					waitForIndexing: true,
					ops: [
						{ op: 'setFile', fileId: finishUploadResponse.value.ok.id, update: true },
						{ op: 'adoptFileMetadata' },
						{ op: 'addToMetadataArray', path: 'families', value: 'smartMedia' },
						{ op: 'setMetadata', path: 'smartMedia', value: metadata },
						{ op: 'setSource', fileId: copiedSourceFile.id },
						{ op: 'createStandardFormats' },
					],
				},
			});
			if (createAssetResponse.error) {
				throw createAssetResponse.error;
			}

			const jobId = createAssetResponse.value.job.id;
			let errorCount = 0;
			let newAsset = false;
			while (!newAsset) {
				const getJobResponse = await amberClient.current.getJob({
					id: jobId,
				});
				if (getJobResponse.error && errorCount++ > 3) {
					throw getJobResponse.error;
				}

				const job = getJobResponse.value.ok;

				if (job.status === 'failed') {
					throw job.response.content.message;
				}

				if (job.response && job.response.content) {
					newAsset = job.response.content;
				}
			}

			const getNewAssetWithLinksResponse = await amberClient.current.getAsset({
				id: newAsset.id,
			});
			if (getNewAssetWithLinksResponse.error) {
				throw getNewAssetWithLinksResponse.error;
			}

			return getNewAssetWithLinksResponse.value.ok;
		},
		[bucketId]
	);

	return {
		createSmartMediaAsset,
	};
};
