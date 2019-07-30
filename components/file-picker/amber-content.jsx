import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function AmberContent({
	accountId,
	filter,
	viewStyle,
	onFilesSelected,
	allowMultiSelect,
	onCancel,
}) {
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
		if (amberRef.current && window.amberfile) {
			window.amberfile.embedded.load({
				url: '/embed/',
				container: amberRef.current,
				groupId: accountId,
				multiSelect: allowMultiSelect,
				viewStyle,
				filter,
			});
		}
	}, [allowMultiSelect, filter, accountId, viewStyle]);

	return <Styled.Tab ref={amberRef} />;
}

AmberContent.propTypes = {
	accountId: PropTypes.number.isRequired,
	filter: PropTypes.string,
	viewStyle: PropTypes.string,
	onFilesSelected: PropTypes.func.isRequired,
	allowMultiSelect: PropTypes.bool,
	onCancel: PropTypes.func.isRequired,
};
