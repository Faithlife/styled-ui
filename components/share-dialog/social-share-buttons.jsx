import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetStyles } from '../utils';
import {
	ShareToTwitterIcon,
	ShareToFacebookIcon,
	ShareToFaithlifeIcon,
	ShareToEmailIcon,
} from '../icons';

export const FaithlifeShareButton = ({ encodedShareUrl, encodedMessage }) => (
	<ShareAnchor
		href={`https://faithlife.com/share?url=${encodedShareUrl}&content=${encodedMessage}`}
		target="_blank"
		rel="noopener noreferrer"
	>
		<ShareToFaithlifeIcon />
	</ShareAnchor>
);

FaithlifeShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
	encodedMessage: PropTypes.string,
};

export const TwitterShareButton = ({ encodedShareUrl, encodedMessage }) => (
	<ShareAnchor
		href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedMessage}`}
		target="_blank"
		rel="noopener noreferrer"
	>
		<ShareToTwitterIcon />
	</ShareAnchor>
);

TwitterShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
	encodedMessage: PropTypes.string,
};

export const FacebookShareButton = ({ encodedShareUrl }) => (
	<ShareAnchor
		href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
		target="_blank"
		rel="noopener noreferrer"
	>
		<ShareToFacebookIcon />
	</ShareAnchor>
);

FacebookShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
};

export const EmailShareButton = ({ encodedShareUrl, encodedMessage }) => (
	<ShareAnchor href={`mailto:?subject=${encodedMessage}&body=${encodedShareUrl}`}>
		<ShareToEmailIcon />
	</ShareAnchor>
);

EmailShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
	encodedMessage: PropTypes.string,
};

const ShareAnchor = styled.a`
	${resetStyles};
	display: flex;

	@media (hover: none) {
		padding: 10px;
	}
	@media (hover: hover) {
		margin: 0 4px;
	}
`;
