import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

export default function SimpleGroup({ onClick, id, avatar, name }) {
	return (
		<Styled.SimpleGroup onClick={() => onClick(id)}>
			<Styled.SimpleGroupAvatar>{avatar}</Styled.SimpleGroupAvatar>
			<Styled.SimpleGroupInfo>
				<Styled.SimpleGroupName>{name}</Styled.SimpleGroupName>
			</Styled.SimpleGroupInfo>
		</Styled.SimpleGroup>
	);
}

SimpleGroup.propTypes = {
	onClick: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	avatar: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,
};
