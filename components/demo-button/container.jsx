import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DemoComponent from './component.jsx';

export default class DemoContainer extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
		onClick: PropTypes.func,
		theme: PropTypes.object,
	};

	state = {
		clicked: false,
	};

	onChange = newState => {
		this.setState(
			{
				...newState,
			},
			this.props.onClick,
		);
	};

	render() {
		return (
			<div>
				<DemoComponent
					clicked={this.state.clicked}
					onChange={this.onChange}
					theme={this.props.theme}
					variations={['clicked']}
				>
					{this.props.children}
				</DemoComponent>
				<DemoComponent
					clicked={this.state.clicked}
					onChange={this.onChange}
					theme={this.props.theme}
					variations={['primarySmall']}
				>
					{this.props.children}
				</DemoComponent>
				<DemoComponent
					clicked={this.state.clicked}
					onChange={this.onChange}
					theme={this.props.theme}
					variations={['primaryLarge']}
				>
					{this.props.children}
				</DemoComponent>
				<DemoComponent
					clicked={this.state.clicked}
					onChange={this.onChange}
					theme={this.props.theme}
					variations={['primaryExtraLarge']}
				>
					{this.props.children}
				</DemoComponent>
			</div>
		);
	}
}
