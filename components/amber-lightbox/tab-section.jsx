/* eslint-disable react/no-unused-prop-types */
import React, { useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export function TabSection({ vaultId, filter, viewStyle, onFileSelected }) {
	const onMessageRef = useRef();

	const onMessage = useCallback(
		event => {
			if (event.data) {
				const data = JSON.parse(event.data);
				if (data && data.type === 'assets') {
					onFileSelected(data.assets[0]);
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
					multiSelect: false,
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
};
