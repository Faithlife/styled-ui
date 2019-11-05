/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Popover, PopoverManager, PopoverReference } from '../index';

const Table = styled.table`
	border-collapse: collapse;
`;

const TableHead = styled.thead`
	border-bottom: 2px solid #d6d6d6;
`;

const HeadingCell = styled.th`
	text-align: left;
	padding: 16px 16px 16px 0;
	line-height: 1.44;
	vertical-align: top;
`;

const Cell = styled.td`
	text-align: left;
	padding: 16px 16px 16px 0;
	line-height: 1.44;
	vertical-align: top;
	white-space: pre-wrap;
`;

const Row = styled.tr`
	border-bottom: 1px solid #d6d6d6;
`;

class CollapsableText extends Component {
	static propTypes = {
		children: PropTypes.node.isRequired,
	};

	state = { isPopoverOpen: false };

	componentWillUnmount() {
		document.removeEventListener('click', this.handleCloseTooltip);
	}

	handleCloseTooltip = () => {
		this.setState({ isPopoverOpen: false });
		document.removeEventListener('click', this.handleCloseTooltip);
	};

	handleOpenTooltip = () => {
		if (this.state.isPopoverOpen) {
			return;
		}
		document.addEventListener('click', this.handleCloseTooltip);
		this.setState({ isPopoverOpen: true });
	};

	render() {
		return (
			<PopoverManager>
				<PopoverReference>
					<Button variant="primaryOutline" size="small" onClick={this.handleOpenTooltip}>
						Reveal
					</Button>
				</PopoverReference>
				<Popover isOpen={this.state.isPopoverOpen} placement="top">
					{this.props.children}
				</Popover>
			</PopoverManager>
		);
	}
}

export function DocgenTable(props) {
	if (!props.component) {
		return <p>The component prop is required.</p>;
	}
	const docgen = props.component.__docgenInfo;

	if (!docgen) {
		return <p>docgenInfo not found for {props.component.name}</p>;
	}

	const componentProps = Object.keys(docgen.props).map(name => ({
		name,
		...docgen.props[name],
	}));

	return (
		<div>
			<div>
				<h1>{props.displayName || docgen.displayName}</h1>
				<p>{docgen.description}</p>
			</div>
			<Table>
				<TableHead>
					<tr>
						<HeadingCell>prop</HeadingCell>
						<HeadingCell>type</HeadingCell>
						<HeadingCell>shape</HeadingCell>
						<HeadingCell>default</HeadingCell>
						<HeadingCell>required</HeadingCell>
						<HeadingCell>description</HeadingCell>
					</tr>
				</TableHead>
				<tbody>
					{componentProps.map(componentProp => (
						<Row key={componentProp.name}>
							<Cell>{componentProp.name}</Cell>
							<Cell>{componentProp.type && componentProp.type.name}</Cell>
							<Cell>
								{componentProp.type &&
									componentProp.type.value &&
									componentProp.type.name === 'shape' && (
										<CollapsableText>
											{Object.keys(componentProp.type.value).map(propName => (
												<div key={propName}>
													{propName}: {componentProp.type.value[propName].name}{' '}
													{componentProp.type.value[propName].required && '(required)'}
												</div>
											))}
										</CollapsableText>
									)}
							</Cell>
							<Cell>
								{componentProp.defaultValue &&
								componentProp.type &&
								componentProp.type.name === 'shape' ? (
									<CollapsableText>{componentProp.defaultValue.value}</CollapsableText>
								) : componentProp.defaultValue ? (
									componentProp.defaultValue.value
								) : null}
							</Cell>
							<Cell>{componentProp.required && 'yes'}</Cell>
							<Cell>{componentProp.description}</Cell>
						</Row>
					))}
				</tbody>
			</Table>
		</div>
	);
}

DocgenTable.propTypes = {
	component: PropTypes.func.isRequired,
	displayName: PropTypes.string,
};
