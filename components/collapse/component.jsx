import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { forwardClassRef, TransitionTimeouts, TransitionStatuses } from '../utils';
import { Box } from '../Box';

const propTypes = {
	...Transition.propTypes,
	isOpen: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

const defaultProps = {
	...Transition.defaultProps,
	isOpen: false,
	appear: false,
	enter: true,
	exit: true,
	timeout: TransitionTimeouts.Collapse,
};

function getHeight(node) {
	return node.scrollHeight;
}

/** Collapsable accordion component. Useful for nodes that have 'height: auto'. Ported from reactstrap */
export const Collapse = forwardClassRef(
	class Collapse extends Component {
		static propTypes = propTypes;
		static defaultProps = defaultProps;

		state = {
			height: null,
		};

		onEntering = (node, isAppearing) => {
			this.setState({ height: getHeight(node) });
			this.props.onEntering(node, isAppearing);
		};

		onEntered = (node, isAppearing) => {
			this.setState({ height: null });
			this.props.onEntered(node, isAppearing);
		};

		onExit = node => {
			this.setState({ height: getHeight(node) });
			this.props.onExit(node);
		};

		onExiting = node => {
			// getting this variable triggers a reflow
			const _unused = node.offsetHeight; // eslint-disable-line
			this.setState({ height: 0 });
			this.props.onExiting(node);
		};

		onExited = node => {
			this.setState({ height: null });
			this.props.onExited(node);
		};

		render() {
			const {
				isOpen,
				children,
				forwardedRef,
				in: transitionIn,
				mountOnEnter,
				unmountOnExit,
				appear,
				enter,
				exit,
				timeout,
				onEnter,
				onEntering,
				onEntered,
				onExit,
				onExiting,
				onExited,
				...otherProps
			} = this.props;

			const { height } = this.state;

			return (
				<Transition
					mountOnEnter={mountOnEnter}
					unmountOnExit={unmountOnExit}
					appear={appear}
					enter={enter}
					exit={exit}
					timeout={timeout}
					onEnter={onEnter}
					in={isOpen}
					onEntering={this.onEntering}
					onEntered={this.onEntered}
					onExit={this.onExit}
					onExiting={this.onExiting}
					onExited={this.onExited}
				>
					{status => {
						const style = height === null ? null : { height };
						return (
							<Box
								{...otherProps}
								transitionStatus={status}
								style={{ ...otherProps.style, ...style }}
								ref={forwardedRef}
								display={status === TransitionStatuses.EXITED ? 'none' : undefined}
								position={
									status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING
										? 'relative'
										: ''
								}
								height={
									status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING
										? '0'
										: ''
								}
								transition={
									status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING
										? 'height 0.2s ease-in'
										: ''
								}
								css={`
									${status === TransitionStatuses.ENTERING || status === TransitionStatuses.EXITING
										? 'overflow: hidden'
										: ''}
								`}
							>
								{children}
							</Box>
						);
					}}
				</Transition>
			);
		}
	},
);
