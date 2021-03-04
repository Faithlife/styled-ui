// update DatePickerInput to v6

const { getElementsWithOverrides } = require('./utils');

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	const inputs = getElementsWithOverrides(j, root, 'DatePickerInput', 'placement');

	inputs.forEach(ele => {
		const placementAttr = j(ele.value.openingElement)
			.find(j.JSXAttribute, { name: { name: 'placement' } })
			.at(0)
			.get().value.value;
		const placement =
			placementAttr.type === 'JSXExpressionContainer'
				? placementAttr.expression.value
				: placementAttr.value;

		if (ele.value.openingElement.selfClosing) {
			j(ele).replaceWith(
				j.jsxElement(
					j.jsxOpeningElement(
						j.jsxIdentifier('DatePickerInput'),
						ele.value.openingElement.attributes,
					),
					j.jsxClosingElement(j.jsxIdentifier('DatePickerInput')),
					ele.value.children,
				),
			);
		}

		const popoverConfig = j(ele).find(j.JSXElement, {
			openingElement: { name: { property: { name: 'Popover' } } },
		});

		const newPlacementAttr = j.jsxAttribute(
			j.jsxIdentifier('placement'),
			j.stringLiteral(placement),
		);

		if (!popoverConfig.length) {
			const hold = j.jsxElement(
				j.jsxOpeningElement(
					j.jsxMemberExpression(j.jsxIdentifier('DatePickerInput'), j.jsxIdentifier('Popover')),
					[newPlacementAttr],
					true,
				),
			);
			ele.value.children.push(hold);
		} else {
			const config = popoverConfig.at(0).get();
			const configPlacement = j(config).find(j.JSXAttribute, { name: { name: 'placement' } });
			if (!configPlacement.length) {
				config.value.openingElement.attributes.push(newPlacementAttr);
			}
		}

		j(ele.value.openingElement)
			.find(j.JSXAttribute, { name: { name: 'placement' } })
			.remove();
	});

	return root.toSource();
};
