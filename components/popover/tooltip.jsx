import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { Popover } from './component';
import { PopoverManager, PopoverReference } from './popper-helpers';

/** Simple tooltip that uses popovers internally. Does not support custom positioning. */
export class Tooltip extends Component {
	static propTypes = {
		...Popover.propTypes,

		/** Content for the tooltip */
		content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
		/** Text for the tooltip (deprecated) */
		text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	};

	state = {
		tooltipIsOpen: false,
	};

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
		const { children, text, content, isOpen, ...otherProps } = this.props;
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
					{content || text}
				</Popover>
			</PopoverManager>
		);
	}
}
