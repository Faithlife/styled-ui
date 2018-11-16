import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BaseButton } from './base-button';
import * as Styled from './styled';

export class AnchorButton extends PureComponent {
	static propTypes = {
		...BaseButton.propTypes,
		/** The destination the AnchorButton should link to. */
		href: PropTypes.string,
	};

	render() {
		return <BaseButton baseComponent={Styled.Anchor} {...this.props} />;
	}
}
