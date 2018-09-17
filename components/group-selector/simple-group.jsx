import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from './avatar.jsx';
import * as Styled from './styled.jsx';

export function SimpleGroup({ onClick, groupId, avatarUrl, name, kind, isSelected, isHovered }) {
	let backgroundColor = 'white';
	if (isSelected) {
		backgroundColor = '#ebf7ff';
	} else if (isHovered) {
		backgroundColor = '#ebf7ff';
	}

	return (
		<Styled.SimpleGroup color={backgroundColor} onClick={() => onClick(groupId, name)}>
			<Styled.SimpleGroupAvatar>
				<Avatar avatarUrl={avatarUrl} name={name} kind={kind} />
			</Styled.SimpleGroupAvatar>
			<Styled.SimpleGroupInfo>
				<Styled.SimpleGroupName>{name}</Styled.SimpleGroupName>
			</Styled.SimpleGroupInfo>
		</Styled.SimpleGroup>
	);
}

SimpleGroup.propTypes = {
	onClick: PropTypes.func.isRequired,
	groupId: PropTypes.number.isRequired,
	avatarUrl: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	kind: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isHovered: PropTypes.bool.isRequired,
};
