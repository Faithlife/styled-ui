# QuillEditor

The purpose of this quill editor is to provide a unified rich text editor experience across Faithlife apps.

## Scope

The following are the current known instances that will be merged with this editor:

-   CommunicationsApi - [QuillRichTextEditor](https://git.faithlife.dev/Logos/CommunicationsApi/blob/master/frontend/packages/communications-ui/components/edit-communication/EmailEditor/QuillRichTextEditor.tsx)
-   Sites.Admin - [TextEditor](https://git.faithlife.dev/Logos/Sites.Admin/blob/master/src/Sites.Admin/Private/scripts/components/text-editor/index.jsx)
-   Faithlife - [QuillEditor](https://git.faithlife.dev/Logos/Faithlife/blob/master/src/Faithlife.Web/Scripts/src/components/shared/quill-editor.jsx)
-   ChMS - [RichText](https://git.faithlife.dev/Logos/ChurchManagement/blob/master/chms-tool/src/components/EditRecordWizard/FormComponents/RichText/index.tsx)

The following editors have very specific needs, and are outside the scope of this project:

-   Sermon Editor
-   Notes Tool

## API reference

### Exports

```
import QuillEditor, { Toolbar, ToolbarGrouping, ToolbarButton, ToolbarSelect, Tooltip, DefaultControls } from '@faithlife/quill-editor';
import '@faithlife/quill-editor/dist/quill-editor.css';
```

\*\*\* `quill-editor.css` must be imported, or quill-editor will not display correctly

`QuillEditor`: The component that renders the editor itself.

`Toolbar`: The component that renders the toolbar. Requires an associated QuillEditor component, but does not need to be a direct child.

`ToolbarGrouping`: A component to group related toolbar controls. Renders a 15px margin to the right of the grouped controls.

`ToolbarButton`: Renders a custom Quill-styled button.

`ToolbarSelect`: Renders a custom Quill-styled select.

`Tooltip`: Renders a Quill-styled tooltip.

`DefaultControls`: Default toolbar options are available through this export.

-   includes: `Header`, `Bold`, `,Italic`, `Underline`, `Strikethrough`, `Blockquote`, `Clean`, `OrderedList`, `BulletList`, `DecreaseIndent`, `IncreaseIndent`, `Align`, `Link`, `Image`, `TextSnippet`

The recommended pattern is to use the `Toolbar` component as a child of the `QuillEditor` component like so:

```
<QuillEditor editorId="my-editor">
    <Toolbar editorId="my-editor" />
</QuillEditor>
```

### Props

#### QuillEditor

`ref`: The React reference includes several imperative commands:

-   `insertText(text, start, end, source)` - Inserts text at the desired location, replacing the content between the start and end indexes. `start` and `end` default to the selection indexes, or to the end of content if no selection is available.
-   `deleteText(start, end, source)` - Deletes text at between the given indexes. `start` and `end` default to the selection indexes, or to the end of content if no selection is available.
-   `getHTML(options)` - Returns the html representation of the editor contents.
-   `getEditor()` - Returns a reference to the quill editor api.

`editorId` - `string`: `editorId` must match the `editorId` of an available toolbar. `editorId` pairs must be unique.

`className` - `string`: Classes to apply to the container surrounding the editor. \*Does not attach classes directly to the react-quill component.

`defaultValue` - `Delta`: Initial value for the uncontrolled editor. Must be a Quill Delta.

`placeholder` - `string`: The placeholder text for an empty editor.

`formats - string[]`: Whitelist for formats to be enabled during editing. Pass an empty array to only allow plain text. See [link](link). The default list of enabled formats is: `['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'indent', 'align', 'link', 'image', 'width']`

`modules`: Key value pairs of additional modules to include or override. See [link](link).

`toolbarHandlers`: Key value pairs of additional toolbar handlers to include or override. See [link](link). If any custom toolbar controls are added, they will require a custom toolbar handler.

`onChange()`: Event that is fired when content is changed. To retrieve the Delta representation of the editor's contents, use the imperative handler `quill.getEditor().getContents()`.

`onClick()`: Event that is fired when any part of the editor is clicked.

`onBlur()`: Event that is fired when editor text area loses focus.

#### Toolbar

`editorId` - `string`: `editorId` must match the `editorId` of the associated editor. `editorId` pairs must be unique.

`className` - Classes to apply to the toolbar container.

`controls` - `ControlKind[]`: Optional. The configuration of included controls to display on the toolbar. Create groups of controls by including them in an inner array. (Individual controls will be included in a group of 1) For example, take the following configuration:

```
[
	ControlKind.Header,
	[
		ControlKind.Bold,
		ControlKind.Italic,
		ControlKind.Underline,
	],
]
```

This configuration would create 2 control groups. The first would contain `Header` and the second would contain `Bold`, `Italic` and `Underline`.

The default control configuration is:

```
[
	ControlKind.Header,
	[
		ControlKind.Bold,
		ControlKind.Italic,
		ControlKind.Underline,
		ControlKind.Strikethrough,
		ControlKind.Blockquote,
	],
	ControlKind.Clean,
	[
		ControlKind.OrderedList,
		ControlKind.BulletList,
		ControlKind.Align
	],
	[
		ControlKind.Link,
		ControlKind.Image,
		ControlKind.TextSnippet
	]
]
```

Additionally, if custom toolbar controls are required, you may add them as children to the toolbar component.

Note: This will disable default controls. Use the provided `DefaultControls` module to reapply the default controls in the desired configuration. For consistency, please wrap controls in the `ToolbarGrouping` component provided.

An example of a quill editor with custom toolbar controls:

```
<QuillEditor editorId="my-editor">
	<Toolbar editorId="my-editor">
		<ToolbarGrouping>
			<DefaultControls.Header />
		</ToolbarGrouping>
		<ToolbarGrouping>
			// The handler for 'customControl' will need to be passed into the QuillEditor prop 'toolbarHandlers'
			// The handler will recieve the value '1' as it's first parameter
			<ToolbarButton name={'customControl'} value={'1'} />
		</ToolbarGrouping>
		<ToolbarGrouping>
			<DefaultControls.Bold />
			<DefaultControls.Italic />
			<DefaultControls.Underline />
		</ToolbarGrouping>
	</Toolbar>
</QuillEditor>
```

### Plain Text mode

To put the editor into plain text mode, simply pass an empty array to the `formats` prop. The editor may still have a toolbar, but all default controls, except `TextSnippet` will not work.

## Running locally

Simply clone this repository, and run the following commands in the root directory:

```
yarn
yarn start
```

After building, the example app will run at `localhost:8086`.
