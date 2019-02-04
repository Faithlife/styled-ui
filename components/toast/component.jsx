import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';

const ToastStates = Styled.ToastStates;

/**
 * A mobile first Toast. A toast indicates that an action is being taken that does not require the user's
 * specific attention.
 */
export class Toast extends PureComponent {
	static propTypes = {
		/** SVG Icon */
		icon: PropTypes.node,
		/** Toast Content */
		message: PropTypes.string,
		theme: PropTypes.shape({
			backgroundColor: PropTypes.string,
		}),
		styleOverrides: PropTypes.shape({
			width: PropTypes.string,
			height: PropTypes.string,
			rightOffset: PropTypes.string,
			bottomOffset: PropTypes.string,
			/** Only for mobile view */
			topOffset: PropTypes.string,
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

	componentDidUpdate = (prevProps, prevState) => {
		const { message } = this.props;
		if (
			!!message &&
			prevProps.message !== message &&
			!prevState.messages.some(item => item === message)
		) {
			this.setState({
				toastState:
					prevState.toastState === ToastStates.showing ? ToastStates.hiding : ToastStates.showing,
				messages: [...prevState.messages, message],
			});
		}
	};

	handleAnimationEnd = () => {
		const { toastState, messages } = this.state;
		if (toastState === ToastStates.showing) {
			this.setState({ toastState: ToastStates.hiding });
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
		const { icon, theme, styleOverrides } = this.props;
		const { messages, toastState } = this.state;

		return (
			<Styled.ToastContainer
				state={toastState}
				theme={theme}
				styleOverrides={styleOverrides}
				onAnimationEnd={this.handleAnimationEnd}
			>
				{icon}
				{messages.length > 0 && <Styled.ToastContent>{messages[0]}</Styled.ToastContent>}
			</Styled.ToastContainer>
		);
	}
}
