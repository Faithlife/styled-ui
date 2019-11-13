module.exports = {
	processors: ['stylelint-processor-styled-components'],
	extends: ['stylelint-config-styled-components'],
	rules: {
		'block-closing-brace-empty-line-before': 'never',
		'block-closing-brace-newline-after': 'always',
		'block-closing-brace-newline-before': 'always-multi-line',
		'block-closing-brace-space-before': 'always-single-line',
		'block-no-empty': true,
		'block-opening-brace-newline-after': 'always-multi-line',
		'block-opening-brace-space-after': 'always-single-line',
		'block-opening-brace-space-before': 'always',
		'color-no-invalid-hex': true,
		'comment-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['stylelint-commands'],
			},
		],
		'declaration-block-trailing-semicolon': 'always',
		'declaration-colon-space-after': 'always-single-line',
		'declaration-colon-space-before': 'never',
		'max-empty-lines': 1,
		'no-duplicate-selectors': true,
		'no-eol-whitespace': true,
		'no-extra-semicolons': true,
		'no-missing-end-of-source-newline': true,
		'property-no-vendor-prefix': true,
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['appearance', 'composes', 'compose-with'],
			},
		],
		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested'],
				ignore: ['after-comment'],
			},
		],
		'unit-whitelist': ['em', 'rem', '%', 's', 'px', 'deg', 'ms', 'vh', 'vw', 'fr'],
		'value-no-vendor-prefix': true,
	},
};
