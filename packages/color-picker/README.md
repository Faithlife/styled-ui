# Color Picker

The color-picker package aims to provide the building blocks for faithlife apps to build user-friendly
color editors. It includes a hex input, channel sliders, an hsv box slider, and color swatches and a pallete.
In addition to UI components, the package includes a `useColor` hook, as well as access to all of the
color conversion functions the package uses internally.

## Getting started

1. Import the components you're interested in using

```
import {
	RedSlider,
	GreenSlider,
	BlueSlider,
	AlphaSlider,
	useColor
} from '@faithlife/color-picker';
```

3. Use the components along with the hook

```
function MyRgbPicker() {
	const [color, set] = useColor('#aabbcc');

	return (
		<Box>
			<RedSlider color={color} set={set} />
			<GreenSlider color={color} set={set} />
			<BlueSlider color={color} set={set} />
			<AlphaSlider color={color} set={set} />
		</Box>
	);
}
```

## API reference

### Exports

`HexInput`: A text input which sets the color if the input text parses to a hex
color code. The input accepts input with optional `#`, in short or long mode
(short mode meaning `#abc` === `#aabbcc`), and with optional alpha channel
(e.g. `#aabbccdd`).

`OpacityInput`: A number input which ranges from 0 to 100.

`(Red|Green|Etc.)Slider`: These sliders allow controlling an individual color channel.
The background of the slider contains a gradient that displays how the color will change when the slider value changes.

`SvPicker`: This is a box slider which controls VSaturation on the x-axis and Value on the y-axis.
This is probably the most user-friendly picker (combined with a HueSlider and optionally an
AlphaSlider), as it makes it very easy to see what color you want and pick it.

`ColorSwatch`: This is a rounded square which displays the given color, useful for a color button
or just for displaying the currently-selected color. The swatch container has a checkered background,
so if the color is semi-transparent, that transparency will be conveyed to the user.

`Palette`: The palette is a named collection of `ColorSwatch` buttons for picking a color from a
pre-determined set of colors. The palette is displayed as a collapsable accordion section.

**Note: each of the above components is derived from a styled-ui component, and accepts
css props just like a styled-ui `Box` or `Input` component would**

`useColor`: This is the main hook to use to control all of the sliders/pickers. It accepts an
initial color (which can be a hex string, rgb value, hsl value, or hsv value), and returns
a `color` object (which contains hex, rgb, hsl, and hsv values) and a `setColor` function (which
can accept any color format, and also has methods for setting a color format directly). Each
tracked color format is derived from a single internal hsl value.

`getShadesAndTints|getComplementaryColors|getAnalagousColors`: These functions each take an
`hsl` color format and return a list of hex format colors which are in some way related to the
given color. These are useful for creating named palettes of colors related to the current color.

`converters`: This object contains the color conversion functions, e.g. `rgbToHex`, which likely
won't be needed for most consumers, but is exported just in case a consumer needs them.

### Color formats

#### Hex
A hex color is simply a hex color code string. The `#` at the start is optional as far as the
api is concerned, and the code may be in shorthand format, and has optional support for the
alpha channel.

#### RGB
An rgb color is represented as an object containing properties `r`, `g`, `b`, and `a`. The `r`,
`g`, and `b` values range from `0` to `255`, while the `a` value ranges from `0` to `1`.

#### HSL
An hsl color is represented as an object containing properties `h`, `s`, `l`, and `a`. The `h`
value ranges from `0` to `360`, while the `s`, `l` and `a` values range from `0` to `1`.

#### HSV
An hsv color is represented as an object containing properties `h`, `s`, `v`, and `a`. The `h`
value ranges from `0` to `360`, while the `s`, `v` and `a` values range from `0` to `1`.

### Props

#### All sliders/inputs/pickers
- `color`: a color object containing `hex`, `rgb`, `hsl`, and `hsv` values (e.g. the color object
returned by `useColor`)
- `set`: the function object for setting the color. (e.g., the function returned by `useColor`)

#### ColorSwatch
- `swatchHex`: the hex value of the color to display

#### Palette
- `name`: the name of the palette, to be displayed in the accordion header
- `hexColors`: an array of hex color codes to display
- `set`: the function for setting the color (from `useColor`)
- `isInitiallyOpen`: should this section default to open
