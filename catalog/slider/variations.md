## Slider

```react
showSource: true
state: {}
---
<div style={{background: "#fff", padding: 20}}>
	<Slider value={1} stopCount={5} />
	<Slider value={1} stopCount={5} />
</div>
```

### With minValue / maxValue

```react
showSource: true
state: {}
---
<div style={{background: "#fff", padding: 20}}>
	<Slider value={2} minValue={0} maxValue={2} stopCount={5} />
	<Slider value={3} minValue={1} maxValue={3} stopCount={5} />
	<Slider value={4} minValue={2} maxValue={4} stopCount={5} />
</div>
```

### With labels

```react
showSource: true
state: {}
---
<div style={{background: "#fff", padding: 20}}>
	<Slider value={1} stopCount={5} labels={['Admins', 'Moderators', 'Members', 'Followers', 'Public']} disabled />
	<Slider value={1} stopCount={5} labels={['One', 'Two', 'Three', 'Four', 'Five']}/>
	<Slider value={1} minValue={1} maxValue={3} stopCount={5} labels={['', 'Min', '', 'Max', '']}/>
</div>
```

### Callback props: onStop vs onSlide

If your slider will be making external API calls, you may wish to call that only on the `onStop` callback, when the user has finished sliding.
If you want to have incremental updates while the slider is moving, such as to keep multiple sliders in sync, you may want to use the `onSlide` callback prop.

```react
showSource: true
state: { value: 1 }
---
<div style={{background: "#fff", padding: 20}}>
	onStop:
	<Slider
		value={state.value}
		stopCount={5}
		onStop={function (value) {setState({value: value})}}
	/>
	onSlide:
	<Slider
		value={state.value}
		stopCount={5}
		onSlide={function (value) {setState({value: value})}}
	/>
</div>
```

### hideAvailableStops

For sliders with many stops, consider using the `hideAvailableStops` option.

```react
showSource: true
state: { value: 50, labels: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100] }
---
<div style={{background: "#fff", padding: 20}}>
	<div>Opacity: {state.value * 2}</div>
	<Slider
		value={state.value}
		onStop={function (value) {setState({value: value})}}
		stopCount={51}
		labels={state.labels}
	/>
	<Slider
		hideAvailableStops
		value={state.value}
		onStop={function (value) {setState({value: value})}}
		stopCount={51}
		labels={state.labels}
	/>
	<img src="https://www.bellinghamherald.com/news/local/l6de4z/picture53186905/alternates/LANDSCAPE_1140/Faithlife%201" alt="Faithlife campus" style={{ maxWidth: '100%', opacity: (state.value * 2) / 100 }} />
</div>
```

### Note on background colors

The slider component expects a white background to create the sections of inactive track that cover the blue gradient.
If your slider is not on a white background, use the `styleOverrides` prop to indicate the background color.

```react
showSource: true
state: {}
---
<div style={{background: "#8fdb6b", padding: 20}}>
	<Slider value={1} maxValue={3} stopCount={5} />
	<Slider styleOverrides={{ backgroundColor: '#8fdb6b' }} value={1} maxValue={3} stopCount={5} />
</div>
```
