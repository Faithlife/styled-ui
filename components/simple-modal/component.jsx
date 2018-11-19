import React from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { ModalBackdrop } from '../modal-backdrop';
import { Close } from '../icons';
import { debouncedResize } from '../utils';
import * as Styled from './styled';

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
		canUseDom: false,
	};

	componentDidMount() {
		const { cancel } = debouncedResize(this.handleResize);
		this.cancelResizeListener = cancel;
		this.setState({ canUseDom: true }); // eslint-disable-line
	}

	componentWillUnmount() {
		if (this.cancelResizeListener) this.cancelResizeListener();
	}

	handleResize = () => {
		if (this._modal) {
			this.setState({ modalWidth: this._modal.clientWidth });
		}
	};

	renderModal() {
		const { theme, onClose, children } = this.props;
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

	render() {
		if (!this.props.isOpen || !this.state.canUseDom) {
			return null;
		}

		return createPortal(this.renderModal(), document.body);
	}
}
