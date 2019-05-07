import React from 'react';
import PropTypes from 'prop-types';
import { filterChildProps, forwardClassRef } from '../utils';
import { BaseButton } from './base-button';
import { baseButtonProps } from './button-utils';
import * as Styled from './styled';

/** Standard button with transition styles */
export const Button = forwardClassRef(
	class Button extends React.Component {
		static propTypes = {
			...BaseButton.propTypes,
			/** The type of button (for instance, submit) */
			type: PropTypes.string,
			/** This should only be used as a last resort if Theme and StyleOverrides will not do what you need */
			className: PropTypes.string,
		};

		static defaultProps = {
			type: 'button',
		};

		render() {
			const [{ forwardedRef, ...buttonProps }, baseProps] = filterChildProps(
				this.props,
				baseButtonProps,
			);
			return (
				<Styled.Button ref={forwardedRef} {...buttonProps}>
					<BaseButton {...baseProps} />
				</Styled.Button>
			);
		}
	},
);
