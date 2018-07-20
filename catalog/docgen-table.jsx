/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../components/main.js';
import { Popover, PopoverBody } from '../components/bootstrap';

const Container = styled.div`
	font-family: 'Source Sans Pro';
`;

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

	buttonRef = React.createRef();

	state = { isPopoverOpen: false };

	render() {
		return (
			<div id={`fl-inferredbase-${this.id}`} ref={this.buttonRef}>
				<Button
					primaryOutline
					small
					onClick={state => this.setState({ isPopoverOpen: !state.isPopoverOpen })}
				>
					Reveal
				</Button>
				{this.state.isPopoverOpen && (
					<Popover
						placement="top"
						isOpen={this.state.isPopoverOpen}
						target={this.buttonRef.current}
						toggle={() => this.setState({ isPopoverOpen: false })}
					>
						<PopoverBody>{this.props.children}</PopoverBody>
					</Popover>
				)}
			</div>
		);
	}
}

export default function DocgenTable(props) {
	const docgen = props.component.__docgenInfo;

	const componentProps = Object.keys(docgen.props).map(name => ({
		name,
		...docgen.props[name],
	}));

	return (
		<Container>
			<div>
				<h1>{docgen.displayName}</h1>
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
		</Container>
	);
}

DocgenTable.propTypes = {
	component: PropTypes.func.isRequired,
};
