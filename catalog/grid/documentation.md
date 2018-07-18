Install ag-grid to your project as a dependency. If you are developing a library, install these as peerDependencies and devDependencies.

```
yarn add ag-grid ag-grid-enterprise ag-grid-react
```

Then, import the grid into your application. Prefer to use `deltaRowDataMode` so that when state is updated the grid does not lose focus. Check out the [example code](https://github.com/Faithlife/styled-ui/tree/master/catalog/grid) in the repo.
