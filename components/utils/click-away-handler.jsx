import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactEventListener from 'react-event-listener';

export class ClickAwayHandler extends Component {
	static propTypes = {
		/** Which mouse events should trigger the handler */
		mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp']),
		/** Which touch events should trigger the handler */
		touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd']),
		/** Callback for when the element is clicked away from */
		onClick: PropTypes.func,
		children: PropTypes.node,
	};

	targetRef = React.createRef();

	handleClick = event => {
		const { onClick } = this.props;

		if (this.targetRef.current && !this.targetRef.current.contains(event.target)) {
			onClick(event);
		}
	};

	render() {
		const { mouseEvent, touchEvent, children, onClick } = this.props;

		if (!onClick || (!mouseEvent && !touchEvent)) {
			return children;
		}

		return (
			<div ref={this.targetRef}>
				{children}
				<ReactEventListener
					target="document"
					{...(mouseEvent ? { [mouseEvent]: this.handleClick } : {})}
					{...(touchEvent ? { [touchEvent]: this.handleClick } : {})}
				/>
			</div>
		);
	}
}
