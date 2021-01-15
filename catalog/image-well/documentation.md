An `ImageWell` is a component used to select and display an image.

```react
showSource: true

state: { previewUrl: '' }

---

<ImageWell
    previewUrl={state.previewUrl}
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Image selected");
        }  else {
            alert("Image added");
            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });
        }
    }}
    onRemoveImage={() => {
        setState({ previewUrl: ''});
        alert("Image removed");
    }}
/>
```

### Default preview image controls

When a `previewUrl` is provided, an icon will appear in the upper-right corner of the ImageWell.

If `onRemoveImage` is provided, an X icon will be shown in the upper-right corner and the function will be passed to the icon's `onClick` handler. The rest of the `ImageWell` can be clicked and will call `onSelectImage`. This is useful if you want to be able to remove an image and also do something when the preview image is clicked, like display it in a lightbox.

```react
showSource: true

state: { previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' }

---

<ImageWell
    previewUrl={state.previewUrl}
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Image selected");
        }  else {
            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });
        }
    }}
    onRemoveImage={() => {
        setState({ previewUrl: ''});
        alert("Image removed");
    }}
/>
```

If `onRemoveImage` is not provided, a camera icon will be shown in the upper-right corner. Clicking any part of the `ImageWell` will call `onSelectImage`. This is useful if you only want the user to be able to change and not remove an image.

```react
showSource: true

state: { previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' }

---

<ImageWell
    previewUrl={state.previewUrl}
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Choose a new image");
        }
    }}
/>
```

### Preview image size

By default, the size of the preview image is constrained to fit within the ImageWell. Specifying `fitPreviewToSquare` will scale the image to fit the container.

```react
showSource: true

---

<ImageWell
    fitPreviewToSquare
    previewUrl={'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs'}
/>

```

### Custom content

#### ImageWell.SelectContent

Provide `ImageWell.SelectContent` to change what the `ImageWell` displays when there is no `previewUrl`.

```react
showSource: true

state: { previewUrl: '' }

---

<ImageWell
    previewUrl={state.previewUrl}
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Room layout selected");
        }  else {
            alert("Room layout added");
            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });
        }
    }}
    onRemoveImage={() => {
        alert("Room layout removed");
        setState({ previewUrl: ''});
    }}
>
    <ImageWell.SelectContent>
        + Add Room Layout
    </ImageWell.SelectContent>
</ImageWell>
```

#### ImageWell.PreviewContent

Provide `ImageWell.PreviewContent` to change what gets displayed over the preview image.

```react
showSource: true

state: { previewUrl: ''}

---

<ImageWell
    previewUrl={state.previewUrl}
    onSelectImage={() => {
        if (state.previewUrl) {
            alert("Room layout selected");
        }  else {
            alert("Room layout added");
            setState({ previewUrl: 'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs' });
        }
    }}
>
    <ImageWell.PreviewContent>
        <ImageWell.RemoveIcon
            onClick={() => {
                alert("Room layout removed");
                setState({ previewUrl: ''});
            }}
        />
        <FavoriteFilled
            color="yellow"
            style={{
                position: 'absolute',
                top: '6px',
                left: '6px',
            }}
            onClick={(e) => {
                e.stopPropagation();
                alert("Star clicked");
            }}
        />

    </ImageWell.PreviewContent>
    <ImageWell.SelectContent>
        + Add Room Layout
    </ImageWell.SelectContent>
</ImageWell>
```

#### Icons

The X and camera icons that are shown without custom `ImageWell.PreviewContent` can be used in custom preview content.

```react
showSource: true

---

<ImageWell
    previewUrl={'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs'}
>
    <ImageWell.PreviewContent>
        <ImageWell.RemoveIcon onClick={() => alert("Remove icon clicked")}/>
    </ImageWell.PreviewContent>
</ImageWell>
```

```react
showSource: true

---

<ImageWell
    previewUrl={'https://files.logoscdn.com/v1/files/30472073/assets/6474223/content.jpg?signature=YJ26qbTG_tyIdVHvhowUOoqT7Bs'}
>
    <ImageWell.PreviewContent>
        <ImageWell.CameraIcon onClick={() => alert("Camera icon clicked")}/>
    </ImageWell.PreviewContent>
</ImageWell>
```
