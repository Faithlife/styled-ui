import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Manager } from 'react-popper';
import { ClickAwayHandler } from '../utils';
import { PopoverContext } from './popper-helpers';

export class PopoverManager extends Component {
	static propTypes = {
		/** Will be called when the popover OR popover-reference is clicked away from */
		onClickAway: PropTypes.func,
		children: PropTypes.node,
	};

	state = {
		context: {
			togglePopover: this.props.onClickAway,
			popoverContainerRef: React.createRef(),
		},
	};

	render() {
		const { onClickAway, children } = this.props;
		const { context } = this.state;

		return (
			<Manager>
				<ClickAwayHandler onClick={onClickAway} inboundsElements={context.popoverContainerRef}>
					<PopoverContext.Provider value={context}>{children}</PopoverContext.Provider>
				</ClickAwayHandler>
			</Manager>
		);
	}
}
