import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from '@faithlife/styled-ui';

Title.propTypes = {
	children: PropTypes.node.isRequired,
};
export function Title(props) {
	const { children, ...rest } = props;
	return (
		<Heading level={28} {...rest}>
			{children}
		</Heading>
	);
}
