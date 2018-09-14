import React from 'react';
import PropTypes from 'prop-types';
import * as icons from './icons.jsx';

export function Avatar({ avatarUrl, name, kind, size = '32px' }) {
	if (avatarUrl) {
		return (
			<img style={{ borderRadius: '3px', width: size, height: size }} src={avatarUrl} alt={name} />
		);
	}

	const Icon = storedIcons.get(kind) || getIconForGroupKind(kind);

	return <Icon style={{ borderRadius: '3px', width: size, height: size }} viewBox="0 0 76 76" />;
}

Avatar.propTypes = {
	avatarUrl: PropTypes.string,
	name: PropTypes.string,
	kind: PropTypes.string,
	size: PropTypes.string,
};

const storedIcons = new Map();

function getIconForGroupKind(kind) {
	let icon = storedIcons.get(kind);
	if (!icon) {
		/* eslint import/namespace: ['error', { allowComputed: true }] */
		icon = (kind && icons[`${kind.charAt(0).toUpperCase()}${kind.slice(1)}`]) || icons.General;
		storedIcons.set(kind, icon);
	}

	return icon;
}
