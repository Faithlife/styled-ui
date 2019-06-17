import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { mediaSizes } from '../shared-styles';
import { Close } from '../icons';
import * as Styled from './styled.jsx';

const transitionTime = Styled.transitionTime; // milliseconds

/**
 * A mobile first Toast. A toast indicates that an action is being taken that does not require the user's
 * specific attention.
 */
export class SimpleToast extends PureComponent {
	static propTypes = {
		/** Show time on desktop in milliseconds */
		desktopTime: PropTypes.number,
		/** Show time on mobile in milliseconds */
		mobileTime: PropTypes.number,
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
		desktopTime: 5000,
		mobileTime: 1000,
		theme: {},
		styleOverrides: {},
	};

	state = {
		toastHasEntered: false,
		transitionIn: false,
		messages: [],
	};

	_showDuration = null;
	_showTimeout = null;

	componentDidMount() {
		if (window) {
			this._showDuration = window.matchMedia(`(min-width: ${mediaSizes.tablet})`).matches
				? this.props.desktopTime
				: this.props.mobileTime;
		}
	}

	componentWillUnmount() {
		clearTimeout(this._showTimeout);
	}

	/** Accepts an object with a required `message` and an optional `icon` property */
	showMessage = newMessage => {
		if (newMessage.message) {
			this.setState(prevState => ({
				transitionIn: !prevState.toastHasEntered,
				messages: [...prevState.messages, newMessage],
			}));
		}
	};

	triggerExit = () => this.setState({ transitionIn: false });

	handleEntered = () => {
		const { messages } = this.state;
		this.setState({ toastHasEntered: true, transitionIn: messages.length === 1 });
		this._showTimeout = setTimeout(this.triggerExit, this._showDuration);
	};

	handleExited = () => {
		const { messages } = this.state;
		const newMessages = [...messages];
		newMessages.shift();

		clearTimeout(this._showTimeout);
		this.setState({
			messages: newMessages,
			toastHasEntered: false,
			transitionIn: newMessages.length > 0,
		});
	};

	render() {
		const { theme, styleOverrides } = this.props;
		const { messages, transitionIn } = this.state;
		const hasMultipleMessages = messages.length > 1;

		return (
			<Transition
				in={transitionIn}
				timeout={{
					enter: transitionTime,
					exit: hasMultipleMessages ? transitionTime / 2 : transitionTime,
				}}
				onEntered={this.handleEntered}
				onExited={this.handleExited}
			>
				{state => (
					<Styled.ToastContainer
						state={state}
						theme={theme}
						styleOverrides={styleOverrides}
						onAnimationEnd={this.handleAnimationEnd}
					>
						{messages.length > 0 && messages[0].icon}
						{messages.length > 0 && (
							<Styled.ToastContent>{messages[0].message}</Styled.ToastContent>
						)}
						<Styled.ToastClose onClick={this.triggerExit}>
							<Close />
						</Styled.ToastClose>
					</Styled.ToastContainer>
				)}
			</Transition>
		);
	}
}
