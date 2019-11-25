# QuillEditor

The purpose of this quill editor is to provide a unified rich text editor experience across Faithlife apps.

- [Getting Started](#getting-started)
  - [Controlled vs Uncontrolled](#controlled-vs-uncontrolled)
- [Scope](#scope)
- [API reference](#api-reference)
  1. [Exports](#exports)
  2. [Props](#props)
     - [QuillEditor](#quilleditor)
     - [Toolbar](#toolbar)
  3. [Methods](#methods)
  4. [Plain text mode](#plain-text-mode)

## Getting started

Follow these steps to get started with the quill editor:

1. Import the component

```
    import QuillEditor, { Toolbar } from '@faithlife/quill-editor';
    import '@faithlife/quill-editor/dist/quill-editor.css';
```

2. Import the stylesheet

```
    import '@faithlife/quill-editor/dist/quill-editor.css';
```

3. Use the component

```
const MyComponent: React.FunctionComponent = () => {
    const [content, setContent] = useState();

    const handleChange = (value) => {
        setContent(value)
    }

    return (
        <QuillEditor editorId="my-editor" value={content} onContentChange={handleChange}>
            <Toolbar editorId="my-editor" />
        </QuillEditor>
    );
}
```

### Controlled vs Uncontrolled mode

If `defaultValue` is defined, `QuillEditor` will be put into Uncontrolled mode. In this mode `onContentChange` will only return the initial value (for performance reasons). To retrieve the latest changes call `getEditor().getContents()`. (see [Methods](#methods))

A known limitation in Controlled mode: If `value` is updated to a non-user generated value while the editor is focused, the editor will lose focus. (e.g. If a consumer manually imposed a max character limit)

## Scope

The following are the current known instances that will be merged with this editor:

- CommunicationsApi - [QuillRichTextEditor](https://git.faithlife.dev/Logos/CommunicationsApi/blob/master/frontend/packages/communications-ui/components/edit-communication/EmailEditor/QuillRichTextEditor.tsx)
- Sites.Admin - [TextEditor](https://git.faithlife.dev/Logos/Sites.Admin/blob/master/src/Sites.Admin/Private/scripts/components/text-editor/index.jsx)
- Faithlife - [QuillEditor](https://git.faithlife.dev/Logos/Faithlife/blob/master/src/Faithlife.Web/Scripts/src/components/shared/quill-editor.jsx)
- ChMS - [RichText](https://git.faithlife.dev/Logos/ChurchManagement/blob/master/chms-tool/src/components/EditRecordWizard/FormComponents/RichText/index.tsx)

The following editors have very specific needs, and are outside the scope of this project:

- Sermon Editor
- Notes Tool

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

- includes: `Header`, `Bold`, `,Italic`, `Underline`, `Strikethrough`, `Blockquote`, `Clean`, `OrderedList`, `BulletList`, `DecreaseIndent`, `IncreaseIndent`, `Align`, `Link`, `Image`, `TextSnippet`

The recommended pattern is to use the `Toolbar` component as a child of the `QuillEditor` component like so:

```
<QuillEditor editorId="my-editor">
    <Toolbar editorId="my-editor" />
</QuillEditor>
```

### Props

#### QuillEditor

`editorId` - `string`: `editorId` must match the `editorId` of an available toolbar. `editorId` pairs must be unique.

`className` - `string`: Classes to apply to the container surrounding the editor. \*Does not attach classes directly to the react-quill component.

`defaultValue` - `Delta`: Initial value for the uncontrolled editor. Must be a Quill Delta.

`placeholder` - `string`: The placeholder text for an empty editor.

`formats - string[]`: Whitelist for formats to be enabled during editing. Pass an empty array to only allow plain text. See [Quill Formats](https://quilljs.com/docs/formats/) for the complete list of options. The default list of enabled formats is: `['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'indent', 'align', 'link', 'image', 'width']`

`modules`: Key value pairs of additional modules to include or override. See [Quill Modules](https://quilljs.com/docs/modules/) for more information.

`toolbarHandlers`: Key value pairs of additional toolbar handlers to include or override. This is a convenience prop, since toolbar is a quill module, which can also be overriden using the `modules` prop. See [Quill Toolbar Module](https://quilljs.com/docs/modules/toolbar/) for more information. If any custom toolbar controls are added, they will require a custom toolbar handler.

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

### Methods

#### QuillEditor

- `insertText(text, start, end, source)` - Inserts text at the desired location, replacing the content between the start and end indexes. `start` and `end` default to the selection indexes, or to the end of content if no selection is available.
- `deleteText(start, end, source)` - Deletes text at between the given indexes. `start` and `end` default to the selection indexes, or to the end of content if no selection is available.
- `getHTML(options)` - Returns the html representation of the editor contents.
- `getEditor()` - Returns a reference to the quill editor api. (See the [Quill docs](https://quilljs.com/docs/api/))

### Plain text mode

To put the editor into plain text mode, simply pass an empty array to the `formats` prop. The editor may still have a toolbar, but all default controls, except `TextSnippet` will not work.
