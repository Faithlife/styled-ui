import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InferredBase } from './inferred-base';

const PlaceholderDropdown = styled.div`
	height: 30px;
	width: 36px;
`;

/** Text input control with a clickable inline confidence indicator. Extra props are passed to the wrapped input.*/
export class InferredSelect extends Component {
	static propTypes = {
		/** Decimal percent value for the confidence value. E.g. 0.75 */
		confidence: PropTypes.number,
		/** Show percentage text in tooltip.  Defaults to true. */
		shouldShowPercentageText: PropTypes.bool,
		/** String to display in the confidence tooltip. Defaults to Heuristic algorithm */
		confidenceSource: PropTypes.string,
		/** Function called when the OK button is clicked. Confidence should be set to null to clear the lightbulb indicator. */
		onConfirm: PropTypes.func.isRequired,
		/** See the docs for how to override styles properly  */
		className: PropTypes.string,
		/** Render prop for the select control. Receives { inferred: bool } as an argument. */
		renderSelect: PropTypes.func,
	};

	static defaultProps = {
		confidenceSource: 'Heuristic Algorithm',
		shouldShowPercentageText: true,
	};

	render() {
		const {
			confidence,
			shouldShowPercentageText,
			confidenceSource,
			className,
			onConfirm,
			renderSelect,
		} = this.props;
		return (
			<InferredBase
				className={className}
				confidence={confidence}
				shouldShowPercentageText={shouldShowPercentageText}
				confidenceSource={confidenceSource}
				onConfirm={onConfirm}
			>
				{({ inferred }) =>
					renderSelect({
						inferred,
						DropdownIndicator: inferred ? () => <PlaceholderDropdown /> : null,
					})
				}
			</InferredBase>
		);
	}
}
