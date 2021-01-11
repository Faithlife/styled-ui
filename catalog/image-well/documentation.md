### No preview image

```react
<ImageWell onClick={() => alert("Choose an image")} />
```

### With preview image

```react
<ImageWell fitPreviewToSquare previewUrl={'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs'} onClick={() => alert("Choose a new image")} />
```

```react
<ImageWell onClick={() => alert("Choose a new image")} previewUrl={'https://files.logoscdn.com/v1/files/47422190/assets/11389823/content.jpg?signature=kCZKvBBttRqoZJrv_S2qjo0pcrs'} />
```

### Custom add text

```react
<ImageWell onClick={() => alert("Choose a room layout")}>
    + Add Room Layout
</ImageWell>
```
