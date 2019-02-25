import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';
import * as icons from './icons';

export function Avatar({ avatarUrl, name, kind, size = 32 }) {
	let child;
	if (avatarUrl) {
		child = <Styled.AvatarImage size={size} src={avatarUrl} alt={name} />;
	} else {
		const Icon = storedIcons.get(kind) || getIconForGroupKind(kind);

		child = <Icon viewBox="0 0 76 76" />;
	}

	return <Styled.AvatarWrapper size={size}>{child}</Styled.AvatarWrapper>;
}

Avatar.propTypes = {
	avatarUrl: PropTypes.string,
	name: PropTypes.string,
	kind: PropTypes.string,
	size: PropTypes.number,
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
