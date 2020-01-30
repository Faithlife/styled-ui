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
	cursor: pointer;

	.confidenceIcon {
		display: none;
	}

	.okIcon {
		display: none;
	}

	&.hasConfidence {
		.confidenceIcon {
			display: inline-block;
		}
	}

	&.hasConfidence:hover {
		.okIcon {
			display: inline-block;
		}

		.confidenceIcon {
			display: none;
		}
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
		/** Show percentage text in tooltip.  Defaults to true. */
		shouldShowPercentageText: PropTypes.bool,
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
		shouldShowPercentageText: true,
	};

	render() {
		const { confidence, shouldShowPercentageText, confidenceSource, onConfirm } = this.props;

		const ConfidenceIcon =
			confidence >= 0.9 ? (
				<LightBulbH className="confidenceIcon" />
			) : confidence >= 0.7 ? (
				<LightBulbM className="confidenceIcon" />
			) : confidence >= 0.6 ? (
				<LightBulbL className="confidenceIcon" />
			) : null;

		const tooltipContents = (
			<TooltipContents>
				<StyledParagraph>
					{confidence && !shouldShowPercentageText && (
						<span>Value guessed with {Math.round(confidence * 100)}% confidence.</span>
					)}
					<span>Click OK if you can confirm value is correct, or delete or change the value.</span>
				</StyledParagraph>
				{confidenceSource && <StyledParagraph>Source: {confidenceSource}</StyledParagraph>}
			</TooltipContents>
		);

		return (
			<RelativeContainer className={this.props.className}>
				{this.props.children({ inferred: !!ConfidenceIcon })}
				<IndicatorContainer className={ConfidenceIcon ? 'hasConfidence' : ''}>
					<Tooltip text={tooltipContents} styleOverrides={{ minWidth: 300 }} placement="top-end">
						<ConfidenceIconContainer
							onClick={() => {
								onConfirm();
							}}
						>
							<OKCircle className="okIcon" />
							{ConfidenceIcon}
						</ConfidenceIconContainer>
					</Tooltip>
				</IndicatorContainer>
			</RelativeContainer>
		);
	}
}
