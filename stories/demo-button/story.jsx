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
		const { variations } = Button;

		const buttonMargins = [
			variations.small,
			variations.medium,
			variations.large,
			variations.extraLarge,
		];
		return (
			<Styled.DemoRow>
				{buttonMargins.map((buttonMargin, i) => (
					<Styled.ButtonWrapperFlex key={i}>{renderButton(buttonMargin)}</Styled.ButtonWrapperFlex>
				))}
			</Styled.DemoRow>
		);
	};

	render() {
		const { variations } = Button;
		return (
			<Styled.Demos>
				{this.renderButtonsRow(marginVariation => (
					<Button
						buttonProps={{ onClick: this.props.onClick }}
						theme={this.props.theme}
						variations={[variations.primary, marginVariation]}
					>
						Primary
					</Button>
				))}
				{this.renderButtonsRow(marginVariation => (
					<Button
						buttonProps={{ onClick: this.props.onClick, disabled: true }}
						theme={this.props.theme}
						variations={[variations.primary, marginVariation]}
					>
						Disabled
					</Button>
				))}
				{this.renderButtonsRow(marginVariation => (
					<Button
						buttonProps={{ onClick: this.props.onClick }}
						theme={this.props.theme}
						variations={[variations.primaryOutline, marginVariation]}
					>
						Secondary
					</Button>
				))}
				<Styled.Documentation dangerouslySetInnerHTML={{ __html: docs }} />
			</Styled.Demos>
		);
	}
}
