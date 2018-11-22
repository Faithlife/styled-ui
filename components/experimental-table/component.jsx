import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ArrowUp } from '../../components/icons';
import * as Styled from './styled.jsx';

export class ExperimentalTable extends Component {
	/* eslint-disable react/no-unused-prop-types */
	static propTypes = {
		headings: PropTypes.arrayOf(
			PropTypes.shape({
				heading: PropTypes.string.isRequired,
				className: PropTypes.string,
				onClick: PropTypes.func,
				sortOrder: PropTypes.string,
			}),
		),
		data: PropTypes.arrayOf(
			PropTypes.shape({
				key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
				rowData: PropTypes.arrayOf(
					PropTypes.shape({
						content: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.node]),
						style: PropTypes.object,
					}),
				),
				onClickRow: PropTypes.func,
			}),
		),
	};
	/* eslint-enable react/no-unused-prop-types */

	static sortOrders = {
		ASCENDING: 'ASC',
		DESCENDING: 'DESC',
	};

	static getDerivedStateFromProps(props) {
		const { headings, data } = props;
		const tableHeadings = !headings
			? []
			: headings.map(content => {
					const orderIcon =
						content.sortOrder === ExperimentalTable.sortOrders.ASCENDING ? (
							<ArrowUp />
						) : (
							<ArrowUp style={{ transform: 'rotateX(180deg)' }} />
						);
					return (
						<Styled.Heading
							key={content.heading}
							sortable={!!content.onClick}
							onClick={content.onClick ? content.onClick : null}
						>
							{content.onClick ? orderIcon : ''} {content.heading}
						</Styled.Heading>
					);
			  });

		const tableData = !data
			? []
			: data.map(({ key, rowData, onClickRow }) => {
					const tds = rowData.map((cellData, i) => (
						<Styled.TableCell key={`${key}-${i}`} style={cellData.style}>
							{cellData.content}
						</Styled.TableCell>
					));
					return (
						<Styled.TableRow key={key} onClick={onClickRow}>
							{tds}
						</Styled.TableRow>
					);
			  });

		return { tableHeadings, tableData };
	}

	state = {};

	render() {
		const { tableHeadings, tableData } = this.state;

		const tableHeader = !tableHeadings ? (
			undefined
		) : (
			<Styled.TableHeader>
				<Styled.HeaderRow>{tableHeadings}</Styled.HeaderRow>
			</Styled.TableHeader>
		);

		const tableBody = !tableData ? undefined : <tbody>{tableData}</tbody>;

		return (
			<Styled.Table>
				{tableHeader}
				{tableBody}
			</Styled.Table>
		);
	}
}
