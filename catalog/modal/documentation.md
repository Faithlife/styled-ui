For the next major version of Styled-UI, the Modal component has been rebuilt to use styled-system primitives.

You can opt-in to the new API now by importing `{ Modal } from @faithlife/styled-ui/v6`

When v6 is released, the `/v6` entrypoint will continue to be supported with a deprecation warning until v7 is released.

```react
noSource: true
---
<DocgenTable component={Modal} />
```

```react
noSource: true
---
<DocgenTable component={Modal.Header} displayName="Modal.Header" />
```

```react
noSource: true
---
<DocgenTable component={Modal.Content} displayName="Modal.Content" />
```

```react
noSource: true
---
<DocgenTable component={Modal.Footer} displayName="Modal.Footer" />
```

```react
noSource: true
---
<DocgenTable component={Modal.FooterButtons} displayName="Modal.FooterButtons" />
```
