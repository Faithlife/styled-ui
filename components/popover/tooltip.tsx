import React, { Component, ReactNode } from 'react';
import debounce from 'lodash.debounce';
import { Popover, Props as PopoverProps } from './component';
import { PopoverManager, PopoverReference } from './popper-helpers';

type Props = Partial<PopoverProps> & {
	text: string | ReactNode;
};

const initialState = {
	tooltipIsOpen: false,
};

type State = Readonly<typeof initialState>;

/** Simple tooltip that uses popovers internally. Does not support custom positioning. */
export class Tooltip extends Component<Props, State> {
	readonly state: State = initialState;

	componentWillUnmount() {
		this.handleMouseLeave.cancel();
	}

	hideTooltip = () => {
		this.setState({ tooltipIsOpen: false });
	};

	handleMouseLeave = debounce(() => {
		this.setState({ tooltipIsOpen: false });
	}, 200);

	handleMouseEnter = () => {
		this.handleMouseLeave.cancel();
		this.setState({ tooltipIsOpen: true });
	};

	render() {
		const { children, text, isOpen, ...otherProps } = this.props;
		const { tooltipIsOpen } = this.state;
		return (
			<PopoverManager>
				<PopoverReference
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
					onClick={this.hideTooltip}
				>
					{children}
				</PopoverReference>
				<Popover {...otherProps} isOpen={tooltipIsOpen || isOpen}>
					{text}
				</Popover>
			</PopoverManager>
		);
	}
}
