import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from '../input';
import { forwardClassRef } from '../utils';
import { InferredBase } from './inferred-base';

const StyledInput = styled(
	React.forwardRef(({ inferred, ...props }, ref) => <Input {...props} ref={ref} />),
)`
	width: 100%;
	${props => (props.inferred ? 'color: #006099' : '')};
	${props => (props.inferred ? 'padding-right: 32px' : '')};
`;

/** Text input control with a clickable inline confidence indicator. Extra props are passed to the wrapped input.*/
export const InferredText = forwardClassRef(
	class InferredText extends Component {
		static propTypes = {
			/** Decimal percent value for the confidence value. E.g. 0.75 */
			confidence: PropTypes.number,
			/** Show percentage text in tooltip.  Defaults to true. */
			shouldShowPercentageText: PropTypes.bool,
			/** String to display in the confidence tooltip. Defaults to Heuristic algorithm */
			confidenceSource: PropTypes.string,
			/** Function called when the input is changed */
			onChange: PropTypes.func,
			/** The controlled input value */
			value: PropTypes.string.isRequired,
			/** Function called when the OK button is clicked. Confidence should be set to null to clear the lightbulb indicator. */
			onConfirm: PropTypes.func.isRequired,
			/** See the docs for how to override styles properly  */
			className: PropTypes.string,
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
				forwardedRef, // eslint-disable-line react/prop-types
				...inputProps
			} = this.props;
			return (
				<InferredBase
					className={className}
					confidence={confidence}
					shouldShowPercentageText={shouldShowPercentageText}
					confidenceSource={confidenceSource}
					onConfirm={onConfirm}
				>
					{props => <StyledInput inferred={props.inferred} {...inputProps} ref={forwardedRef} />}
				</InferredBase>
			);
		}
	},
);
