// remove and attempt to replace style-overrides

const { getElementsWithOverrides, getPropAsObj, addTodoComments } = require('./utils');

const scale = [0, '2px', '4px', '8px', '12px', '16px', '24px', '32px', '64px', '96px'];

module.exports = function(file, api, { printOptions }) {
	const j = api.jscodeshift;
	const root = j(file.source);

	// accordion
	const accordions = getElementsWithOverrides(j, root, 'Accordion', 'styleOverrides');
	accordions.forEach(ele => {
		const styleOverrides = getPropAsObj(j, 'styleOverrides', ele);

		const oldPadding = styleOverrides.pannelPadding;
		const scaleIdx = scale.indexOf(oldPadding);
		const pannelPadding = scaleIdx !== -1 ? scaleIdx : oldPadding;

		const pannels = j(ele).find(j.JSXElement, {
			openingElement: { name: { property: { name: 'Panel' } } },
		});

		pannels.forEach(panel => {
			const openingElement = j(panel.value.openingElement);
			const paddingAttr = openingElement.find(j.JSXAttribute, {
				name: { name: 'padding' },
			});

			if (!paddingAttr.length) {
				const openingNode = openingElement.at(0).get();
				const newValue =
					typeof pannelPadding === 'string'
						? j.stringLiteral(pannelPadding)
						: j.jsxExpressionContainer(j.literal(pannelPadding));
				openingNode.value.attributes.push(j.jsxAttribute(j.jsxIdentifier('padding'), newValue));
			}
		});

		j(ele)
			.find(j.JSXAttribute, { name: { name: 'styleOverrides' } })
			.remove();
	});

	// buttons
	const buttons = getElementsWithOverrides(j, root, 'Button', 'styleOverrides');
	addTodoComments(j, buttons, 'styleOverrides');

	// datePickerInput
	const datePickerInputs = getElementsWithOverrides(j, root, 'DatePickerInput', 'styleOverrides');
	addTodoComments(j, datePickerInputs, 'styleOverrides');

	// input
	const inputs = getElementsWithOverrides(j, root, 'Input', 'styleOverrides');
	inputs.forEach(ele => {
		const styleOverrides = getPropAsObj(j, 'styleOverrides', ele);
		const openingElement = ele.value.openingElement;

		if (styleOverrides.height) {
			const newValue =
				typeof styleOverrides.height === 'string'
					? j.stringLiteral(styleOverrides.height)
					: j.jsxExpressionContainer(j.literal(styleOverrides.height));
			openingElement.attributes.push(j.jsxAttribute(j.jsxIdentifier('height'), newValue));
		}

		if (styleOverrides.width) {
			const newValue =
				typeof styleOverrides.width === 'string'
					? j.stringLiteral(styleOverrides.width)
					: j.jsxExpressionContainer(j.literal(styleOverrides.width));
			openingElement.attributes.push(j.jsxAttribute(j.jsxIdentifier('width'), newValue));
		}

		if (Object.keys(styleOverrides).filter(x => x !== 'height' && x !== 'width').length) {
			addTodoComments(j, j(ele), 'styleOverrides');
		} else {
			j(ele)
				.find(j.JSXAttribute, { name: { name: 'styleOverrides' } })
				.remove();
		}
	});

	// parameterSentence
	const paramSelect = getElementsWithOverrides(j, root, 'ParameterSelect', 'styleOverrides');
	const paramInput = getElementsWithOverrides(j, root, 'ParameterInputBox', 'styleOverrides');
	addTodoComments(j, paramSelect, 'styleOverrides');
	addTodoComments(j, paramInput, 'styleOverrides');

	// popover
	const popovers = getElementsWithOverrides(j, root, 'Popover', 'styleOverrides');
	addTodoComments(j, popovers, 'styleOverrides');

	// simpleToast
	const toast = getElementsWithOverrides(j, root, 'SimpleToast', 'styleOverrides');
	addTodoComments(j, toast, 'styleOverrides');

	//slider
	const sliders = getElementsWithOverrides(j, root, 'Slider', 'styleOverrides');
	sliders.forEach(ele => {
		const styleOverrides = getPropAsObj(j, 'styleOverrides', ele);
		const openingElement = ele.value.openingElement;

		if (styleOverrides.backgroundColor) {
			openingElement.attributes.push(
				j.jsxAttribute(
					j.jsxIdentifier('backgroundColor'),
					j.stringLiteral(styleOverrides.backgroundColor),
				),
			);
		}

		j(ele)
			.find(j.JSXAttribute, { name: { name: 'styleOverrides' } })
			.remove();
	});

	// tooltip
	const tooltips = getElementsWithOverrides(j, root, 'Tooltip', 'styleOverrides');
	addTodoComments(j, tooltips, 'styleOverrides');

	return root.toSource(printOptions);
};
