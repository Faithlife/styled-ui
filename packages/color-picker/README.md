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

`SvPicker`: This is a box slider which controls Saturation on the x-axis and Value on the y-axis.
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


## FAQ

### Why `HslSaturationSlider`?
The `s` in `hsl` and `hsv` are actually different values ([see here](https://en.wikipedia.org/wiki/HSL_and_HSV)).
As such, I felt it was prudent to make clear that this is an `hsl` saturation slider, and not an `hsv` one.

However, the `h` value *is* the same, so the `HueSlider` is used for both.

### Why use `hsl` internally? Why not use `hex` or (other format here)?
Deriving everything from a single internal format is really nice, as it avoids any potential issues where the
different used formats get out of sync with each other. However, the choice of internal format is important.
`hsl` is chosen for two main reasons:

First, higher precision. Hex for instance, can only store `256` unique
values per channel, but `hsl` uses floats. RGB can technically store floats though, so...

Second, round-trip conversions. Many hsl values do not round trip from rgb; primarily speaking, monochromatic
colors. Any color with a saturation of 0 (or a lightness of 1 or 0) will actually lose the hue value in a
round-trip to and from rgb, because the actual hue of the value doesn't matter if the color is grayscale.

This makes for a poor experience when using an hsv box picker, as round-tripping to rgb and back would cause
the hue to reset to 0 any time the saturation or value bottoms-out.

### Why not use `hsv` then, since it's the format of the box picker?
It mostly doesn't matter, so the main reason is that `hsl` is supported in css while `hsv` is not. This
makes it an outlier, in that it is the only one of the four formats that cannot be directly used in css.

### Why are all these colors set using inline styles and not styled-system props?
When styled-systems receives a new set of styles that it has never seen before, it generates a new classname
and style ruleset, and appends it to a stylesheet in the document. When editing a color, for instance by sliding
a slider, the color value subtly changes. Styled-systems will be forced to generate and append new styles for
every element on the page that uses the color (all the other sliders, color swatches, etc.).

In practice, this stylesheet appending caused enough lag to make the UI feel quite unresponsive. Simply using
inline styles instead avoids all the stylesheet modifications, and results in much smoother UI.
