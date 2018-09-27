import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import debounce from 'lodash.debounce';
import { Button } from '../button/component.jsx';
import { Input } from '../input/component.jsx';
import * as Styled from './styled.jsx';

export class CopyToClipboard extends React.Component {
	static propTypes = {
		copyValue: PropTypes.string.isRequired,
		copyButtonText: PropTypes.string,
		hideInput: PropTypes.bool,
	};

	button = React.createRef();
	state = {
		showFeedback: false,
	};

	componentDidMount() {
		const button = this.button.current;

		this.clipboard = new Clipboard(button);

		this.clipboard.on('success', () => {
			this.showFeedback();
		});
	}

	componentWillUnmount() {
		this.clipboard.destroy();
	}

	showFeedback = () => {
		this.setState({ showFeedback: true });
		this.hideFeedback();
	};

	hideFeedback = debounce(() => {
		this.setState({ showFeedback: false });
	}, 2000);

	selectSelf = e => e.target.select();

	render() {
		const { copyValue, copyButtonText, hideInput } = this.props;
		const { showFeedback } = this.state;

		return (
			<Styled.ShareContainer>
				{!hideInput && (
					<Styled.CopyContainer>
						<Input small type="text" readOnly value={copyValue} onClick={this.selectSelf} />
					</Styled.CopyContainer>
				)}
				<div>
					<Button small ref={this.button} data-clipboard-text={copyValue} primary>
						{copyButtonText || 'Copy'}
					</Button>
					{showFeedback && <Styled.Copied>Copied!</Styled.Copied>}
				</div>
			</Styled.ShareContainer>
		);
	}
}
