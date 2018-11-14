import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popover } from './component.jsx';
import { PopoverManager, PopoverReference } from './popper-helpers.jsx';

export class Tooltip extends Component {
	static propTypes = {
		...Popover.propTypes,

		/** Text for the tooltip */
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	};

	state = {
		tooltipIsOpen: false,
	};

	showTooltip = () => this.setState({ tooltipIsOpen: true });

	hideTooltip = () => this.setState({ tooltipIsOpen: false });

	render() {
		const { children, text, isOpen, ...otherProps } = this.props;
		const { tooltipIsOpen } = this.state;
		return (
			<PopoverManager>
				<PopoverReference>
					<div onMouseEnter={this.showTooltip} onMouseLeave={this.hideTooltip}>
						{children}
					</div>
				</PopoverReference>
				<Popover {...otherProps} isOpen={tooltipIsOpen || isOpen}>
					{text}
				</Popover>
			</PopoverManager>
		);
	}
}
