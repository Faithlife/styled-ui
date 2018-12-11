## Slider

Note: the slider component expects a white background.

```react
showSource: true
state: {}
---
<div style={{background: "#fff", padding: 20}}>
	<Slider value={1} setValue={() => false} maxValue={4} minValue={1} stopCount={5} />
	<Slider value={1} setValue={() => false} maxValue={3} stopCount={5} />
	<Slider value={1} setValue={() => false} maxValue={2} stopCount={5} />
</div>
```
