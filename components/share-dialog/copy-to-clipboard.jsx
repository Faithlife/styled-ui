import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Button } from '../button/component.jsx';
import { Input } from '../input/component.jsx';
import * as Styled from './styled.jsx';

export class CopyToClipboard extends React.Component {
	static propTypes = {
		clipboard: PropTypes.func.isRequired,
		copyValue: PropTypes.string.isRequired,
		copyButtonText: PropTypes.string,
		hideInput: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.input = React.createRef();
		this.button = React.createRef();

		this.state = {
			showFeedback: false,
		};
	}
	componentDidMount() {
		const button = this.button.current;
		const input = this.input.current;

		const Clipboard = this.props.clipboard;
		this.clipboard = new Clipboard(button);

		this.clipboard.on('success', () => {
			this.showFeedback();
		});

		this.clipboard.on('error', () => {
			input.select();
		});
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
						<Input
							ref={this.input}
							type="text"
							readOnly
							value={copyValue}
							onClick={this.selectSelf}
						/>
					</Styled.CopyContainer>
				)}
				<div>
					<Button ref={this.button} data-clipboard-text={copyValue} primary medium condensed>
						{copyButtonText || 'Copy text'}
					</Button>
					{showFeedback && <Styled.Copied>Copied!</Styled.Copied>}
				</div>
			</Styled.ShareContainer>
		);
	}
}
