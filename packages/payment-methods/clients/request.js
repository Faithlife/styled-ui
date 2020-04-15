export async function fetchJson(
	url,
	{ credentials = 'same-origin', method = 'GET', body = null, query = null, headers = {} } = {}
) {
	const queryString = query
		? Object.keys(query)
				.filter(key => !!query[key])
				.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
				.join('&')
		: '';
	const separator = queryString ? '?' : '';

	const response = await fetch(`${url}${separator}${queryString}`, {
		method,
		headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...headers },
		body,
		credentials,
	});
	if (!response.ok) {
		let errorJson;
		try {
			errorJson = await response.json();
		} catch (_) {
			const error = new Error(`Request failed with code: ${response.status}`);
			error.response = response;
			throw error;
		}
		throw errorJson;
	}

	return response.status !== 204 ? response.json() : null;
}
