import React, { useRef, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@faithlife/styled-ui';
import { useFilePickerContext } from './FilePickerContext';

const amberEmbedUrl = 'https://amber.faithlife.com/scripts/api/embeddedBucket.js';

export function AmberContent({
	accountId,
	filter,
	fields,
	footerText,
	pickerMode,
	sort,
	theme,
	viewStyle,
	...props
}) {
	const {
		allowMultiSelect,
		onCancel,
		onFilesSelected,
		ExternalEditorComponent,
	} = useFilePickerContext();

	const amber = useAmber();
	const amberRef = useRef();

	const handleMessage = useCallback(
		event => {
			const iframe = amberRef.current && amberRef.current.querySelector('iframe');
			if (iframe && event.source === iframe.contentWindow && event.isTrusted) {
				if (event.data && typeof event.data === 'string') {
					const parsedEvent = JSON.parse(event.data);
					if (parsedEvent.canceled) {
						onCancel();
					} else if (parsedEvent.type === 'assets') {
						onFilesSelected({
							assets: parsedEvent.assets,
							openInExternalEditor: parsedEvent.openInExternalEditor,
							kind: 'assets',
						});
					} else if (parsedEvent.type === 'filter') {
						onFilesSelected({
							filterData: parsedEvent.filterData,
							kind: 'filter',
						});
					} else if (parsedEvent.type === 'create') {
						onFilesSelected({
							assets: [],
							openInExternalEditor: parsedEvent.openInExternalEditor,
						});
					}
				}
			}
		},
		[amberRef, onFilesSelected, onCancel]
	);

	useEffect(() => {
		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [handleMessage]);

	useEffect(() => {
		if (amberRef.current && amber) {
			amber.embedded.load({
				accountId,
				container: amberRef.current,
				filter,
				footerText,
				multiSelect: allowMultiSelect,
				pickerMode,
				fields,
				sort,
				theme,
				url: '/embed/',
				viewStyle,
				externalEditorKinds: ExternalEditorComponent ? ['image'] : ['none'],
			});
		}
	}, [
		accountId,
		allowMultiSelect,
		amber,
		filter,
		footerText,
		pickerMode,
		sort,
		viewStyle,
		ExternalEditorComponent,
		fields,
		theme,
	]);

	return <Box ref={amberRef} height="100%" {...props} />;
}

AmberContent.propTypes = {
	/** The id of the account whose assets will be shown */
	accountId: PropTypes.number.isRequired,
	/** Option to filter assets */
	filter: PropTypes.string,
	/** Option to set footer text */
	footerText: PropTypes.string,
	/** Optional to control the type of data passed back. Values are "file", "asset" and "filter". */
	pickerMode: PropTypes.string,
	/** Optional; This field will only apply if `pickerMode` is set to "asset".  A comma-separated list of fields to be returned for each asset */
	fields: PropTypes.string,
	/** Optional to set the sorting of the assets. Values are "relevance" or an asset field. */
	sort: PropTypes.string,
	/** Optional to set the theme of the Amber site. Valid values are bible-study-light and bible-study-dark of the assets. NOTE: This doesn't theme the container around the Amber iframe. */
	theme: PropTypes.string,
	/** Optional to set the layout of the assets */
	viewStyle: PropTypes.string,
};

AmberContent.defaultProps = {
	pickerMode: 'asset',
};

function useAmber() {
	const [amber, setAmber] = useState(null);

	useEffect(() => {
		if (window.amberfile) {
			setAmber(window.amberfile);
		} else {
			let amberScript = document.querySelector(`script[src="${amberEmbedUrl}"]`);

			if (!amberScript) {
				amberScript = document.createElement('script');
				amberScript.src = amberEmbedUrl;
				amberScript.async = true;
				document.body.appendChild(amberScript);
			}

			const onScriptLoad = () => {
				setAmber(window.amberfile);
			};
			const onScriptError = error => {
				console.error(error);
			};

			amberScript.addEventListener('load', onScriptLoad);
			amberScript.addEventListener('error', onScriptError);

			return () => {
				amberScript.removeEventListener('load', onScriptLoad);
				amberScript.removeEventListener('error', onScriptError);
			};
		}
	}, []);

	return amber;
}
