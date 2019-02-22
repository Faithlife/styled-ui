import React, { Component, ReactNode, RefObject, MouseEvent, TouchEvent } from 'react';
import ReactEventListener from 'react-event-listener';

type Props = {
	/** Which mouse events should trigger the handler */
	mouseEvent: 'onClick' | 'onMouseDown' | 'onMouseUp';
	/** Which touch events should trigger the handler */
	touchEvent: 'onTouchStart' | 'onTouchEnd';
	/** Callback for when the element is clicked away from */
	onClick?: ((event: MouseEvent | TouchEvent) => void);
	children?: ReactNode;
};

export class ClickAwayHandler extends Component<Props> {
	static defaultProps: Props = {
		mouseEvent: 'onMouseDown',
		touchEvent: 'onTouchStart',
	};

	private targetRef: RefObject<any> = React.createRef();

	handleClick = (event: MouseEvent | TouchEvent) => {
		const { onClick } = this.props;

		if (
			typeof onClick !== 'undefined' &&
			this.targetRef.current &&
			!this.targetRef.current.contains(event.target)
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
