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

export const DefaultControls: { [key in ControlKind]: React.FunctionComponent } = {
	Header: props => (
		<LocalizedSelect name="header" tooltipKey="textStyles" options={headerOptions} {...props} />
	),
	Bold: props => <LocalizedButton name="bold" tooltipKey="bold" tabIndex={-1} {...props} />,
	Italic: props => <LocalizedButton name="italic" tooltipKey="italic" tabIndex={-1} {...props} />,
	Underline: props => (
		<LocalizedButton
			name="underline"
			tooltipKey="underline"
			style={{ marginTop: '1px' }}
			tabIndex={-1}
			{...props}
		/>
	),
	Strikethrough: props => (
		<LocalizedButton name="strike" tooltipKey="strikethrough" tabIndex={-1} {...props} />
	),
	Blockquote: props => (
		<LocalizedButton name="blockquote" tooltipKey="blockquote" tabIndex={-1} {...props} />
	),
	Clean: props => (
		<LocalizedButton
			name="clean"
			tooltipKey="clearFormatting"
			style={{ marginTop: '2px' }}
			tabIndex={-1}
			{...props}
		/>
	),
	OrderedList: props => (
		<LocalizedButton
			name="list"
			tooltipKey="numberedList"
			value="ordered"
			tabIndex={-1}
			{...props}
		/>
	),
	BulletList: props => (
		<LocalizedButton
			name="list"
			tooltipKey="bulletedList"
			value="bullet"
			tabIndex={-1}
			{...props}
		/>
	),
	DecreaseIndent: props => (
		<LocalizedButton
			name="indent"
			tooltipKey="decreaseIndent"
			value="-1"
			tabIndex={-1}
			{...props}
		/>
	),
	IncreaseIndent: props => (
		<LocalizedButton
			name="indent"
			tooltipKey="increaseIndent"
			value="+1"
			tabIndex={-1}
			{...props}
		/>
	),
	Align: props => <LocalizedSelect name="align" tooltipKey="align" {...props} />,
	Link: props => (
		<LocalizedButton
			name="insertLink"
			tooltipKey="insertLink"
			disabled={true}
			tabIndex={-1}
			{...props}
		>
			<InsertLinkIcon />
		</LocalizedButton>
	),
	Image: props => (
		<LocalizedButton name="insertImage" tooltipKey="insertImage" tabIndex={-1} {...props}>
			<InsertImageIcon />
		</LocalizedButton>
	),
	TextSnippet: props => (
		<LocalizedButton name="textSnippet" tooltipKey="textSnippet" tabIndex={-1} {...props}>
			<TextSnippetIcon />
		</LocalizedButton>
	),
};
