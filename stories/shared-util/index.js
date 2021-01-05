import { styledSystemProps, boxStyleProps, buttonStyleProps } from './styled-systems-props';

const category = 'Styled-Systems';
function getStyledSystemArgTypes(systemsList) {
	return systemsList.reduce(
		(map, propList) =>
			propList.props.reduce((map, prop) => {
				if (!Array.isArray(prop) || !prop[1]) {
					map[prop] = {
						control: { type: 'text' },
						table: { category, subcategory: propList.name },
					};
				} else {
					map[prop[0]] = Array.isArray(prop[1])
						? {
								control: {
									type: 'number',
									min: 0,
									max: prop[1].length - 1,
									step: 1,
									defaultValue: 0,
								},
								table: {
									category,
									subcategory: propList.name,
								},
						  }
						: {
								control: { type: 'select', options: Object.keys(prop[1]) },
								table: { category, subcategory: propList.name },
						  };
				}
				return map;
			}, map),
		{},
	);
}

const resetArgTypes = {
	...Object.values(styledSystemProps).reduce(
		(map, propList) =>
			propList.props.reduce((map, prop) => {
				map[[prop].flat()[0]] = { table: { disable: true } };
				return map;
			}, map),
		{},
	),
	variant: {
		table: {
			disable: true,
		},
	},
	size: {
		table: {
			disable: true,
		},
	},
};

export {
	styledSystemProps,
	boxStyleProps,
	resetArgTypes,
	getStyledSystemArgTypes,
	buttonStyleProps,
};
export * from './components';
