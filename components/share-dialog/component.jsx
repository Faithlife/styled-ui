import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import { Modal } from '../modal/modal.jsx';
import {
	FaithlifeShareButton,
	TwitterShareButton,
	FacebookShareButton,
	EmailShareButton,
} from './social-share-buttons.jsx';
import { CopyToClipboard } from './copy-to-clipboard.jsx';
import * as Styled from './styled.jsx';

/**
 * ShareDialog
 */
export class ShareDialog extends React.Component {
	static propTypes = {
		shareUrl: PropTypes.string.isRequired,
		onClose: PropTypes.func.isRequired,
		message: PropTypes.string,
		isOpen: PropTypes.bool,
	};

	render() {
		const { shareUrl, message, onClose, isOpen } = this.props;

		const encodedShareUrl = encodeURIComponent(shareUrl);
		const encodedMessage = message ? encodeURIComponent(message) : '';

		return (
			<Modal renderFooter={() => null} isOpen={isOpen} onClose={onClose} title="Share this page">
				<Styled.ShareContainer>
					<FaithlifeShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<TwitterShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<FacebookShareButton encodedShareUrl={encodedShareUrl} />
					<EmailShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<CopyToClipboard clipboard={Clipboard} copyValue={shareUrl} copyButtonText="Copy" />
				</Styled.ShareContainer>
			</Modal>
		);
	}
}
