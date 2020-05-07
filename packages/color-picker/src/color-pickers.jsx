import React, { useState, useCallback } from 'react';
import { Input } from '@faithlife/styled-ui';
import { isHex } from './color-convert';
import { clamp, useMappingUpdate, useSlider } from './hooks';
import { rgbColor, rgbGradient, hslGradient, hslColor } from './css-colors';
import { SliderContainer, SliderTrack, SliderThumb, SvBoxSlider, SvThumb } from './styled';

export function HexInput({ color, set, ...props }) {
	const [text, setText] = useState();
	const onChange = useCallback(
		event => {
			const string = event.target.value;
			setText(string);

			if (isHex(string)) {
				set.hex(string);
			}
		},
		[set]
	);

	const onBlur = useCallback(() => setText(), []);

	return (
		<Input
			type="text"
			{...props}
			value={text == null ? color.hex : text}
			maxLength={9}
			onChange={onChange}
			onBlur={onBlur}
		/>
	);
}

export function OpacityInput({ color, set, ...props }) {
	const update = useMappingUpdate(
		color.rgb,
		set.rgb,
		v => v,
		(v, a) => ({ ...v, a })
	);
	const onChange = useCallback(
		event => {
			const value = clamp(Number.parseInt(event.target.value, 10), 0, 100);
			update(value / 100);
		},
		[update]
	);

	return (
		<Input
			type="number"
			{...props}
			value={Math.round(color.rgb.a * 100)}
			min={0}
			max={100}
			onChange={onChange}
		/>
	);
}

function ChannelSliderFactory(channel, scale, mode) {
	const getGradient = mode === 'hsl' ? hslGradient : rgbGradient;
	const colorFunc = mode === 'hsl' ? hslColor : rgbColor;
	const getThumbColor = channel === 'a' ? colorFunc : v => colorFunc({ ...v, a: 1 });

	const Slider = function({ color, set, ...props }) {
		const sliderProps = useSlider(
			useMappingUpdate(
				color[mode],
				set[mode],
				v => ({ x: v[channel] / scale, y: 0 }),
				(v, p) => ({ ...v, [channel]: p.x * scale })
			)
		);

		const v = color[mode][channel];
		const backgroundColor = getThumbColor(color[mode]);
		return (
			<SliderContainer borderRadius="4px" {...props}>
				<SliderTrack style={{ background: getGradient(color[mode], channel) }} {...sliderProps}>
					<SliderThumb style={{ left: `${(v / scale) * 100}%`, backgroundColor }} />
				</SliderTrack>
			</SliderContainer>
		);
	};

	Slider.displayName = channel + 'Slider';
	return Slider;
}

export const RedSlider = ChannelSliderFactory('r', 255, 'rgb');
export const GreenSlider = ChannelSliderFactory('g', 255, 'rgb');
export const BlueSlider = ChannelSliderFactory('b', 255, 'rgb');

export const HueSlider = ChannelSliderFactory('h', 360, 'hsl');
export const HslSaturationSlider = ChannelSliderFactory('s', 1, 'hsl');
export const HslLightnessSlider = ChannelSliderFactory('l', 1, 'hsl');

export const AlphaSlider = ChannelSliderFactory('a', 1, 'rgb');

export function SvPicker({ color, set, ...props }) {
	const svSliderProps = useSlider(
		useMappingUpdate(
			color.hsv,
			set.hsv,
			v => ({ x: v.s, y: 1 - v.v }),
			(v, p) => ({ ...v, s: p.x, v: 1 - p.y })
		)
	);

	const { h, s, v } = color.hsv;
	const backgroundColor = rgbColor({ ...color.rgb, a: 1 });
	return (
		<SvBoxSlider style={{ backgroundColor: `hsl(${h}, 100%, 50%)` }} {...props} {...svSliderProps}>
			<SvThumb style={{ left: `${s * 100}%`, top: `${(1 - v) * 100}%`, backgroundColor }} />
		</SvBoxSlider>
	);
}
