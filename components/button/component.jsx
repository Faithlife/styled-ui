import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled.jsx';
import { BaseButton } from './base-button.jsx';

/** Standard button with transition styles */
export class Button extends PureComponent {
	static propTypes = {
		...BaseButton.propTypes,
		/** The type of button (for instance, submit) */
		type: PropTypes.string,
	};

	static defaultProps = {
		type: 'button',
	};

	render() {
		return <BaseButton baseComponent={Styled.Button} {...this.props} />;
	}
}
