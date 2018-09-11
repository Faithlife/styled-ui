import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { ModalBackdrop } from '../modal-backdrop/component.jsx'
import { Close } from '../icons';
import { debouncedResize } from '../utils';
import * as Styled from './styled.jsx';

/**
 * SimpleModal
 */
export class SimpleModal extends React.Component {
	static propTypes = {
		/** controls state of modal */
		isOpen: PropTypes.bool.isRequired,
		/** Callback function for when the modal is close  */
		onClose: PropTypes.func.isRequired,
		/** Contents of the modal */
		children: PropTypes.node.isRequired,
		/** Customizable theme properties */
		theme: PropTypes.object,
	};

	static defaultProps = {
		theme: {
			background: 'white',
		},
	};

	state = {
		modalWidth: null,
	};

	componentDidMount() {
		const { cancel } = debouncedResize(this.handleResize);
		this.cancelResizeListener = cancel;
	}

	componentWillUnmount() {
		if (this.cancelResizeListener) this.cancelResizeListener();
	}

	handleResize = () => {
		if (this._modal) {
			this.setState({ modalWidth: this._modal.clientWidth });
		}
	};

	render() {
		const { theme, onClose, isOpen, children } = this.props;

		if (!isOpen) {
			return null;
		}

		const { modalWidth } = this.state;

		return (
			<ThemeProvider theme={{ ...theme }}>
				<ModalBackdrop onClose={onClose}>
					<Styled.SimpleModal
						innerRef={modal => {
							this._modal = modal;
							if (modal && modalWidth === null) this.setState({ modalWidth: modal.clientWidth });
						}}
					>
						<Styled.ModalClose onClick={onClose}>
							<Close />
						</Styled.ModalClose>
						{children}
					</Styled.SimpleModal>
				</ModalBackdrop>
			</ThemeProvider>
		);
	}
}
