import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

export const ProductLink = ({ title, description, href, autoFocus, children }) => (
	<Styled.ProductLinkListItem>
		<Styled.ProductLink
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			productLinkNoIcon={!children}
			title={title}
			ref={autoFocus && (el => el && el.focus())}
		>
			{children ? (
				<Styled.ProductLinkIconContainer>{children}</Styled.ProductLinkIconContainer>
			) : null}
			<Styled.ProductLinkInfo>
				<Styled.ProductLinkTitle>{title}</Styled.ProductLinkTitle>
				<Styled.ProductLinkDescription>{description}</Styled.ProductLinkDescription>
			</Styled.ProductLinkInfo>
		</Styled.ProductLink>
	</Styled.ProductLinkListItem>
);

ProductLink.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	href: PropTypes.string.isRequired,
	autoFocus: PropTypes.boolean,
	children: PropTypes.array,
};
