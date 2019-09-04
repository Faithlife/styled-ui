import React, { useRef, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFilePickerContext } from './file-picker-helpers';
import * as Styled from './styled';

export function AmberContent({ accountId, filter, viewStyle, pickerMode }) {
	const { allowMultiSelect, onCancel, onFilesSelected } = useFilePickerContext();

	const amber = useAmber();

	const handleMessage = useCallback(
		event => {
			if (event.origin.includes('amber.faithlife.com') && event.isTrusted) {
				if (event.data && typeof event.data === 'string') {
					const parsedEvent = JSON.parse(event.data);
					if (parsedEvent.canceled) {
						onCancel();
					} else if (parsedEvent.assets) {
						onFilesSelected({
							assets: parsedEvent.assets,
							kind: 'assets'
						});
					}
				}
			}
		},
		[onFilesSelected, onCancel],
	);

	const amberRef = useRef();

	useEffect(() => {
		window.addEventListener('message', handleMessage);

		return () => {
			window.removeEventListener('message', handleMessage);
		};
	}, [handleMessage]);

	useEffect(() => {
		if (amberRef.current && amber) {
			amber.embedded.load({
				url: '/embed/',
				container: amberRef.current,
				accountId: accountId,
				multiSelect: allowMultiSelect,
				viewStyle,
				pickerMode,
				filter,
			});
		}
	}, [allowMultiSelect, filter, accountId, viewStyle, pickerMode, amber]);

	return <Styled.Tab ref={amberRef} />;
}

AmberContent.propTypes = {
	/** The id of the group who's files will be shown */
	accountId: PropTypes.number.isRequired,
	/** optional way to filter files */
	filter: PropTypes.string,
	/** optional way to chose layout of the Amber embeded view */
	viewStyle: PropTypes.string,
	/** optional way to control the data passed back from amber picker, options are file, asset and filter */
	pickerMode: PropTypes.string,
};

AmberContent.defaultProps = {
	pickerMode: 'asset',
}

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
