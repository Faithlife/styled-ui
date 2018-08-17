import React from 'react';
import PropTypes from 'prop-types';
import * as icons from './icons.jsx';

export function Avatar({ group, size = '32px' }) {
	if (group.avatarUrl) {
		return (
			<img
				style={{ borderRadius: '3px', width: size, height: size }}
				src={group.avatarUrl}
				alt={group.name}
			/>
		);
	}

	const Icon = storedIcons.get(group.kind) || getIconForGroupKind(group.kind);

	return <Icon style={{ borderRadius: '3px', width: size, height: size }} viewBox="0 0 76 76" />;
}

Avatar.propTypes = {
	group: PropTypes.object,
	size: PropTypes.string,
};

const storedIcons = new Map();

function getIconForGroupKind(kind) {
	let icon = storedIcons.get(kind);
	if (!icon) {
		icon = icons[`${kind.charAt(0).toUpperCase()}${kind.slice(1)}`] || icons.General;
		storedIcons.set(kind, icon);
	}

	return icon;
}
