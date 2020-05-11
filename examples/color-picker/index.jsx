import React from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@faithlife/styled-ui';
import {
	HexInput,
	OpacityInput,
	RedSlider,
	GreenSlider,
	BlueSlider,
	HueSlider,
	HslSaturationSlider,
	HslLightnessSlider,
	AlphaSlider,
	SvPicker,
	ColorSwatch,
	Palette,
	getShadesAndTints,
	getComplementaryColors,
	getAnalogousColors,
	useColor,
} from '@faithlife/color-picker';

function App() {
	const [color, set] = useColor('#25f');
	const setSwatch = set.useWrapper(() => alert('picked a swatch!'));

	const shadesAndTints = getShadesAndTints(color.hsl);
	const complementary = getComplementaryColors(color.hsl);
	const analagous = getAnalogousColors(color.hsl);

	return (
		<div className="app">
			<h1>Color picker options</h1>
			<Box display="flex" alignItems="center" marginBottom="10px">
				<ColorSwatch swatchHex={color.hex} size={32} marginRight="10px" />
				<HexInput color={color} set={set} width="160px" marginRight="10px" />
				<OpacityInput color={color} set={set} width="60px" />
			</Box>
			<div>rgb</div>
			<RedSlider color={color} set={set} width="280px" marginBottom="10px" />
			<GreenSlider color={color} set={set} width="280px" marginBottom="10px" />
			<BlueSlider color={color} set={set} width="280px" marginBottom="10px" />
			<AlphaSlider color={color} set={set} width="280px" marginBottom="10px" />
			<div>hsl</div>
			<HueSlider color={color} set={set} width="280px" marginBottom="10px" />
			<HslSaturationSlider color={color} set={set} width="280px" marginBottom="10px" />
			<HslLightnessSlider color={color} set={set} width="280px" marginBottom="10px" />
			<AlphaSlider color={color} set={set} width="280px" marginBottom="10px" />
			<div>hsv</div>
			<SvPicker color={color} set={set} width="280px" height="165px" marginBottom="10px" />
			<HueSlider color={color} set={set} width="280px" marginBottom="10px" />
			<AlphaSlider color={color} set={set} width="280px" marginBottom="10px" />

			<Palette
				name="Example Palette"
				hexColors={[
					'#000',
					'#111',
					'#222',
					'#333',
					'#444',
					'#555',
					'#666',
					'#777',
					'#888',
					'#999',
					'#aaa',
					'#bbb',
					'#ccc',
					'#ddd',
					'#eee',
					'#fff',
					'#0000',
				]}
				set={setSwatch}
				width="280px"
			/>
			<Palette name="Shades and Tints" hexColors={shadesAndTints} set={setSwatch} width="280px" />
			<Palette name="Complementary" hexColors={complementary} set={setSwatch} width="280px" />
			<Palette name="Analagous" hexColors={analagous} set={setSwatch} width="280px" />
		</div>
	);
}

ReactDOM.render(<App />, document.querySelector('#app'));
