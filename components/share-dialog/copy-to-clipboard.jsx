import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard/dist/clipboard.min';
import debounce from 'lodash.debounce';
import { Button } from '../button';
import { Input } from '../input';
import * as Styled from './styled';

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

		// clipboard instance is destroyed when the component unmounts
		// eslint-disable-next-line mozilla/balanced-listeners
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
			<Styled.CopyContainer>
				{!hideInput && (
					<Input small type="text" readOnly value={copyValue} onClick={this.selectSelf} />
				)}
				<Button size="small" ref={this.button} data-clipboard-text={copyValue} variant="primary">
					{copyButtonText || 'Copy'}
				</Button>
				{showFeedback && <Styled.Copied>Copied!</Styled.Copied>}
			</Styled.CopyContainer>
		);
	}
}
