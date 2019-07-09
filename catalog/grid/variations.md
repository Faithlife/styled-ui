These examples use `ag-grid-react` with the Faithlife theme applied. Some features require an enterprise license to be set.

### Simple

Member directory with sortable columns.

```react
<div style={{ width: '100%', height: '500px' }}>
	<InfiniteScrollTable data={[ { test: 'testrow', test2: 'test2row' } ]}>
		<TableHeading displayName="test" fieldName="test" />
		<TableHeading displayName="test2" fieldName="test2" />
	</InfiniteScrollTable>
</div>
```
