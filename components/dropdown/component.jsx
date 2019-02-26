import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PopoverManager } from '../popover';
import { DropdownContext } from './dropdown-helpers';

export class Dropdown extends Component {
	static propTypes = {
		children: PropTypes.node,
	};

	constructor(props) {
		super(props);

		this.handleToggleDropdown = () => {
			this.setState(({ context }) => ({
				context: { ...context, isDropdownOpen: !context.isDropdownOpen },
			}));
		};

		this.handleCloseDropdown = onClickHandler => event => {
			this.setState(({ context }) => ({ context: { ...context, isDropdownOpen: false } }));
			onClickHandler(event);
		};

		this.state = {
			context: {
				handleToggleDropdown: this.handleToggleDropdown,
				handleCloseDropdown: this.handleCloseDropdown,
				isDropdownOpen: false,
			},
		};
	}

	handleClickAway = () => {
		const {
			context: { isDropdownOpen },
		} = this.state;

		if (isDropdownOpen) {
			this.setState(({ context }) => ({ context: { ...context, isDropdownOpen: false } }));
		}
	};

	render() {
		const { children } = this.props;
		const { context } = this.state;

		return (
			<DropdownContext.Provider value={context}>
				<PopoverManager onClickAway={this.handleClickAway}>{children}</PopoverManager>
			</DropdownContext.Provider>
		);
	}
}
