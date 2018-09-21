import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button/component.jsx';
// import { isIOSDevice } from '../../helpers/user-agent-helper';

export class CopyToClipboardButton extends React.Component {
	static propTypes = {
		getCopyTarget: PropTypes.func.isRequired,
		onCopy: PropTypes.func,
		copyButtonText: PropTypes.string,
		selectButtonText: PropTypes.string,
		useSelectFallback: PropTypes.bool,
	};

	state = {
		userAgentCanCopy: undefined,
	};

	componentDidMount() {
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({
			userAgentCanCopy: document.queryCommandSupported('copy'),
			showFeedback: false,
		});
	}

	componentWillUnmount() {
		if (this.feedbackTimer) clearTimeout(this.feedbackTimer);
	}

	copyToClipboard = () => {
		const { getCopyTarget, onCopy } = this.props;
		copyElementContents(getCopyTarget());
		this.setState({ showFeedback: true });

		if (!this.feedbackTimer) {
			this.feedbackTimer = setTimeout(() => {
				this.setState({ showFeedback: false });
				this.feedbackTimer = null;
			}, 2000);
		}

		if (typeof onCopy === 'function') {
			onCopy();
		}
	};

	selectInWindow = () => {
		const { getCopyTarget } = this.props;
		selectElementContents(getCopyTarget());
		this.setState({ showFeedback: true });

		if (!this.feedbackTimer) {
			this.feedbackTimer = setTimeout(() => {
				this.setState({ showFeedback: false });
				this.feedbackTimer = null;
			}, 2000);
		}
	};

	willRender() {
		const { userAgentCanCopy } = this.state;

		// Radium automatically prefixes radiumConfig with _
		// eslint-disable-next-line no-underscore-dangle
		const config = this.context._radiumConfig;
		const userAgent = config && config.userAgent;

		return userAgentCanCopy !== undefined && !isIOSDevice(userAgent);
	}

	render() {
		const { copyButtonText, selectButtonText, useSelectFallback } = this.props;
		const { userAgentCanCopy, showFeedback } = this.state;

		if (!this.willRender()) {
			return null;
		}

		let button;
		if (userAgentCanCopy) {
			button = (
				<Button primary medium condensed onClick={this.copyToClipboard}>
					{copyButtonText || 'Copy text'}
				</Button>
			);
		} else if (useSelectFallback) {
			button = (
				<Button primary medium onClick={this.selectInWindow}>
					{selectButtonText || 'Select all text'}
				</Button>
			);
		} else {
			return null;
		}

		return (
			<div>
				<div>{button}</div>
				{showFeedback && (
					<div>
						<div>{userAgentCanCopy ? 'Copied!' : 'Selected!'}</div>
					</div>
				)}
			</div>
		);
	}
}

function copyElementContents(element) {
	if (!element) {
		return;
	}

	if (element.select) {
		element.select();

		document.execCommand('copy');

		window.getSelection().removeAllRanges();
	} else {
		const range = document.createRange();
		range.selectNodeContents(element);

		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);

		document.execCommand('copy');

		selection.removeAllRanges();
	}
}

function selectElementContents(element) {
	if (!element) {
		return;
	}

	// Make element editable. Safari on iOS < 10 only supports setting selection on contentEditable=true elements.
	const originalContentEditableValue = element.contentEditable;
	if (originalContentEditableValue !== 'true') {
		element.contentEditable = 'true';
	}

	if (element.select) {
		element.select();
	} else {
		const range = document.createRange();
		range.selectNodeContents(element);

		const selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}

	element.contentEditable = originalContentEditableValue;
}

function isIOSDevice(userAgent) {
	return /iPad|iPhone|iPod/.test(userAgent);
}
