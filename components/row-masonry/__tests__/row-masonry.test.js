import { AutoSizedRowMasonry, MasonryCell, MasonryRow, getRowLayout } from '../';

describe('Row Masonry', () => {
	it('should be truthy', () => {
		expect.hasAssertions();

		expect(AutoSizedRowMasonry).toBeTruthy();
		expect(MasonryRow).toBeTruthy();
		expect(MasonryCell).toBeTruthy();
		expect(getRowLayout).toBeTruthy();
	});

	it('should return consistent row layouts', () => {
		const items = [
			{ aspectRatio: 2.21955943409412 },
			{ aspectRatio: 0.9859003797276708 },
			{ aspectRatio: 2.2994515698612124 },
			{ aspectRatio: 1.3756087709650013 },
			{ aspectRatio: 1.7468094204054432 },
			{ aspectRatio: 1.287234360985344 },
			{ aspectRatio: 0.7694801207159913 },
			{ aspectRatio: 0.6343636184394491 },
			{ aspectRatio: 0.9485378396801197 },
			{ aspectRatio: 2.082402503272989 },
			{ aspectRatio: 0.6632252433090523 },
			{ aspectRatio: 1.2269313864337024 },
			{ aspectRatio: 1.3638050079390163 },
			{ aspectRatio: 2.2283917834546902 },
			{ aspectRatio: 2.047257867779835 },
			{ aspectRatio: 1.0734050352965245 },
			{ aspectRatio: 2.074352961337868 },
			{ aspectRatio: 1.7873129356076118 },
			{ aspectRatio: 0.9430428677741222 },
			{ aspectRatio: 1.853901351550863 },
		];
		const getItemAspectRatio = jest.fn(x => x.aspectRatio);
		const layout = getRowLayout(items, {
			getItemAspectRatio,
			width: 300,
			gapWidth: 12,
			targetHeight: 100,
			minRowItems: 1,
			maxRowItems: 4,
		});

		expect(getItemAspectRatio).toHaveBeenCalled();
		expect(layout).toMatchSnapshot();
	});
});
