import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

export function SimpleGroup({ onClick, groupId, avatar, name, isSelected, isHovered }) {
	const child = (
		<div>
			<Styled.SimpleGroupAvatar>{avatar}</Styled.SimpleGroupAvatar>
			<Styled.SimpleGroupInfo>
				<Styled.SimpleGroupName>{name}</Styled.SimpleGroupName>
			</Styled.SimpleGroupInfo>
		</div>
	);

	if (isSelected)
		return (
			<Styled.SelectedSimpleGroup onClick={() => onClick(groupId)}>
				{child}
			</Styled.SelectedSimpleGroup>
		);
	if (isHovered)
		return (
			<Styled.HoveredSimpleGroup onClick={() => onClick(groupId)}>
				{child}
			</Styled.HoveredSimpleGroup>
		);

	return <Styled.SimpleGroup onClick={() => onClick(groupId)}>{child}</Styled.SimpleGroup>;
}

SimpleGroup.propTypes = {
	onClick: PropTypes.func.isRequired,
	groupId: PropTypes.number.isRequired,
	avatar: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
	isSelected: PropTypes.bool.isRequired,
	isHovered: PropTypes.bool.isRequired,
};
