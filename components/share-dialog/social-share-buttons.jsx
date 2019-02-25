import React from 'react';
import PropTypes from 'prop-types';
import {
	ShareToTwitterIcon,
	ShareToFacebookIcon,
	ShareToFaithlifeIcon,
	ShareToEmailIcon,
} from '../icons';
import * as Styled from './styled';

export const FaithlifeShareButton = ({ encodedShareUrl, encodedMessage }) => (
	<Styled.ShareAnchor
		href={`https://faithlife.com/share?url=${encodedShareUrl}&content=${encodedMessage}`}
		target="_blank"
		rel="noopener noreferrer"
	>
		<ShareToFaithlifeIcon />
	</Styled.ShareAnchor>
);

FaithlifeShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
	encodedMessage: PropTypes.string,
};

export const TwitterShareButton = ({ encodedShareUrl, encodedMessage }) => (
	<Styled.ShareAnchor
		href={`https://twitter.com/intent/tweet?url=${encodedShareUrl}&text=${encodedMessage}`}
		target="_blank"
		rel="noopener noreferrer"
	>
		<ShareToTwitterIcon />
	</Styled.ShareAnchor>
);

TwitterShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
	encodedMessage: PropTypes.string,
};

export const FacebookShareButton = ({ encodedShareUrl }) => (
	<Styled.ShareAnchor
		href={`https://www.facebook.com/sharer/sharer.php?u=${encodedShareUrl}`}
		target="_blank"
		rel="noopener noreferrer"
	>
		<ShareToFacebookIcon />
	</Styled.ShareAnchor>
);

FacebookShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
};

export const EmailShareButton = ({ encodedShareUrl, encodedMessage }) => (
	<Styled.ShareAnchor href={`mailto:?subject=${encodedMessage}&body=${encodedShareUrl}`}>
		<ShareToEmailIcon />
	</Styled.ShareAnchor>
);

EmailShareButton.propTypes = {
	encodedShareUrl: PropTypes.string.isRequired,
	encodedMessage: PropTypes.string,
};
