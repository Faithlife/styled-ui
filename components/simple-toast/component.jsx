import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { Box } from '../Box';
import { Text } from '../Text';
import { Button } from '../button';
import { Close } from '../icons';
import * as Styled from './styled.jsx';

const transitionTime = Styled.transitionTime; // milliseconds

/**
 * A mobile first Toast. A toast indicates that an action is being taken that does not require the user's
 * specific attention.
 */
export class SimpleToast extends PureComponent {
	static propTypes = {
		/** In milliseconds */
		showTime: PropTypes.number,
	};

	static defaultProps = {
		showTime: 1000,
	};

	state = {
		toastHasEntered: false,
		transitionIn: false,
		messages: [],
	};

	_showTimeout = null;

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
		this._showTimeout = setTimeout(this.triggerExit, this.props.showTime);
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
		const { padding, paddingY, paddingTop, paddingBottom, ...props } = this.props;
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
						onAnimationEnd={this.handleAnimationEnd}
						display="grid"
						gridAutoFlow="column"
						gridColumnGap={3}
						gridTemplateColumns="min-content"
						position="fixed"
						top={['55px', 'auto']}
						right={[null, '24px']}
						bottom={[null, '24px']}
						left={['50%', 'auto']}
						justifyItems={['center', 'left']}
						zIndex="1000"
						backgroundColor="white"
						borderRadius={1}
						boxShadow="0 19px 38px 0 rgba(0, 0, 0, 0.12), 0 15px 12px 0 rgba(0, 0, 0, 0.12)"
						opacity="0"
						textStyle="ui.18"
						paddingTop={
							isDefined(paddingTop)
								? paddingTop
								: isDefined(padding)
								? padding
								: isDefined(paddingY)
								? paddingY
								: ['10px', 5]
						}
						paddingBottom={
							isDefined(paddingBottom)
								? paddingBottom
								: isDefined(padding)
								? padding
								: isDefined(paddingY)
								? paddingY
								: ['10px', 5]
						}
						paddingX={isDefined(padding) ? padding : 5}
						height={['18px', '20px']}
						minWidth="285px"
						{...props}
					>
						{messages.length > 0 && messages[0].icon}
						{messages.length > 0 && <Text whiteSpace="nowrap">{messages[0].message}</Text>}
						<Box justifySelf="right">
							<Button minorTransparent icon={<Close />} onClick={this.triggerExit} />
						</Box>
					</Styled.ToastContainer>
				)}
			</Transition>
		);
	}
}

const isDefined = function(value) {
	return value !== undefined && value !== null;
};
