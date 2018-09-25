import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button/component.jsx';
import * as Styled from './styled.jsx';

export class CopyToClipboard extends React.Component {
	static propTypes = {
		clipboard: PropTypes.func.isRequired,
		copyValue: PropTypes.string.isRequired,
		copyButtonText: PropTypes.string,
		hideInput: PropTypes.bool,
	};

	state = {
		showFeedback: false,
	};

	componentDidMount() {
		const button = this.button;

		const Clipboard = this.props.clipboard;
		this.clipboard = new Clipboard(button);

		this.clipboard.on('success', () => {
			this.toggleFeedback();
		});
	}

	toggleFeedback = () => {
		this.setState(prevState => ({ showFeedback: !prevState.showFeedback }));
	};

	selectSelf = e => e.target.select();

	render() {
		const { copyValue, copyButtonText, hideInput } = this.props;
		const { showFeedback } = this.state;

		return (
			<Styled.ShareContainer>
				{!hideInput && (
					<Styled.CopyContainer>
						<Styled.Input type="text" readOnly value={copyValue} onClick={this.selectSelf} />
					</Styled.CopyContainer>
				)}
				<div>
					<Button
						ref={element => {
							this.button = element;
						}}
						data-clipboard-text={copyValue}
						primary
						medium
						condensed
					>
						{copyButtonText || 'Copy text'}
					</Button>
				</div>
				{showFeedback && (
					<div>
						<div>Copied!</div>
					</div>
				)}
			</Styled.ShareContainer>
		);
	}
}
