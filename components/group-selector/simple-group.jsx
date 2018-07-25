import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

export function SimpleGroup({ onClick, groupId, avatar, name }) {
	return (
		<Styled.SimpleGroup onClick={() => onClick(groupId)}>
			<Styled.SimpleGroupAvatar>{avatar}</Styled.SimpleGroupAvatar>
			<Styled.SimpleGroupInfo>
				<Styled.SimpleGroupName>{name}</Styled.SimpleGroupName>
			</Styled.SimpleGroupInfo>
		</Styled.SimpleGroup>
	);
}

SimpleGroup.propTypes = {
	onClick: PropTypes.func.isRequired,
	groupId: PropTypes.number.isRequired,
	avatar: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
};
