import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { PopoverManager, PopoverReference, Popover } from '../main';
import * as Styled from './styled';

function range(from, to) {
	return [...Array(to - from).keys()].map(num => num + from);
}

export class Slider extends PureComponent {
	static propTypes = {
		value: PropTypes.number.isRequired,
		/** Array of numbers or strings to be used as tooltip labels */
		labels: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
		/** 0-based index */
		minValue: PropTypes.number,
		/** 0-based index, should be less than stopCount if specified */
		maxValue: PropTypes.number,
		setValue: PropTypes.func.isRequired,
		stopCount: PropTypes.number.isRequired,
	};

	state = {
		value: this.props.value,
		isHovered: false,
		isSliding: false,
	};

	_timeout = null;

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value });
		}
	}

	componentWillUnmount() {
		if (this._timeout) {
			clearTimeout(this._timeout);
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
		this.setState({ isHovered: true, isSliding: true });
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
		this.setState({ isHovered: true, isSliding: true });
		this.mouseMove(event);
	};

	mouseMove = event => {
		event.preventDefault();
		const value = this.calculateValue(event.clientX);
		if (this.state.value !== value) {
			this.setState({ value, isHovered: true });
		}
	};

	mouseUp = event => {
		event.preventDefault();
		document.removeEventListener('mousemove', this.mouseMove);
		document.removeEventListener('mouseup', this.mouseUp);
		this.setState({ isSliding: false });
		this.handleTogglePopover(false, 1000);
		if (this.state.value !== this.props.value) {
			this.props.setValue(this.state.value);
		}
	};

	handleMouseEnter = event => {
		event.preventDefault();
		this.handleTogglePopover(true, 2);
	};

	handleMouseLeave = event => {
		event.preventDefault();
		this.handleTogglePopover(false, 500);
	};

	handleTogglePopover = (isOpen, delay = 200) => {
		if (!isOpen) {
			if (this._timeout) {
				clearTimeout(this._timeout);
			}
			this._timeout = setTimeout(() => {
				this.setState({ isHovered: false });
				this._timeout = null;
			}, delay || 0);
		} else {
			if (this._timeout) {
				clearTimeout(this._timeout);
			}
			this._timeout = setTimeout(() => {
				this.setState({ isHovered: true });
				this._timeout = null;
			}, delay || 0);
		}
	};

	render() {
		const { maxValue, minValue } = this.props;
		const { isHovered } = this.state;
		const labels = this.props.labels || [];

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
							minimumAvailable={index === minValue}
							key={index}
						/>
					))}
				</Styled.StopContainer>
				<Styled.ThumbContainer
					onMouseEnter={this.handleMouseEnter}
					onMouseLeave={this.handleMouseLeave}
				>
					{range(0, this.props.stopCount).map(index => (
						<Styled.ThumbAnchor
							key={index}
							trackStart={index === 0}
							trackEnd={index === this.props.stopCount - 1}
						>
							<PopoverManager>
								<PopoverReference>
									{index === this.state.value && (
										<Styled.Thumb active={this.state.isSliding} hovered={this.state.isHovered} />
									)}
								</PopoverReference>
								<Popover
									isOpen={index === this.state.value && isHovered && !!labels[index]}
									placement={'top'}
									container="body"
									modifiers={{ offset: { offset: '0, 33' } }}
								>
									{labels[index]}
								</Popover>
							</PopoverManager>
						</Styled.ThumbAnchor>
					))}
				</Styled.ThumbContainer>
			</Styled.SliderContainer>
		);
	}
}
