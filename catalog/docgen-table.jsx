/* eslint-disable no-underscore-dangle */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	font-family: 'Roboto';
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
`;

const Row = styled.tr`
	border-bottom: 1px solid #d6d6d6;
`;

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
							<Cell>{componentProp.defaultValue && componentProp.defaultValue.value}</Cell>
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
