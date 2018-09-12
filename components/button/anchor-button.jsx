import React, { PureComponent } from 'react';
import { BaseButton } from './base-button.jsx';
import * as Styled from './styled.jsx';

export class AnchorButton extends PureComponent {
	static propTypes = BaseButton.propTypes;

	render() {
		return <BaseButton baseComponent={Styled.Anchor} {...this.props} />;
	}
}
