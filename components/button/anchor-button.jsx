import React from 'react';
import PropTypes from 'prop-types';
import { filterChildProps, forwardClassRef } from '../utils';
import { BaseButton } from './base-button';
import { baseButtonProps } from './button-utils';

/** Standard button with transition styles */
export const AnchorButton = forwardClassRef(
	class AnchorButton extends React.Component {
		static propTypes = {
			...BaseButton.propTypes,
			/** The destination the AnchorButton should link to. */
			href: PropTypes.string,
			/** This should only be used as a last resort if Theme and StyleOverrides will not do what you need */
			className: PropTypes.string,
		};

		render() {
			const [{ forwardedRef, ...buttonProps }, baseProps] = filterChildProps(
				this.props,
				baseButtonProps,
			);
			return <BaseButton ref={forwardedRef} as="a" {...baseProps} {...buttonProps} />;
		}
	},
);
