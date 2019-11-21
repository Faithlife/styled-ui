import React from 'react';
import { ToolbarButton, ISelectOption, ToolbarSelect } from './ToolbarControls';
import { useLocalization } from '../Localization';
import ControlKind from './ControlKind';
import TextSnippetIcon from '../../icons/text-snippet.svg';
import InsertLinkIcon from '../../icons/link.svg';
import InsertImageIcon from '../../icons/image.svg';

interface ILocalizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	name: string;
	tooltipKey: string;
	value?: string;
}

const LocalizedButton: React.FunctionComponent<ILocalizedButtonProps> = ({
	name,
	tooltipKey,
	value,
	...props
}) => {
	const { toolbar } = useLocalization();

	return <ToolbarButton name={name} tooltip={toolbar[tooltipKey]} value={value} {...props} />;
};

interface ILocalizedSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	tooltipKey: string;
	options?: ISelectOption[];
	label?: string;
	defaultValue?: string;
}

const LocalizedSelect: React.FunctionComponent<ILocalizedSelectProps> = ({
	name,
	tooltipKey,
	options,
	label,
	defaultValue,
	...props
}) => {
	const { toolbar } = useLocalization();

	return (
		<ToolbarSelect
			name={name}
			tooltip={toolbar[tooltipKey]}
			options={
				options &&
				options.map(({ display, value }) => ({
					display: toolbar[display],
					value,
				}))
			}
			defaultValue={defaultValue}
			label={label}
			{...props}
		/>
	);
};

const headerOptions: ISelectOption[] = [
	{ display: 'normal', value: '0' },
	{ display: 'heading1', value: '1' },
	{ display: 'heading2', value: '2' },
];

const Header: React.FunctionComponent = props => (
	<LocalizedSelect name="header" tooltipKey="textStyles" options={headerOptions} {...props} />
);
const Bold: React.FunctionComponent = props => (
	<LocalizedButton name="bold" tooltipKey="bold" tabIndex={-1} {...props} />
);
const Italic: React.FunctionComponent = props => (
	<LocalizedButton name="italic" tooltipKey="italic" tabIndex={-1} {...props} />
);
const Underline: React.FunctionComponent = props => (
	<LocalizedButton
		name="underline"
		tooltipKey="underline"
		style={{ marginTop: '1px' }}
		tabIndex={-1}
		{...props}
	/>
);
const Strikethrough: React.FunctionComponent = props => (
	<LocalizedButton name="strike" tooltipKey="strikethrough" tabIndex={-1} {...props} />
);
const Blockquote: React.FunctionComponent = props => (
	<LocalizedButton name="blockquote" tooltipKey="blockquote" tabIndex={-1} {...props} />
);
const Clean: React.FunctionComponent = props => (
	<LocalizedButton
		name="clean"
		tooltipKey="clearFormatting"
		style={{ marginTop: '2px' }}
		tabIndex={-1}
		{...props}
	/>
);
const OrderedList: React.FunctionComponent = props => (
	<LocalizedButton name="list" tooltipKey="numberedList" value="ordered" tabIndex={-1} {...props} />
);
const BulletList: React.FunctionComponent = props => (
	<LocalizedButton name="list" tooltipKey="bulletedList" value="bullet" tabIndex={-1} {...props} />
);
const DecreaseIndent: React.FunctionComponent = props => (
	<LocalizedButton name="indent" tooltipKey="decreaseIndent" value="-1" tabIndex={-1} {...props} />
);
const IncreaseIndent: React.FunctionComponent = props => (
	<LocalizedButton name="indent" tooltipKey="increaseIndent" value="+1" tabIndex={-1} {...props} />
);
const Align: React.FunctionComponent = props => (
	<LocalizedSelect name="align" tooltipKey="align" {...props} />
);
const Link: React.FunctionComponent = props => (
	<LocalizedButton
		name="insertLink"
		tooltipKey="insertLink"
		disabled={true}
		tabIndex={-1}
		{...props}
	>
		<InsertLinkIcon />
	</LocalizedButton>
);
const Image: React.FunctionComponent = props => (
	<LocalizedButton name="insertImage" tooltipKey="insertImage" tabIndex={-1} {...props}>
		<InsertImageIcon />
	</LocalizedButton>
);
const TextSnippet: React.FunctionComponent = props => (
	<LocalizedButton name="textSnippet" tooltipKey="textSnippet" tabIndex={-1} {...props}>
		<TextSnippetIcon />
	</LocalizedButton>
);
export const DefaultControls: { [key in ControlKind]: React.FunctionComponent } = {
	Header,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Blockquote,
	Clean,
	OrderedList,
	BulletList,
	DecreaseIndent,
	IncreaseIndent,
	Align,
	Link,
	Image,
	TextSnippet,
};
