import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/';
import {
	FaithlifeShareButton,
	TwitterShareButton,
	FacebookShareButton,
	EmailShareButton,
} from './social-share-buttons';
import { CopyToClipboard } from './copy-to-clipboard';
import * as Styled from './styled';

/**
 * Branded Faithlife modal to share a link to social platforms
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

	static defaultProps = {
		modalTitle: 'Share this page',
	};

	render() {
		const { shareUrl, message, onClose, isOpen, modalTitle, copyButtonText } = this.props;

		const encodedShareUrl = encodeURIComponent(shareUrl);
		const encodedMessage = message ? encodeURIComponent(message) : '';

		return (
			<Modal isOpen={isOpen} onClose={onClose} container="body" contentPadding={6}>
				<Modal.Header title={modalTitle} textStyle="h.24" />
				<Modal.Content>
					<Styled.ShareContainer>
						<Styled.ButtonContainer>
							<FaithlifeShareButton
								encodedShareUrl={encodedShareUrl}
								encodedMessage={encodedMessage}
							/>
							<TwitterShareButton
								encodedShareUrl={encodedShareUrl}
								encodedMessage={encodedMessage}
							/>
							<FacebookShareButton encodedShareUrl={encodedShareUrl} />
							<EmailShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
						</Styled.ButtonContainer>
						<CopyToClipboard copyValue={shareUrl} copyButtonText={copyButtonText} />
					</Styled.ShareContainer>
				</Modal.Content>
			</Modal>
		);
	}
}
