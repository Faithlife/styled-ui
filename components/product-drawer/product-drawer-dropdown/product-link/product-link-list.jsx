import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export const ProductLinkList = ({ isVisible, children }) => (
	<Styled.ProductLinkList isVisible={isVisible}>{children}</Styled.ProductLinkList>
);

ProductLinkList.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	children: PropTypes.array,
};
