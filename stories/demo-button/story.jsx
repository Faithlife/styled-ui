import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import docs from './demo-button.md';
import * as Styled from './styled.jsx';

export default class DemoContainer extends Component {
	static propTypes = {
		onClick: PropTypes.func.isRequired,
		theme: PropTypes.object,
	};

	renderButtonsRow = renderButton => {
		const buttonMargins = ['small', 'medium', 'large', 'extraLarge'];
		return (
			<Styled.DemoRow>
				{buttonMargins.map((buttonMargin, i) => (
					<Styled.ButtonWrapperFlex key={i}>{renderButton(buttonMargin)}</Styled.ButtonWrapperFlex>
				))}
			</Styled.DemoRow>
		);
	};

	render() {
		return (
			<Styled.Demos>
				{this.renderButtonsRow(marginVariation => (
					<Button
						primary
						onClick={this.props.onClick}
						theme={this.props.theme}
						{...{ [marginVariation]: true }}
					>
						Primary
					</Button>
				))}
				{this.renderButtonsRow(marginVariation => (
					<Button
						primary
						onClick={this.props.onClick}
						disabled
						theme={this.props.theme}
						{...{ [marginVariation]: true }}
					>
						Disabled
					</Button>
				))}
				{this.renderButtonsRow(marginVariation => (
					<Button
						primaryOutline
						onClick={this.props.onClick}
						theme={this.props.theme}
						{...{ [marginVariation]: true }}
					>
						Secondary
					</Button>
				))}
				<Styled.Documentation dangerouslySetInnerHTML={{ __html: docs }} />
			</Styled.Demos>
		);
	}
}
