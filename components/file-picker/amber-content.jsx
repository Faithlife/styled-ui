import React, { useRef, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFilePickerContext } from './file-picker-helpers';
import * as Styled from './styled';

export function AmberContent({ accountId, filter, viewStyle }) {
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
						onFilesSelected(parsedEvent.assets);
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
				groupId: accountId,
				multiSelect: allowMultiSelect,
				viewStyle,
				filter,
			});
		}
	}, [allowMultiSelect, filter, accountId, viewStyle, amber]);

	return <Styled.Tab ref={amberRef} />;
}

AmberContent.propTypes = {
	/** The id of the group who's files will be shown */
	accountId: PropTypes.number.isRequired,
	/** optional way to filter files */
	filter: PropTypes.string,
	/** optional way to chose layout of the Amber embeded view */
	viewStyle: PropTypes.string,
};

function useAmber() {
	const [amber, setAmber] = useState(null);

	useEffect(() => {
		if (window.amberfile) {
			setAmber(window.amberfile);
		} else {
			const onScriptLoad = () => {
				setAmber(window.amberfile);
			};

			const onScriptError = error => {
				console.error(error);
			};

			const amberScript = document.createElement('script');
			amberScript.src = 'https://amber.faithlife.com/scripts/api/embeddedBucket.js';
			amberScript.async = true;

			amberScript.addEventListener('load', onScriptLoad);
			amberScript.addEventListener('error', onScriptError);

			document.body.appendChild(amberScript);
		}
		return () => {
			amberScript.removeEventListener('load', onScriptLoad);
			amberScript.removeEventListener('error', onScriptError);
		};
	}, []);

	return amber;
}
