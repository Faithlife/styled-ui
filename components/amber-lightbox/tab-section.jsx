/* eslint-disable react/no-unused-prop-types */
import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function TabSection({
	vaultId,
	filter,
	viewStyle,
	onFileSelected,
	allowMultiSelect,
	onCancel,
}) {
	const onMessageRef = useRef();

	const onMessage = useCallback(
		event => {
			console.log(event.data);

			if (event.data && typeof event.data === 'string') {
				console.log('event data is ', event.data);
				const parsedEvent = JSON.parse(event.data);
				// const data = JSON.parse(event.data);
				if (parsedEvent.canceled) {
					console.log('oncancel');
					onCancel();
				} else if (parsedEvent.assets) {
					console.log('assets');
					onFileSelected(parsedEvent.assets);
				}
			}
		},
		[onFileSelected],
	);

	useEffect(
		() => {
			onMessageRef.current = onMessage;
		},
		[onMessage],
	);

	const amberRef = useRef();

	useEffect(
		// eslint-disable-next-line consistent-return
		() => {
			if (amberRef.current && window.amberfile) {
				window.amberfile.embedded.load({
					url: '/embed/',
					container: amberRef.current,
					groupId: vaultId,
					multiSelect: allowMultiSelect,
					viewStyle,
					filter,
				});
				window.addEventListener('message', onMessageRef.current);

				return () => {
					window.removeEventListener('message', onMessageRef.current);
				};
			}
		},
		[window.amberfile],
	);

	return <Styled.Tab ref={amberRef} />;
}

TabSection.propTypes = {
	vaultId: PropTypes.number.isRequired,
	filter: PropTypes.string,
	viewStyle: PropTypes.string,
	onFileSelected: PropTypes.func.isRequired,
	allowMultiSelect: PropTypes.bool,
	onCancel: PropTypes.func.isRequired,
};
