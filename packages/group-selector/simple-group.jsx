import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from './avatar';
import * as Styled from './styled';

export function SimpleGroup({
	onClick,
	groupId,
	avatarUrl,
	name,
	kind,
	isSelected,
	isHovered,
	disableHover,
}) {
	let backgroundColor = 'white';
	if (isSelected) {
		backgroundColor = '#ebf7ff';
	} else if (!disableHover && isHovered) {
		backgroundColor = '#ebf7ff';
	}

	return (
		<Styled.SimpleGroup
			color={backgroundColor}
			disableHover={disableHover}
			onClick={() => onClick && onClick(groupId, name)}
		>
			<Styled.SimpleGroupAvatar>
				<Avatar avatarUrl={avatarUrl} name={name} kind={kind} />
			</Styled.SimpleGroupAvatar>
			<Styled.SimpleGroupName>{name}</Styled.SimpleGroupName>
		</Styled.SimpleGroup>
	);
}

SimpleGroup.propTypes = {
	groupId: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	kind: PropTypes.string.isRequired,
	disableHover: PropTypes.bool,
	isSelected: PropTypes.bool.isRequired,
	isHovered: PropTypes.bool.isRequired,
	avatarUrl: PropTypes.string,
	onClick: PropTypes.func,
};
