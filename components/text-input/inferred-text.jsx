import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BootstrapContainer, mapFromInnerRef, mapToInnerRef } from '../utils';
import { InferredBase } from './inferred-base.jsx';
import { Input } from './bootstrap.jsx';

const StyledInput = mapFromInnerRef(styled(
	mapToInnerRef(({ inferred, ...props }) => <Input {...props} />),
)`
	&&&,
	&&&:focus,
	&&&:hover {
		${props => (props.inferred ? 'color: #006099' : '')};
	}
`);

/** Text input control with a clickable inline confidence indicator. Extra props are passed to the wrapped input.*/
export class InferredText extends Component {
	static propTypes = {
		/** Decimal percent value for the confidence value. E.g. 0.75 */
		confidence: PropTypes.number,
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
	};

	render() {
		const { confidence, confidenceSource, className, onConfirm, ...inputProps } = this.props;
		return (
			<BootstrapContainer>
				<InferredBase
					className={className}
					confidence={confidence}
					confidenceSource={confidenceSource}
					onConfirm={onConfirm}
				>
					{props => <StyledInput inferred={props.inferred} {...inputProps} />}
				</InferredBase>
			</BootstrapContainer>
		);
	}
}
