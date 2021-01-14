### No preview image

This is what the `ImageWell` looks like by default with no `previewUrl` supplied.

```react
<ImageWell onSelectImage={() => alert("Choose an image")} />
```

### With preview image

If `onRemoveImage` is provided, an X icon will be shown in the upper-right corner and the function will be passed to the icon's `onClick` handler. The rest of the `ImageWell` can be clicked and will call `onSelectImage`. This is useful if you want to be able to remove an image but also do something when the preview image is clicked, like display it in a lightbox.

```react
state: { previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' }

---

<ImageWell
    previewUrl={state.previewUrl}
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Displaying image");
        }  else {
            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' });
        }
    }}
    onRemoveImage={() => {
        setState({ previewUrl: ''});
        alert("Removed image");
    }}
/>
```

```react
state: { previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' }

---

<ImageWell
    previewUrl={state.previewUrl}
    fitPreviewToSquare
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Displaying image");
        }  else {
            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' });
        }
    }}
    onRemoveImage={() => {
        setState({ previewUrl: ''});
        alert("Removed image");
    }}
/>
```

If `onRemoveImage` is not provided, a camera icon will be shown in the upper-right corner. Clicking any part of the `ImageWell` will call `onSelectImage`. This is useful if you only want the user to be able to change and not remove an image.

```react
state: { previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' }

---

<ImageWell
    previewUrl={state.previewUrl}
    fitPreviewToSquare
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Choose a new image");
        }  else {
            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' });
        }
    }}
/>
```

### Custom add text

Provide `children` to change what the `ImageWell` displays when there is no `previewUrl`.

```react
<ImageWell onSelectImage={() => alert("Choose a room layout")}>
    + Add Room Layout
</ImageWell>
```
