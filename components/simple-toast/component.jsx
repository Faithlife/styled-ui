import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

const ToastStates = Styled.ToastStates;

/**
 * A mobile first Toast. A toast indicates that an action is being taken that does not require the user's
 * specific attention.
 */
export class SimpleToast extends PureComponent {
	static propTypes = {
		theme: PropTypes.shape({
			backgroundColor: PropTypes.string,
		}),
		styleOverrides: PropTypes.shape({
			width: PropTypes.string,
			height: PropTypes.string,
			zIndex: PropTypes.number,
			/** Only for mobile view */
			topOffset: PropTypes.string,
			/** Only used for desktop view */
			rightOffset: PropTypes.string,
			bottomOffset: PropTypes.string,
		}),
	};

	static defaultProps = {
		theme: {},
		styleOverrides: {},
	};

	state = {
		toastState: ToastStates.hidden,
		messages: [],
	};

	/** Accepts an object with a required `message` and an optional `icon` property */
	showMessage = newMessage => {
		if (newMessage.message) {
			this.setState(prevState => ({
				toastState:
					prevState.toastState === ToastStates.showing ? ToastStates.hiding : ToastStates.showing,
				messages: [...prevState.messages, newMessage],
			}));
		}
	};

	handleAnimationEnd = () => {
		const { toastState, messages } = this.state;
		if (toastState === ToastStates.shown) {
			this.setState({ toastState: ToastStates.hiding });
			return;
		}

		if (toastState === ToastStates.showing) {
			this.setState({ toastState: messages.length > 1 ? ToastStates.hiding : ToastStates.shown });
			return;
		}

		if (toastState === ToastStates.hiding) {
			const newMessages = [...messages];
			newMessages.shift();

			if (newMessages.length > 0) {
				this.setState({ toastState: ToastStates.showing, messages: newMessages });
			} else {
				this.setState({ toastState: ToastStates.hidden, messages: [] });
			}
		}
	};

	render() {
		const { theme, styleOverrides } = this.props;
		const { messages, toastState } = this.state;

		return (
			<Styled.ToastContainer
				state={toastState}
				theme={theme}
				styleOverrides={styleOverrides}
				onAnimationEnd={this.handleAnimationEnd}
			>
				{messages.length > 0 && messages[0].icon}
				{messages.length > 0 && <Styled.ToastContent>{messages[0].message}</Styled.ToastContent>}
			</Styled.ToastContainer>
		);
	}
}
