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
	<Slider value={1} setValue={() => false} minValue={0} maxValue={3} stopCount={5} />
	<Slider value={1} setValue={() => false} minValue={1} maxValue={4} stopCount={5} />
	<Slider value={1} setValue={() => false} minValue={1} maxValue={5} stopCount={5} />
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
