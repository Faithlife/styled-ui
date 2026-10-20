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

		nodeRef = React.createRef();
		refTarget = null;
		refCallback = null;

		state = {
			height: null,
		};

		getRef = forwardedRef => {
			if (this.refCallback === null || this.refTarget !== forwardedRef) {
				this.refTarget = forwardedRef;
				this.refCallback = node => {
					this.nodeRef.current = node;

					if (typeof forwardedRef === 'function') {
						const cleanup = forwardedRef(node);
						if (node !== null && typeof cleanup === 'function') {
							return () => {
								if (this.nodeRef.current === node) {
									this.nodeRef.current = null;
								}
								cleanup();
							};
						}
					} else if (forwardedRef) {
						forwardedRef.current = node;
					}
				};
			}

			return this.refCallback;
		};

		onEntering = isAppearing => {
			const node = this.nodeRef.current;
			this.setState({ height: getHeight(node) });
			this.props.onEntering(node, isAppearing);
		};

		onEntered = isAppearing => {
			const node = this.nodeRef.current;
			this.setState({ height: null });
			this.props.onEntered(node, isAppearing);
		};

		onExit = () => {
			const node = this.nodeRef.current;
			this.setState({ height: getHeight(node) });
			this.props.onExit(node);
		};

		onExiting = () => {
			const node = this.nodeRef.current;
			// getting this variable triggers a reflow
			const _unused = node.offsetHeight; // eslint-disable-line
			this.setState({ height: 0 });
			this.props.onExiting(node);
		};

		onExited = () => {
			const node = this.nodeRef.current;
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
					nodeRef={this.nodeRef}
					mountOnEnter={mountOnEnter}
					unmountOnExit={unmountOnExit}
					appear={appear}
					enter={enter}
					exit={exit}
					timeout={timeout}
					onEnter={isAppearing => onEnter(this.nodeRef.current, isAppearing)}
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
								ref={this.getRef(forwardedRef)}
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
