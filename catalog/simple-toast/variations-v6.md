For the next major version of Styled UI, the SimpleToast component has been rebuilt to use Styled System primitives.

You can opt in to the new API now by importing `{ SimpleToast } from '@faithlife/styled-ui/v6'`.

## v6 Simple Toast

The toast will appear differently for mobile and desktop. Try resizing the screen and refreshing.

The toast assumes that there will only be one toast on any page. Otherwise toasts will start to cover others in render order.

```react
showSource: true
state: { number: 0 }
---
<ToastDemo>
	<Button onClick={() => toastRef.current.showMessage({ message: 'Hello!' })}>Hello!</Button>
	<Button onClick={() => toastRef.current.showMessage({ message: 'Hello w/ Icon!', icon: <LoadingSpinner small /> })}>Hello w/ Icon!</Button>
	<SimpleToast ref={toastRef} showTime={1000} />
</ToastDemo>
```
