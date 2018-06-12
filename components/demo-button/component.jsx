import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { applyVariations } from '../utils';
import * as Styled from './styled.jsx';

/** Standard button with transition styles */
export default class Button extends PureComponent {
	static propTypes = {
		/** The contents of the button (can be text, svg, or other element) */
		children: PropTypes.node.isRequired,
		/** An optional theme */
		theme: PropTypes.shape({
			default: PropTypes.string,
			hover: PropTypes.string,
			active: PropTypes.string,
			disabled: PropTypes.string,
		}),
		/** Primary button variation */
		primary: PropTypes.bool,
		/** Primary outline variation */
		primaryOutline: PropTypes.bool,
		/** Medium variation */
		medium: PropTypes.bool,
		/** Small variation */
		small: PropTypes.bool,
		/** Large variation */
		large: PropTypes.bool,
		/** Extra large variation */
		extraLarge: PropTypes.bool,
		/** The type of button (for instance, submit) */
		type: PropTypes.string,
		/** Whitelisted styles. */
		style: PropTypes.shape({
			width: PropTypes.string,
		}),
	};

	static defaultProps = {
		theme: {
			default: '#278ed4',
			hover: '#6db3e2',
			active: '#1d6ca1',
			disabled: '#bedcf2',
		},
		type: 'button',
	};

	render() {
		const { children, theme, ...buttonProps } = this.props;

		const { component: MappedStyledComponent, filteredProps } = applyVariations(
			Styled.Button,
			Styled.variationMap,
			buttonProps,
		);

		return (
			<MappedStyledComponent theme={theme} {...filteredProps || {}}>
				{children}
			</MappedStyledComponent>
		);
	}
}
