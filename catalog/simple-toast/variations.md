## Simple Toast

The toast will appear differently for mobile and desktop. Try resizing the screen.

The toast assumes that there will only be one toast on any page. Otherwise toasts will start to cover others in render order.

```react
showSource: true
state: { number: 0 }
---
<ToastDemo>
	<Button primary medium onClick={() => setState({ number: state.number + 1 })}>Click Me</Button>
	<SimpleToast message={state.number > 0 ?`Hello! ${state.number}` : null} icon={<LoadingSpinner small />} />
</ToastDemo>
```

## Toast without icon

```react
showSource: true
state: { number: 0 }
---
<ToastDemo>
	<Button primary medium onClick={() => setState({ number: state.number + 1 })}>Click Me</Button>
	<SimpleToast message={state.number > 0 ?`Hello! ${state.number}` : null} />
</ToastDemo>
```
