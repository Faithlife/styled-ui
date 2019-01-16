// Ported from https://github.com/reactstrap/reactstrap/blob/1b27c495ed917a14fea32624da7894b3ffab2f39/src/Collapse.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';
import { forwardClassRef } from '../utils';
import {
	omit,
	pick,
	TransitionTimeouts,
	TransitionPropTypeKeys,
	TransitionStatuses,
} from './utils';

const CollapseDiv = styled.div`
	${props =>
		props.transitionStatus === TransitionStatuses.ENTERING ||
		props.transitionStatus === TransitionStatuses.EXITING
			? `
		position: relative;
		height: 0;
		overflow: hidden;
		transition: height 0.2s ease-in;
	`
			: ''};

	${props => (props.transitionStatus === TransitionStatuses.EXITED ? `display: none` : '')};
`;

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
		constructor(props) {
			super(props);

			this.state = {
				height: null,
			};

			['onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited'].forEach(name => {
				this[name] = this[name].bind(this);
			});
		}

		static propTypes = propTypes;
		static defaultProps = defaultProps;

		onEntering(node, isAppearing) {
			this.setState({ height: getHeight(node) });
			this.props.onEntering(node, isAppearing);
		}

		onEntered(node, isAppearing) {
			this.setState({ height: null });
			this.props.onEntered(node, isAppearing);
		}

		onExit(node) {
			this.setState({ height: getHeight(node) });
			this.props.onExit(node);
		}

		onExiting(node) {
			// getting this variable triggers a reflow
			const _unused = node.offsetHeight; // eslint-disable-line
			this.setState({ height: 0 });
			this.props.onExiting(node);
		}

		onExited(node) {
			this.setState({ height: null });
			this.props.onExited(node);
		}

		render() {
			const { isOpen, children, forwardedRef, ...otherProps } = this.props;

			const { height } = this.state;

			// In NODE_ENV=production the Transition.propTypes are wrapped which results in an
			// empty object "{}". This is the result of the `react-transition-group` babel
			// configuration settings. Therefore, to ensure that production builds work without
			// error, we can either explicitly define keys or use the Transition.defaultProps.
			// Using the Transition.defaultProps excludes any required props. Thus, the best
			// solution is to explicitly define required props in our utilities and reference these.
			// This also gives us more flexibility in the future to remove the prop-types
			// dependency in distribution builds (Similar to how `react-transition-group` does).
			// Note: Without omitting the `react-transition-group` props, the resulting child
			// Tag component would inherit the Transition properties as attributes for the HTML
			// element which results in errors/warnings for non-valid attributes.
			const transitionProps = pick(otherProps, TransitionPropTypeKeys);
			const childProps = omit(otherProps, TransitionPropTypeKeys);

			return (
				<Transition
					{...transitionProps}
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
							<CollapseDiv
								{...childProps}
								onClick={this.handleClick}
								transitionStatus={status}
								style={{ ...childProps.style, ...style }}
								ref={forwardedRef}
							>
								{children}
							</CollapseDiv>
						);
					}}
				</Transition>
			);
		}
	},
);
