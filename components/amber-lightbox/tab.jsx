/* eslint-disable react/no-unused-prop-types */
import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

// TODO implement viewStyle
// TODO: configure url for internal/test/beta/prod environments

export function Tab({ title, vaultId, filter, viewStyle, onFileSelected }) {
	const onMessageRef = useRef();

	const onMessage = useCallback(
		event => {
			const data = JSON.parse(event.data);
			if (data && data.type === 'assets') {
				onFileSelected(data.assets[0]);
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
					multiSelect: false,
				});
				window.addEventListener('message', onMessageRef.current);

				return () => {
					window.removeEventListener('message', onMessageRef.current);
				};
			}
		},
		[amberRef.current, window.amberfile],
	);

	return <Styled.Tab ref={amberRef} />;
}

Tab.propTypes = {
	title: PropTypes.string.isRequired,
	vaultId: PropTypes.number.isRequired,
	filter: PropTypes.string,
	viewStyle: PropTypes.string,
	onFileSelected: PropTypes.func.isRequired,
};
