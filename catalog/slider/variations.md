## Slider

Note: the slider component expects a white background.

```react
showSource: true
state: {}
---
<div style={{background: "#fff", padding: 20}}>
	<Slider value={1} setValue={() => false} stopCount={5} />
	<Slider value={1} setValue={() => false} stopCount={5} />
</div>
```

### With minValue / maxValue

```react
showSource: true
state: {}
---
<div style={{background: "#fff", padding: 20}}>
	<Slider value={2} setValue={() => false} minValue={0} maxValue={2} stopCount={5} />
	<Slider value={3} setValue={() => false} minValue={1} maxValue={3} stopCount={5} />
	<Slider value={4} setValue={() => false} minValue={2} maxValue={4} stopCount={5} />
</div>
```

### With labels

```react
showSource: true
state: {}
---
<div style={{background: "#fff", padding: 20}}>
	<Slider value={1} setValue={() => false} stopCount={5} labels={['Admins', 'Moderators', 'Members', 'Followers', 'Public']} />
	<Slider value={1} setValue={() => false} stopCount={5} labels={['One', 'Two', 'Three', 'Four', 'Five']}/>
	<Slider value={1} setValue={() => false} minValue={1} maxValue={3} stopCount={5} labels={['', 'Min', '', 'Max', '']}/>
</div>
```

### hideAvailableStops

For sliders with many stops, consider using the `hideAvailableStops` option.

```react
showSource: true
state: { value: 5 }
---
<div style={{background: "#fff", padding: 20}}>
	<div>Opacity: {state.value * 10}</div>
	<Slider
		hideAvailableStops
		value={state.value}
		setValue={value => setState({value: value})}
		stopCount={11}
		labels={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
	/>
	<img src="https://www.bellinghamherald.com/news/local/l6de4z/picture53186905/alternates/LANDSCAPE_1140/Faithlife%201" alt="Faithlife campus" style={{ maxWidth: '100%', opacity: (state.value * 10) / 100 }} />
</div>
```
