import React, { PureComponent } from 'react';
import { BaseButton, SharedButtonPropTypes } from './base-button.jsx';
import * as Styled from './styled.jsx';

export class AnchorButton extends PureComponent {
	static propTypes = SharedButtonPropTypes;

	render() {
		return <BaseButton baseComponent={Styled.Anchor} {...this.props} />;
	}
}
