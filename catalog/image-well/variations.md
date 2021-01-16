### Variations

```react
showSource: true

state: { previewUrl: '' }

---

<ImageWell
    variant="primary"
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
