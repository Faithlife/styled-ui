## Simple Toast

The toast will appear differently for mobile and desktop. Try resizing the screen and refreshing.

The toast assumes that there will only be one toast on any page. Otherwise toasts will start to cover others in render order.

```react
showSource: true
state: { number: 0 }
---
<ToastDemo>
	<Button primary medium onClick={() => toastRef.current.showMessage({ message: 'Hello!' })}>Hello!</Button>
	<Button primary medium onClick={() => toastRef.current.showMessage({ message: 'Hello w/ Icon!', icon: <LoadingSpinner small /> })}>Hello w/ Icon!</Button>
	<SimpleToast ref={toastRef} desktopTime={1000} mobileTime={500} />
</ToastDemo>
```
