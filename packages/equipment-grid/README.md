# Equipment Grid

# Shared Props for all grids

A wrapper of ag-grid with some boilerplate code to handle initialization and sorting/ filtering

## Props

### `children`

type: `node`

### `context`

An object that will be passed to cell components

type: `object`

### `data`

An array of the data for the rows

type: `arrayOf[object Object]`

### `filterText`

Text to filter the rows on

type: `string`

### `filters`

An object of filters see examples and https://www.ag-grid.com/javascript-grid-filter-provided-simple/#filterOptions

type: `object`

### `handleCellEdit`

Called with new data after the existing data has been edited. Required for dragDrop and cell editing

type: `func`

### `handleGetRowId`

Your data should have an id property or this handler must be included

type: `func`

### `hasPagingBar`

Whether component is simple table or paginated table

type: `bool`

### `hideHeaders`

Hide headers

type: `bool`

### `isSmallViewport`

type: `bool`

### `maxRows`

The Max amount of rows to show in the table. Leave blank to enable auto height/ infinite scroll

type: `number`

### `onRowClick`

Handler for selected rows

type: `func`

### `onRowDataChange`

Called after a row is updated with the new row data

type: `func`

### `onRowSelect`

Called when a row is selected with a checkbox

type: `func`

### `rowHeight`

The height, in pixels, of non-header rows in the table. If not provided, default is 45px

type: `number`

### `rowSelectionType`

Whether to allow single or multi row select, Use 'GridComponent'.rowSelectionOptions

type: `enumObject.values(BaseGrid.rowSelectionOptions)`

### `sortModel`

The current sortmodel for the table

type: `object`

### `updateSortModel`

Called when `sortModel` is updated by the table

type: `func`

# SimpleGrid Props

## Props

### `autoGroupExpansion`

Use one of SimpleGrid.expandedRowsOptions

type: `enumObject.values(SimpleGrid.expandedRowsOptions)`

### `enableDragDrop`

type: `bool`

### `groupSelectsChildren`

If you select a group it will select all its children

type: `bool`
defaultValue: `true`

### `groupSelectsFilteredChildren`

Only works if groupSelectsChildren is true. Groups will only select children that are present after a filter is applied

type: `bool`

### `isDraggableRow`

Optional callback called for each row to see if it should be draggable. Passes (isGroup: boolean, rowData: object)

type: `func`

### `isValidDropTarget`

Is the current drop target a valid parent called with the row data and the new path

type: `func`

### `onDataChange`

Called after a drag-drop with the updated child tree

type: `func`

# PaginatedGrid

## Props

### `currentPageNumber`

type: `number`

### `onPageNumberChange`

type: `func`

# GridColumn

## Props

### `cellComponent`

A react component to render in the cell

type: `func`

### `defaultSort`

type: `enumObject.values(GridColumn.sortOptions)`

### `displayName`

type: `string`

### `fieldName`

type: `string`

### `filter`

What to filter by in this column

type: `enumObject.values(GridColumn.filterByOptions)`

### `groupByColumn`

Whether to use the column properties as a group

type: `bool`

### `hasInteractableElement`

Suppress the entire row receiving the click when you have an interactable element

type: `bool`

### `isEditable`

Makes the rows in this column editable

type: `bool`

### `isLargeViewportOnly`

Whether the column should only show on larger viewports

type: `bool`

### `isResizable`

Allows the column to be resized

type: `bool`
defaultValue: `true`

### `isRightAligned`

type: `bool`

### `isSmallViewportOnly`

Whether the column should only show on small viewports

type: `bool`

### `isSortable`

type: `bool`
defaultValue: `true`

### `maxWidth`

type: `number`

### `minWidth`

type: `number`

### `shouldBeEditable`

Expects boolean return. Called with (isGroup: bool, rowData: object)

type: `func`

### `shouldShowCheckbox`

Expects boolean return. Called with (isGroup: bool, rowData: object)

type: `func`

### `showCheckbox`

type: `bool`

### `suppressMenu`

Where to hide the ag-grid options menu

type: `bool`
defaultValue: `true`

### `width`

type: `number`
