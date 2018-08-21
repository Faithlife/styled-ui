import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
	LightBulbH,
	LightBulbM,
	LightBulbL,
	OKCircle,
	SolidTriangleIcon as _SolidTriangleIcon,
} from '../icons';
import { Popover, PopoverBody } from './bootstrap.jsx';

const SolidTriangleIcon = styled(_SolidTriangleIcon)`
	transform: rotateZ(90deg);
	color: #7a7a7a;
	height: 8px;
	width: 8px;
	margin-left: 8px;
`;

const RelativeContainer = styled.div`
	position: relative;
`;

const IndicatorContainer = styled.div`
	position: absolute;
	right: 6px;
	top: 7px;
	z-index: 3;
	display: flex;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

const StyledParagraph = styled.p`
	&& {
		margin-bottom: 4px;
		line-height: 1.14em;
		color: #575251;

		&:last-of-type {
			margin-bottom: 0;
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
		/** Indicates another icon in input. */
		isDropdown: PropTypes.bool,
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

	containerRef = React.createRef();

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

		return (
			<RelativeContainer className={this.props.className}>
				{this.props.children({ inferred: ConfidenceIcon != null })}
				<IndicatorContainer>
					<ConfidenceIconContainer
						onMouseEnter={() => this.setState({ isPopoverOpen: true })}
						onMouseLeave={() => this.setState({ isPopoverOpen: false })}
						onClick={() => {
							if (this.state.isPopoverOpen) {
								onConfirm();
							} else {
								this.setState({ isPopoverOpen: true });
							}
						}}
						innerRef={this.containerRef}
					>
						{this.state.isPopoverOpen && ConfidenceIcon != null ? <OKCircle /> : ConfidenceIcon}
					</ConfidenceIconContainer>
					{this.props.isDropdown && <SolidTriangleIcon />}
				</IndicatorContainer>
				{this.state.isPopoverOpen && (
					<Popover
						placement="top"
						isOpen={this.state.isPopoverOpen}
						target={this.containerRef.current}
						toggle={() => this.setState({ isPopoverOpen: false })}
					>
						<PopoverBody>
							<StyledParagraph>
								Value guessed with {Math.round(confidence * 100)}% confidence.<br />
								Click OK if you can confirm value is correct, or delete or change the value.
							</StyledParagraph>
							<StyledParagraph>Source: {confidenceSource}</StyledParagraph>
						</PopoverBody>
					</Popover>
				)}
			</RelativeContainer>
		);
	}
}
