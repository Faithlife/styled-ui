Install ag-grid to your project as a dependency. If you are developing a library, install these as peerDependencies and devDependencies.

```
yarn add ag-grid-community ag-grid-enterprise ag-grid-react
```

You will need to include the license for enterprise at the top of your application as well as the css. If you are building for faithlife.com include it in the top of the file where your component is imported.

```code
lang: js
---
import { LicenseManager } from 'ag-grid-enterprise'
import '@faithlife/styled-ui/dist/ag-grid.css';

LicenseManager.setLicenseKey('secret-license-key');
```

## How to import

```
import { SimpleGrid } from '@faithlife/styled-ui/grid';
```

## Component Documentation

This documentation is automatically generated from jsdoc comments.

```react
noSource: true
---
<DocgenTable component={BaseGrid} displayName="Shared props between all tables" />
```

```react
noSource: true
---
<DocgenTable component={PaginatedGrid} />
```

```react
noSource: true
---
<DocgenTable component={TreeGrid} />
```

```react
noSource: true
---
<DocgenTable component={GridColumn} />
```
