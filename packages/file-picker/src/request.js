// Copied from the FLCOM project
export function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}

	const error = new Error(response.statusText);
	error.response = response;

	throw error;
}

function removePendingRequest(response, request) {
	window.faithlife.pendingRequests = window.faithlife.pendingRequests.filter(x => x !== request);

	return response;
}

function addPendingRequest(request) {
	window.faithlife = window.faithlife || {};
	window.faithlife.pendingRequests = window.faithlife.pendingRequests || [];
	window.faithlife.pendingRequests.push(request);
}

export function fetchResponse(
	url,
	{ credentials, method, headers, body, isFormData } = {},
	throwOnError = true
) {
	// Safari will throw an exception if headers is set to undefined
	const request = new window.Request(url, {
		body: body,
		credentials: credentials || 'same-origin',
		headers: headers || {},
		method: method || 'GET',
	});
	if (body !== null && !isFormData) {
		request.headers.set('Content-Type', 'application/json');
	}

	request.headers.append('X-Requested-With', 'XMLHttpRequest');

	// keep track of pending requests for debugging purposes
	addPendingRequest(request);

	// wrap in a babel-polyfill Promise for ".finally" support
	return Promise.resolve(window.fetch(request))
		.then(fetchMiniProfilerResults)
		.then(response => removePendingRequest(response, request))
		.then(response => {
			if (throwOnError) {
				return checkStatus(response);
			}
			return response;
		});
}

export function fetchJson(url, { credentials, method, headers, body, isFormData } = {}) {
	return fetchResponse(url, {
		credentials,
		method,
		headers: { ...headers, Accept: 'application/json' },
		body,
		isFormData,
	}).then(response => (response.status === 204 ? null : response.json()));
}

export function toQueryString(query) {
	return Object.entries(query)
		.filter(([, value]) => value !== null)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');
}

// Modified from https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
export const makeCancelable = promise => {
	let hasCanceled_ = false;

	const wrappedPromise = new Promise((resolve, reject) => {
		promise.then(
			val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
			error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
		);
	});

	wrappedPromise.cancel = () => {
		hasCanceled_ = true;
	};

	wrappedPromise.getHasCanceled = () => hasCanceled_;

	return wrappedPromise;
};

export function cancelableFetchJson(url, { credentials, method, headers, body, isFormData } = {}) {
	return makeCancelable(fetchJson(url, { credentials, method, headers, body, isFormData }));
}

export function cancelableFetchResponse(
	url,
	{ credentials, method, headers, body, isFormData } = {}
) {
	return makeCancelable(fetchResponse(url, { credentials, method, headers, body, isFormData }));
}

function fetchMiniProfilerResults(response) {
	// integrate 'fetch' responses with MiniProfiler if it's installed
	if (window.MiniProfiler && window.MiniProfiler.fetchResults) {
		const stringIds = response.headers.get('X-MiniProfiler-Ids');
		if (stringIds) {
			const ids = JSON.parse(stringIds);
			window.MiniProfiler.fetchResults(ids);
		}
	}

	return response;
}
