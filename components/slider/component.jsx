import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Styled from './styled';

function range(from, to) {
	return [...Array(to - from).keys()].map(num => num + from);
}

export class Slider extends PureComponent {
	static propTypes = {
		value: PropTypes.number.isRequired,
		minValue: PropTypes.number,
		maxValue: PropTypes.number,
		setValue: PropTypes.func.isRequired,
		stopCount: PropTypes.number.isRequired,
	};

	state = {
		value: this.props.value,
		isSliding: false,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
		}
	}

	calculateValue = clientX => {
		const rect = this._slider.getBoundingClientRect();
		const width = rect.right - rect.left;
		const pos = clientX - rect.left;
		const clampedX = Math.min(Math.max(0, pos), width);

		const newValue = Math.round((clampedX / width) * (this.props.stopCount - 1));
		const { minValue, maxValue } = this.props;
		return newValue > maxValue ? maxValue : newValue < minValue ? minValue : newValue;
	};

	touchStart = event => {
		event.preventDefault();
		document.addEventListener('touchmove', this.touchMove);
		document.addEventListener('touchend', this.touchEnd);
		this.setState({ isSliding: true });
		this.touchMove(event);
	};

	touchMove = event => {
		event.preventDefault();
		const value = this.calculateValue(event.touches[0].clientX);
		if (this.state.value !== value) {
			this.setState({ value });
		}
	};

	touchEnd = event => {
		event.preventDefault();
		document.removeEventListener('touchmove', this.touchMove);
		document.removeEventListener('touchend', this.touchEnd);
		this.setState({ isSliding: false });
		if (this.state.value !== this.props.value) {
			this.props.setValue(this.state.value);
		}
	};

	mouseDown = event => {
		if (event.button !== 0 || this.state.isSliding) {
			return;
		}
		event.preventDefault();
		document.addEventListener('mousemove', this.mouseMove);
		document.addEventListener('mouseup', this.mouseUp);
		this.setState({ isSliding: true });
		this.mouseMove(event);
	};

	mouseMove = event => {
		event.preventDefault();
		const value = this.calculateValue(event.clientX);
		if (this.state.value !== value) {
			this.setState({ value });
		}
	};

	mouseUp = event => {
		event.preventDefault();
		document.removeEventListener('mousemove', this.mouseMove);
		document.removeEventListener('mouseup', this.mouseUp);
		this.setState({ isSliding: false });
		if (this.state.value !== this.props.value) {
			this.props.setValue(this.state.value);
		}
	};

	render() {
		const { maxValue } = this.props;

		return (
			<Styled.SliderContainer
				onDragStart={event => event.preventDefault()}
				onMouseDown={this.mouseDown}
				onTouchStart={this.touchStart}
				innerRef={ref => {
					this._slider = ref;
				}}
			>
				<Styled.TrackContainer>
					<Styled.TrackGradient />
					{range(0, this.props.stopCount - 1).map(index => (
						<Styled.Track
							active={index < this.state.value}
							invalid={this.props.maxValue && index >= this.props.maxValue}
							trackFirst={index === 0}
							trackLast={
								index === maxValue - 1 || (!maxValue && index === this.props.stopCount - 2)
							}
							key={index}
						/>
					))}
				</Styled.TrackContainer>
				<Styled.StopContainer>
					{range(0, this.props.stopCount).map(index => (
						<Styled.Stop
							available={
								index > this.state.value &&
								!(index >= this.props.maxValue) &&
								!(index === this.props.stopCount - 1)
							}
							key={index}
						/>
					))}
				</Styled.StopContainer>
				<Styled.ThumbContainer>
					{range(0, this.props.stopCount).map(
						index =>
							index === this.state.value ? (
								<Styled.ThumbAnchor key="thumb">
									<Styled.Thumb
										active={this.state.isSliding}
										trackStart={index === 0}
										trackEnd={index === this.props.stopCount - 1}
									/>
								</Styled.ThumbAnchor>
							) : (
								<Styled.ThumbAnchor key={index} />
							),
					)}
				</Styled.ThumbContainer>
			</Styled.SliderContainer>
		);
	}
}
