/* eslint-disable import/named */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InputGroup, Input } from './base-components.jsx';

const LightBulbL = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M7 13h3v-1.292l.444-.297a3.5 3.5 0 1 0-3.887 0l.443.297V13zm4 1H6v-1.758a4.5 4.5 0 1 1 5 0V14z"
			/>
			<path fill="#1E91D6" d="M6.5 15h4v1h-4z" />
		</g>
	</svg>
);

const LightBulbM = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M10 13v-1.292l.444-.297a3.5 3.5 0 1 0-3.887 0l.443.297V13h3zm1 1H6v-1.758a4.5 4.5 0 1 1 5 0V14zm-4.5 1h4v1h-4v-1z"
			/>
			<path
				fill="#79CAFB"
				d="M8 1h1v1H8V1zm5 2h1v1h-1V3zM3 3h1v1H3V3zm12 5h1v1h-1V8zM1 8h1v1H1V8z"
			/>
		</g>
	</svg>
);
const LightBulbH = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M10 13v-1.292l.444-.297a3.5 3.5 0 1 0-3.887 0l.443.297V13h3zm1 1H6v-1.758a4.5 4.5 0 1 1 5 0V14zm-4.5 1h4v1h-4v-1z"
			/>
			<path
				fill="#79CAFB"
				d="M8 0h1v3H8V0zm6 8h3v1h-3V8zM0 8h3v1H0V8zm13.354-3.646l-.708-.708 2.291-2.29.708.707-2.291 2.29zm-9.708 0l-2.29-2.291.707-.708 2.29 2.291-.707.708z"
			/>
		</g>
	</svg>
);

const OK = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="17" height="18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M8.5 16a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm0 1a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17z"
			/>
			<path
				fill="#1E91D6"
				d="M5.59 12.108c-.383 0-.734-.07-1.052-.212a2.278 2.278 0 0 1-.818-.612 2.867 2.867 0 0 1-.531-.967A4.063 4.063 0 0 1 3 9.03c0-.474.063-.898.189-1.273.126-.376.303-.692.53-.95.228-.258.501-.456.819-.594a2.614 2.614 0 0 1 1.052-.207c.384 0 .735.069 1.053.207.317.138.592.336.823.594.23.258.409.574.535.95.126.375.189.799.189 1.273 0 .48-.063.909-.19 1.287-.125.378-.303.7-.534.967a2.32 2.32 0 0 1-.823.612 2.566 2.566 0 0 1-1.053.212zm0-.909c.234 0 .444-.051.63-.153.186-.102.345-.247.477-.436.132-.19.233-.417.305-.684.072-.268.108-.566.108-.896 0-.66-.136-1.177-.409-1.552a1.302 1.302 0 0 0-1.11-.563c-.468 0-.839.187-1.111.563-.273.375-.41.892-.41 1.552 0 .33.036.628.108.896.072.267.174.494.306.684.132.189.29.334.477.436.186.102.395.153.63.153zm3.778-5.085h1.043v2.673h.027l2.096-2.673h1.16l-1.808 2.295L14 12h-1.151l-1.592-2.772-.846 1.053V12H9.368V6.114z"
			/>
		</g>
	</svg>
);

const RelativeContainer = styled.div`
	position: relative;
`;

const IndicatorContainer = styled.div`
	position: absolute;
	right: 6px;
	top: 7px;
	z-index: 3;

	&:hover {
		cursor: pointer;
	}
`;

/** Text input control with a clickable inline confidence indicator. Extra props are passed to the wrapped input.*/
export default class InferredText extends Component {
	static propTypes = {
		/** Controls the inline confidence indicator */
		confidence: PropTypes.oneOf(['', 'low', 'medium', 'high']),
		/** Function called when the input is changed */
		onChange: PropTypes.func,
		/** The controlled input value */
		value: PropTypes.string.isRequired,
		/** Function called when the OK button is clicked. Confidence should be set to null to clear the lightbulb indicator. */
		onConfirm: PropTypes.func.isRequired,
		/** Ignored */
		className: PropTypes.string,
	};

	state = { isMouseOver: false };

	render() {
		const { confidence, className, onConfirm, ...inputProps } = this.props;

		return (
			<RelativeContainer>
				<InputGroup>
					<Input {...inputProps} />
				</InputGroup>
				<IndicatorContainer
					onMouseEnter={() => this.setState({ isMouseOver: true })}
					onMouseLeave={() => this.setState({ isMouseOver: false })}
					onClick={() => this.props.onConfirm()}
				>
					{this.state.isMouseOver && confidence != null ? (
						<OK />
					) : confidence === 'high' ? (
						<LightBulbH />
					) : confidence === 'medium' ? (
						<LightBulbM />
					) : confidence === 'low' ? (
						<LightBulbL />
					) : null}
				</IndicatorContainer>
			</RelativeContainer>
		);
	}
}
