import { useEffect, useState } from 'react';
import formatUri from '@faithlife/format-uri';
import { fetchJson } from './request';

export const useAmberBucket = accountId => {
	const [bucketId, setBucketId] = useState(false);

	useEffect(() => {
		let didCancel = false;
		const tryGetBuckets = async function() {
			let bucketIds = null;
			try {
				bucketIds = await fetchJson(
					formatUri('/proxy/files/v1/buckets/accounts/{accountId}', { accountId })
				);
			} catch (e) {
				return false;
			}

			if (!bucketIds || !bucketIds.items || !bucketIds.items.length) {
				return false;
			}

			if (!didCancel) {
				setBucketId(bucketIds.items[0].id);
			}
		};
		tryGetBuckets();
		return () => {
			didCancel = true;
		};
	}, [accountId]);

	return bucketId;
};
