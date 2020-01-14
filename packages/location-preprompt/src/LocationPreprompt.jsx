import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@faithlife/styled-ui/v6';

LocationPreprompt.propTypes = {
	children: PropTypes.node.isRequired,
};
export function LocationPreprompt(props) {
	const { children, ...rest } = props;
	return (
		<Modal isOpen container="body" onClose={() => null} {...rest}>
			{children}
		</Modal>
	);
}
