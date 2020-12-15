import { textStyles } from '../../theme/textStyles';

export const textStyleOptions = Object.entries(textStyles).reduce((list, [level, sizeMap]) => {
	for (const size of Object.keys(sizeMap)) {
		list.push(`${level}.${size}`);
	}
	return list;
}, []);

export const headingLevelOptions = Object.keys(textStyles.h).map(key => Number.parseInt(key));

export const rowMasonryList = new Array(20)
	.fill(true)
	.map(x => ({ aspectRatio: (Math.random() + 0.2) * 2 }));
