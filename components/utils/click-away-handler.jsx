import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactEventListener from 'react-event-listener';
import styled from 'styled-components';

const reactRef = PropTypes.shape({
	current: PropTypes.instanceOf(HTMLElement),
});

export class ClickAwayHandler extends Component {
	static propTypes = {
		/** Which mouse events should trigger the handler */
		mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp']),
		/** Which touch events should trigger the handler */
		touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd']),
		/** Callback for when the element is clicked away from */
		onClick: PropTypes.func,
		/** Optional ref or array of refs that are also inbounds */
		inboundsElements: PropTypes.oneOfType([reactRef, PropTypes.arrayOf(reactRef)]),
		children: PropTypes.node,
	};

	static defaultProps = {
		mouseEvent: 'onMouseDown',
		touchEvent: 'onTouchStart',
	};

	targetRef = React.createRef();

	handleClick = event => {
		const { onClick, inboundsElements } = this.props;

		if (
			this.targetRef.current &&
			!this.targetRef.current.contains(event.target) &&
			(Array.isArray(inboundsElements)
				? !inboundsElements.some(ref => ref.current && ref.current.contains(event.target))
				: !inboundsElements ||
				  !inboundsElements.current ||
				  !inboundsElements.current.contains(event.target))
		) {
			onClick(event);
		}
	};

	render() {
		const { mouseEvent, touchEvent, children, onClick } = this.props;

		if (!onClick || (!mouseEvent && !touchEvent)) {
			return children;
		}

		return (
			<ContainerDiv ref={this.targetRef}>
				{children}
				<ReactEventListener
					target="document"
					{...(mouseEvent ? { [mouseEvent]: this.handleClick } : {})}
					{...(touchEvent ? { [touchEvent]: this.handleClick } : {})}
				/>
			</ContainerDiv>
		);
	}
}

const ContainerDiv = styled.div`
	margin: 0;
	display: inline-block;
`;
