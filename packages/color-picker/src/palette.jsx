import React, { useState, useCallback } from 'react';
import { Box, Text, UtilityButton, theme } from '@faithlife/styled-ui';
import { Button } from '@faithlife/styled-ui/v6';
import { ChevronRight, ChevronDown } from '@faithlife/styled-ui/icons/12px';
import { SwatchBg, Swatch, PaletteGrid } from './styled';
import { hexToRgb, rgbToHex, hslToRgb } from './color-convert';

function partitionBorderProps(props) {
	const parentProps = {};
	const childProps = {};

	for (const [key, value] of Object.entries(props)) {
		if (key.startsWith('border') && !key.endsWith('Radius')) {
			childProps[key] = value;
		} else {
			parentProps[key] = value;
		}
	}

	return { parentProps, childProps };
}

export function ColorSwatch({ swatchHex, ...props }) {
	const { parentProps, childProps } = partitionBorderProps(props);

	return (
		<SwatchBg {...parentProps}>
			<Swatch style={{ background: swatchHex }} {...childProps} />
		</SwatchBg>
	);
}

function getBorder(hex) {
	const rgb = hexToRgb(hex);
	if (rgb.r + rgb.b + rgb.g > 600) {
		return `1px solid ${theme.colors.gray14}`;
	}

	return null;
}

function PaletteButton({ hex, set }) {
	const onClick = useCallback(() => set.hex(hex), [set, hex]);

	return (
		<UtilityButton lineHeight={0} onClick={onClick}>
			<ColorSwatch swatchHex={hex} size={24} border={getBorder(hex)} />
		</UtilityButton>
	);
}

export function Palette({ name, hexColors, set, isInitiallyOpen = true, ...props }) {
	const [isOpen, setIsOpen] = useState(isInitiallyOpen);
	const toggleIsOpen = useCallback(() => setIsOpen(v => !v), []);

	return (
		<Box {...props}>
			<Button variant="primaryTransparent" size="medium" onClick={toggleIsOpen}>
				{isOpen ? <ChevronDown /> : <ChevronRight />}
				<Text display="block" textStyle="ui.14" color="foregroundPrimary" fontWeight="semibold">
					{name}
				</Text>
			</Button>
			{isOpen && (
				<PaletteGrid paddingLeft="10px" paddingRight="10px">
					{hexColors.map((hex, i) => (
						<PaletteButton hex={hex} set={set} key={i} />
					))}
				</PaletteGrid>
			)}
		</Box>
	);
}

const dedupe = arr => [...new Set(arr)];
export function getShadesAndTints({ h, s, l }) {
	const shadeColors = [0.1, 0.3, 0.5, 0.7, 0.9].map(x => {
		return { h, s, l: l * x, a: 1 };
	});
	const tintColors = [0.1, 0.3, 0.5, 0.7].map(x => {
		return { h, s, l: l + (1 - l) * x, a: 1 };
	});

	return dedupe([...shadeColors, { h, s, l, a: 1 }, ...tintColors].map(v => rgbToHex(hslToRgb(v))));
}

export function getComplementaryColors({ h, s, l }) {
	const complementaryHue = h > 180 ? h - 180 : h + 180;
	return getShadesAndTints({ h: complementaryHue, s, l });
}

export function getAnalogousColors({ h, s, l }) {
	const colors = new Array(10).fill(h - 32).map((x, i) => {
		const hue = (x + i * 8 + 360) % 360;
		return rgbToHex(hslToRgb({ h: hue, s, l }));
	});

	return dedupe(colors);
}
