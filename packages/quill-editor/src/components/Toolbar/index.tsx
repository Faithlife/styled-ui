import React from 'react';
import styled from 'styled-components';
import ControlKind from './ControlKind';
import { ToolbarGrouping } from './ToolbarControls';
import { DefaultControls } from './DefaultControls';

const ToolbarContainer = styled.div`
	&.ql-toolbar.ql-snow {
		border: none;
		border-bottom: 1px solid #c7c7c7;
	}
	display: flex;
	flex: 0 0 auto;

	&.ql-snow .ql-picker.ql-expanded .ql-picker-label,
	&.ql-snow .ql-picker.ql-expanded .ql-picker-options {
		border-color: transparent;
	}
`;

export type ToolbarControlLayout = (ControlKind | ControlKind[])[];

export interface IToolbarProps {
	editorId: string;
	controls?: ToolbarControlLayout;
	className?: string;
}

const DefaultToolbarLayout: ToolbarControlLayout = [
	ControlKind.Header,
	[
		ControlKind.Bold,
		ControlKind.Italic,
		ControlKind.Underline,
		ControlKind.Strikethrough,
		ControlKind.Blockquote,
	],
	ControlKind.Clean,
	[ControlKind.OrderedList, ControlKind.BulletList, ControlKind.Align],
	[ControlKind.Link, ControlKind.Image, ControlKind.TextSnippet],
];

const mapControls = (controls: ToolbarControlLayout) =>
	controls.map((control, index) => {
		const group = Array.isArray(control) ? control : [control];
		return (
			<ToolbarGrouping key={index}>
				{group.map((control: ControlKind, index: number) => {
					const Control = DefaultControls[control];
					return <Control key={index} />;
				})}
			</ToolbarGrouping>
		);
	});

export const Toolbar: React.FunctionComponent<IToolbarProps> = ({
	controls,
	editorId,
	className,
	children,
}) => (
	<ToolbarContainer id={editorId} className={['ql-toolbar', 'ql-snow', className]}>
		{controls && mapControls(controls)}
		{children &&
			React.Children.map(children, child =>
				React.cloneElement(child as React.ReactElement, { isRoot: true })
			)}
		{!controls && !children && mapControls(DefaultToolbarLayout)}
	</ToolbarContainer>
);
