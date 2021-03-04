// Remove theme prop and attempt to replace when possible

const { getElementsWithOverrides, addTodoComments, getPropAsObj } = require('./utils');

module.exports = function(file, api, options) {
	const j = api.jscodeshift;
	const root = j(file.source);

	// checkbox
	const checkboxes = getElementsWithOverrides(j, root, 'Checkbox', 'theme');
	addTodoComments(j, checkboxes, 'theme');

	// helpBox
	const helpBoxes = getElementsWithOverrides(j, root, 'HelpBox', 'theme');
	addTodoComments(j, helpBoxes, 'theme');

	// loadingSpinner
	const loadingSpinners = getElementsWithOverrides(j, root, 'LoadingSpinner', 'theme');
	addTodoComments(j, loadingSpinners, 'theme');

	// radio
	const radios = getElementsWithOverrides(j, root, 'Radio', 'theme');
	addTodoComments(j, radios, 'theme');

	// simpleToast
	const toasts = getElementsWithOverrides(j, root, 'SimpleToast', 'styleOverrides');
	toasts.forEach(ele => {
		const styleOverrides = getPropAsObj(j, 'theme', ele);
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
			.find(j.JSXAttribute, { name: { name: 'theme' } })
			.remove();
	});

	return root.toSource();
};
