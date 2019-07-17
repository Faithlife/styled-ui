Install ag-grid to your project as a dependency. If you are developing a library, install these as peerDependencies and devDependencies.

```
yarn add ag-grid-community ag-grid-enterprise ag-grid-react
```

You will need to include the license for enterprise at the top of your application as well as the css. If you are building for faithlife.com then this is not necessary.

```code
lang: js
---
import { LicenseManager } from 'ag-grid-enterprise'
import '@faithlife/styled-ui/dist/ag-grid.css';

LicenseManager.setLicenseKey('secret-license-key');
```

## Component Documentation

This documentation is automatically generated from jsdoc comments.

```react
noSource: true
---
<DocgenTable component={BaseTable} displayName="Shared props between all tables" />
```

```react
noSource: true
---
<DocgenTable component={PaginatedTable} />
```

```react
noSource: true
---
<DocgenTable component={TableHeading} />
```
