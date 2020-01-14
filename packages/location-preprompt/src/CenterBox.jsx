import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@faithlife/styled-ui';

CenterBox.propTypes = {
	children: PropTypes.node.isRequired,
};
export function CenterBox(props) {
	const { children, ...rest } = props;
	return (
		<Box
			display="flex"
			justifyContent="center"
			alignContent="center"
			alignItems="center"
			flexDirection="column"
			{...rest}
		>
			{children}
		</Box>
	);
}
