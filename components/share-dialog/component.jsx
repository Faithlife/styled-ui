import React from 'react';
import PropTypes from 'prop-types';
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
		modalTitle: PropTypes.string,
		copyButtonText: PropTypes.string,
	};

	render() {
		const { shareUrl, message, onClose, isOpen, modalTitle, copyButtonText } = this.props;

		const encodedShareUrl = encodeURIComponent(shareUrl);
		const encodedMessage = message ? encodeURIComponent(message) : '';

		return (
			<Modal
				withoutFooter
				isOpen={isOpen}
				onClose={onClose}
				title={modalTitle || 'Share this page'}
			>
				<Styled.ShareContainer>
					<FaithlifeShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<TwitterShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<FacebookShareButton encodedShareUrl={encodedShareUrl} />
					<EmailShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<CopyToClipboard copyValue={shareUrl} copyButtonText={copyButtonText} />
				</Styled.ShareContainer>
			</Modal>
		);
	}
}
