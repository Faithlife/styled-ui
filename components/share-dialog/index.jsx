import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal/modal.jsx';
import {
	FaithlifeShareButton,
	TwitterShareButton,
	FacebookShareButton,
	EmailShareButton,
} from './social-share-buttons.jsx';
import { CopyToClipboardButton } from './copy-to-clipboard-button.jsx';
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

	getCopyTarget(copyText) {
		return (
			<Styled.Input
				type="text"
				readOnly
				value={copyText}
				onClick={selectSelf}
				ref={e => {
					this.copyTarget = e;
				}}
			/>
		);
	}

	render() {
		const { shareUrl, message, onClose, isOpen } = this.props;

		const encodedShareUrl = encodeURIComponent(shareUrl);
		const encodedMessage = message ? encodeURIComponent(message) : '';
		const copyTargetElement = this.getCopyTarget(shareUrl);

		return (
			<Modal isOpen={isOpen} onClose={onClose} title="Share this page">
				<Styled.ShareContainer>
					<FaithlifeShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<TwitterShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<FacebookShareButton encodedShareUrl={encodedShareUrl} />
					<EmailShareButton encodedShareUrl={encodedShareUrl} encodedMessage={encodedMessage} />
					<Styled.ShareContainer>
						<Styled.CopyContainer>{copyTargetElement}</Styled.CopyContainer>
						<CopyToClipboardButton getCopyTarget={() => this.copyTarget} copyButtonText="Copy" />
					</Styled.ShareContainer>
				</Styled.ShareContainer>
			</Modal>
		);
	}
}

const selectSelf = e => e.target.select();
