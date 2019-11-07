import React from 'react';
import styled from 'styled-components';
import { Box } from '../Box';
import { useElementSize } from '../shared-hooks/useElementSize';

export function AutoSizedRowMasonry({
	items,
	getItemAspectRatio,
	gapSize,
	targetRowHeight,
	minRowItems,
	maxRowItems,
	renderItem,
	...props
}) {
	const [size, containerRef] = useElementSize();

	const layout =
		size &&
		getRowLayout(items, {
			getItemAspectRatio,
			width: size.width,
			gapWidth: gapSize,
			targetHeight: targetRowHeight,
			minRowItems,
			maxRowItems,
		});

	return (
		<Box ref={containerRef} {...props} display="grid" gridAutoFlow="row" gridRowGap={px(gapSize)}>
			{layout &&
				layout.rows.map((row, i) => (
					<MasonryRow
						key={i}
						row={row}
						renderCell={({ item, aspectRatio, index }) => (
							<MasonryCell key={index} aspectRatio={aspectRatio}>
								{renderItem(item)}
							</MasonryCell>
						)}
					/>
				))}
		</Box>
	);
}

export const MasonryRow = ({ row, renderCell }) => (
	<Row rowHeight={row.rowHeight} gapWidth={row.gapWidth}>
		{row.items.map(({ item, aspectRatio }, index) => renderCell({ item, aspectRatio, index }))}
	</Row>
);

const Row = styled(Box).attrs(({ rowHeight, gapWidth }) => ({
	style: { '--row-height': px(rowHeight), '--column-gap': px(gapWidth) },
}))`
	display: grid;
	grid-auto-flow: column;
	grid-auto-columns: max-content;
	grid-column-gap: var(--column-gap);
	height: var(--row-height);
	width: 100%;
`;

export const MasonryCell = styled(Box).attrs(({ aspectRatio }) => ({
	style: { '--aspect-ratio': aspectRatio },
}))`
	display: flex;
	height: 100%;
	width: calc(var(--aspect-ratio) * var(--row-height));
`;

const px = x => `${x}px`;

export function getRowLayout(
	items,
	{ getItemAspectRatio, width, targetHeight, minRowItems, maxRowItems, gapWidth },
) {
	let remaining = items.map(item => ({ item, aspectRatio: getItemAspectRatio(item) }));
	const rows = [];

	while (remaining.length) {
		const solutions = [];
		for (let i = minRowItems || 1; i <= maxRowItems; i++) {
			const solutionItems = remaining.slice(0, i);

			// pad the last row with spacer items to keep it from scaling way up
			while (solutionItems.length < i) {
				solutionItems.push({ spacer: true, item: null, aspectRatio: 1 });
			}

			const solutionRowHeight = getRowHeight(
				solutionItems,
				width - (solutionItems.length - 1) * (gapWidth || 0),
			);

			solutions.push({
				rowHeight: solutionRowHeight,
				items: solutionItems.filter(x => !x.spacer),
				gapWidth,
			});
		}

		const bestSolution = solutions.reduce((best, other) =>
			Math.abs(other.rowHeight - targetHeight) < Math.abs(best.rowHeight - targetHeight)
				? other
				: best,
		);

		rows.push(bestSolution);
		remaining = remaining.slice(bestSolution.items.length);
	}

	return {
		rows,
		averageRowHeight: rows.reduce((total, curr) => total + curr.rowHeight, 0) / rows.length,
		averageItemsPerRow: items.length / rows.length,
	};
}

function getRowHeight(items, width) {
	return width / items.reduce((total, x) => total + x.aspectRatio, 0);
}
