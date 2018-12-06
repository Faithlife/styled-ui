import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LightBulbH, LightBulbM, LightBulbL, OKCircle } from '../icons';
import { Tooltip } from '../popover';

const RelativeContainer = styled.div`
	position: relative;
`;

const IndicatorContainer = styled.div`
	position: absolute;
	right: 8px;
	top: 8px;
	z-index: 3;
	display: flex;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

const TooltipContents = styled.div`
	text-align: initial;
	cursor: initial;
`;

const StyledParagraph = styled.p`
	&& {
		margin: 0;
		color: #575251;

		&:not(:last-of-type) {
			margin-bottom: 8px;
		}
	}
`;

const ConfidenceIconContainer = styled.span`
	height: 18px;
`;

/** Internal component. Contains common UI logic that is then used by inferred controls. */
export class InferredBase extends Component {
	static propTypes = {
		/** Decimal percent value for the confidence value. E.g. 0.75 */
		confidence: PropTypes.number,
		/** String to display in the confidence tooltip. Defaults to Heuristic algorithm */
		confidenceSource: PropTypes.string,
		/** Function called when the OK button is clicked. Confidence should be set to null to clear the lightbulb indicator. */
		onConfirm: PropTypes.func.isRequired,
		/** Wrapped input or typeahead control */
		children: PropTypes.func.isRequired,
		/** See the docs for how to override styles properly */
		className: PropTypes.string,
	};

	static defaultProps = {
		confidenceSource: 'Heuristic Algorithm',
	};

	componentWillReceiveProps(props) {
		if (props.confidence !== this.props.confidence) {
			this.setState({ isPopoverOpen: false });
		}
	}

	state = { isPopoverOpen: false };

	render() {
		const { confidence, confidenceSource, onConfirm } = this.props;
		const ConfidenceIcon =
			confidence >= 0.9 ? (
				<LightBulbH />
			) : confidence >= 0.7 ? (
				<LightBulbM />
			) : confidence >= 0.6 ? (
				<LightBulbL />
			) : null;

		const tooltipContents = (
			<TooltipContents>
				<StyledParagraph>
					Value guessed with {Math.round(confidence * 100)}% confidence.<br />
					Click OK if you can confirm value is correct, or delete or change the value.
				</StyledParagraph>
				<StyledParagraph>Source: {confidenceSource}</StyledParagraph>
			</TooltipContents>
		);

		return (
			<RelativeContainer className={this.props.className}>
				{this.props.children({ inferred: ConfidenceIcon != null })}
				<IndicatorContainer>
					<Tooltip text={tooltipContents} styleOverrides={{ minWidth: 300 }} placement="top-end">
						<ConfidenceIconContainer
							onMouseEnter={() => this.setState({ isPopoverOpen: true })}
							onMouseLeave={() => this.setState({ isPopoverOpen: false })}
							onClick={() => {
								if (this.state.isPopoverOpen) {
									onConfirm();
									this.setState({ isPopoverOpen: false });
								} else {
									this.setState({ isPopoverOpen: true });
								}
							}}
						>
							{this.state.isPopoverOpen && ConfidenceIcon != null ? <OKCircle /> : ConfidenceIcon}
						</ConfidenceIconContainer>
					</Tooltip>
				</IndicatorContainer>
			</RelativeContainer>
		);
	}
}
