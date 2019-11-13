import React, { useRef, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { useFilePickerContext } from './file-picker-helpers';

export function AmberContent({
	accountId,
	filter,
	footerText,
	pickerMode,
	sort,
	viewStyle,
	...props
}) {
	const { allowMultiSelect, onCancel, onFilesSelected } = useFilePickerContext();

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
							kind: 'assets',
						});
					} else if (parsedEvent.type === 'filter') {
						onFilesSelected({
							filterData: parsedEvent.filterData,
							kind: 'filter',
						});
					}
				}
			}
		},
		[amberRef, onFilesSelected, onCancel],
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
				sort,
				url: '/embed/',
				viewStyle,
			});
		}
	}, [accountId, allowMultiSelect, amber, filter, footerText, pickerMode, sort, viewStyle]);

	return <Box ref={amberRef} height={532} {...props} />;
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
	/** Optional to set the sorting of the assets. Values are "relevance" or an asset field. */
	sort: PropTypes.string,
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
			let amberScript = document.querySelector(
				'script[src="https://amber.faithlife.com/scripts/api/embeddedBucket.js"]',
			);

			if (!amberScript) {
				amberScript = document.createElement('script');
				amberScript.src = 'https://amber.faithlife.com/scripts/api/embeddedBucket.js';
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
