For the next major version of Styled UI, the LoadingSpinner component has been rebuilt to use Styled System primitives and its theme API.

You can opt in to the new API now by importing `{ LoadingSpinner } from '@faithlife/styled-ui/v6'`. When v6 is released, the `/v6` entrypoint will continue to be supported with a deprecation warning until v7 is released.

### Default size

```react
showSource: true
---
<LoadingSpinner />
```

### Small

```react
showSource: true
---
<LoadingSpinner variant="small" />
```

### Medium

```react
showSource: true
---
<LoadingSpinner variant="medium" />
```

### Medium with Custom Dimensions

```react
showSource: true
---
<LoadingSpinner variant="medium" size={80} />
```

### Large

```react
showSource: true
---
<LoadingSpinner variant="large" />
```
