### No preview image

```react
<ImageWell onSelectImage={() => alert("Choose an image")} />
```

### With preview image

```react
state: { previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' }
---
<ImageWell previewUrl={state.previewUrl} onSelectImage={() => setState({ previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' })} onRemoveImage={() => setState({ previewUrl: ''})} />
```

```react
state: { previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' }
---
<ImageWell fitPreviewToSquare previewUrl={state.previewUrl} onSelectImage={() => setState({ previewUrl: 'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs' })} onRemoveImage={() => setState({ previewUrl: ''})} />
```

### Custom add text

```react
<ImageWell onSelectImage={() => alert("Choose a room layout")}>
    + Add Room Layout
</ImageWell>
```
