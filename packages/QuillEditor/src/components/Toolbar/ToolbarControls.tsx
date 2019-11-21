import React from 'react';
import styled from 'styled-components';
import { TooltipTitle, Tooltip } from '../Tooltip';

/* STYLED UTILITY COMPONENTS */

const StyledSelect = styled.select<{ label: string; placement?: string }>`
	${({ label }) =>
		label &&
		`
		& .ql-picker-label::before {
			padding-right: 20px;
			content: "${label}";
		}

		& .ql-picker-item::before {
			content: attr(data-label);
		}
	`}

	& .ql-picker-options {
		${({ placement }) => (placement === 'left' ? 'right: 0;' : '')}
	}

	&:not(.ql-align) .ql-picker-item:not([data-value]) {
		display: none;
	}

	&.ql-expanded .ql-picker-label,
	&.ql-expanded .ql-picker-options {
		border-color: transparent !important;
	}
`;

const FormatContainer = styled.div`
	float: left;
	height: 24px;

	& .ql-picker.ql-expanded ~ ${TooltipTitle} {
		display: none !important;
	}

	& button:disabled {
		opacity: 0.5;
	}

	& button:disabled .ql-stroke {
		stroke: #444 !important;
	}

	& svg {
		height: initial !important;
	}

	& button:hover svg.custom-icon path {
		fill: #06c;
	}
`;

const StyledToolbarGrouping = styled.div`
	${({ align }) => align === 'right' && 'margin-left: auto'}
`;

/* INTERFACES */

export interface IToolbarControlProps {
	name: string;
	tooltip: string;
	isRoot?: boolean;
}

export interface IToolbarButtonProps extends IToolbarControlProps {
	value?: string;
}

export interface ISelectOption {
	display: string;
	value: string | number;
}

export interface IToolbarSelectProps extends IToolbarControlProps {
	options?: ISelectOption[];
	defaultValue?: string;
	label?: string;
}

export interface IToolbarGroupingProps {
	className?: string;
	align?: 'right' | 'left';
}

/* TOOLBAR CONTROL COMPONENTS */

export const QuillFormat: React.FunctionComponent<{ tooltip: string; isRoot?: boolean }> = ({
	tooltip,
	children,
	isRoot,
}) => {
	return (
		<FormatContainer className={isRoot && 'ql-formats'}>
			<Tooltip title={tooltip}>{children}</Tooltip>
		</FormatContainer>
	);
};

export const ToolbarButton: React.FunctionComponent<IToolbarButtonProps> = ({
	name,
	tooltip,
	value,
	isRoot,
	children,
	...props
}) => (
	<QuillFormat tooltip={tooltip} isRoot={isRoot}>
		<button className={`ql-${name}`} value={value} {...props}>
			{children}
		</button>
	</QuillFormat>
);

export const ToolbarSelect: React.FunctionComponent<IToolbarSelectProps> = ({
	name,
	tooltip,
	options,
	label,
	defaultValue = '',
	isRoot,
	...props
}) => (
	<QuillFormat tooltip={tooltip} isRoot={isRoot}>
		<StyledSelect className={`ql-${name}`} defaultValue={defaultValue} label={label} {...props}>
			{options && <option hidden disabled />}
			{options &&
				options.map(option => (
					<option value={option.value} key={option.value}>
						{option.display}
					</option>
				))}
		</StyledSelect>
	</QuillFormat>
);

export const ToolbarGrouping: React.FunctionComponent<IToolbarGroupingProps> = ({
	className,
	children,
	align,
}) => (
	<StyledToolbarGrouping align={align} className={[className, 'ql-formats']}>
		{children}
	</StyledToolbarGrouping>
);
