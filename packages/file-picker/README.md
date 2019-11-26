# FilePicker

The purpose of this component is to provide a unified AmberPicker experience across Faithlife apps.

- [Getting Started](#getting-started)
- [Scope](#scope)
- [API reference](#api-reference)
  1. [Exports](#exports)
  2. [Props](#props)
     - [FilePicker](#filepicker)
     - [Tab](#tab)

## Getting started

1. Import the component

```jsx
import { FilePicker } from '@faithlife/file-picker';
```

2. Use the component

```jsx
const MyComponent = () => {
	...
    return (
		<FilePicker
			title={localization.filePicker}
			isOpen={isOpen}
			onFilesSelected={onFilesSelected}
			onCancel={onCancel}
		>
			<FilePicker.AmberTab title={localization.groupVault} accountId={12345678} />
			<FilePicker.FaithlifeStockTab />
			<FilePicker.UnsplashTab />
        </FilePicker>
    );
}
```

## Scope

The following are the current known instances that will be replaced by this shared component:

- Faithlife.com - [AmberModal](https://git.faithlife.dev/Logos/Faithlife/blob/master/src/Faithlife.Web/Scripts/src/components/shared/photo-picker/amber-modal.jsx)
- ChMS - [AmberOverlay](https://git.faithlife.dev/Logos/ChurchManagement/blob/cc1a09afeab6b92095db0e7d1cd4f9e3f6674cf2/chms-tool/src/components/Shared/AmberOverlay/index.tsx)
- QuillEditor - [FilePickerModal](https://git.faithlife.dev/Logos/FaithlifeEquipment/blob/master/packages/quill-editor/src/components/FilePickerModal/index.tsx)

## API reference

### Exports

```
import { FilePicker } from '@faithlife/file-picker';
const { Tab, AmberTab, FaithlifeStockTab, UnsplashTab } = FilePicker;

```

The recommended pattern is to use the various `Tab` components as children of the `FilePicker` component like so:

```
<FilePicker>
	<FilePicker.Tab title="Title" />
	<FilePicker.AmberTab title="Group Vault" accountId={12345678} />
</FilePicker>
```

### Props

#### FilePicker

`title` - `string`: Title for the Modal component.

`isOpen` - `boolean`: Controls whether the Modal is open.

`onFilesSelected` - `function`: Called when the user clicks the Insert button within the Amber Iframe.

`onCancel` - `function`: Called when the user clicks the Cancel button within the Amber Iframe, or otherwise closes the Modal without inserting a file.

`children` - `array`: The FilePicker expects that its children are iterable, and that they have `title` props to be displayed in the Tab List. The recommended pattern is to use the Tab helper components exported by this package.

#### FilePicker.Tab

`title` - `node`: Will be rendered in the list of Tabs.

`padding` - `number`: Will be applied to the TabPanel content.

`children` - `node`: Will be rendered as the contents of the TabPanel when the Tab is active.

#### FilePicker.AmberTab

Accepts the props necessary for rendering an Amber IFrame, as well as a `title` prop for the Tab List.

#### FilePicker.FaithlifeStockTab

Has default props for rendering the correct Amber Vault for Faithlife Stock.

#### FilePicker.UnsplashTab

Has default props for rendering the correct Amber Vault for Unsplash.
