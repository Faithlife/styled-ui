const { program } = require('commander');
const path = require('path');
const execa = require('execa');

const transformerDirectory = path.join(__dirname, 'upgrade-transforms');
const jscodeshiftExecutable = require.resolve('.bin/jscodeshift');

process.env.NODE_ENV = 'development';

program
	.option('-X, --experimental', 'try to use the unstable transforms', false)
	.option('-t, --transform <option...>', 'which transformer to run. leave blank for all')
	.option(
		'--parser <option>',
		'babel|babylon|flow|ts|tsx the parser to use for parsing the source files',
	)
	.option('--babel', 'use babel to parse the code', false)
	.allowUnknownOption();

program.parse(process.argv);
const options = program.opts();

const args = [options.babel ? '--babel' : '--no-babel'];

if (!program.args.includes('--verbose')) {
	args.push('--verbose=2');
}

if (!program.args.includes('--ignore-pattern')) {
	args.push('--ignore-pattern=**/node_modules/**');
}

if (options.parser) {
	args.push('--parser', options.parser);
	if (!program.args.includes('--extensions')) {
		if (options.parser === 'tsx') {
			args.push('--extensions=tsx,ts,jsx,js');
		} else {
			args.push('--extensions=jsx,js');
		}
	}
}

if (options.experimental) {
	args.push('--experimental=true');
}

args.unshift(...program.args);

const transforms = [
	'v6-imports',
	'anchor-button',
	'style-overrides',
	'theme',
	'text-input',
	'button',
	'date-picker-input',
	'dropdown',
	'loading-spinner',
	'modal',
	'parameter-sentence',
	'tab',
	'popover',
];

let runList;
if (options.transform) {
	if (!options.transform.length || options.transform.some(x => !transforms.includes(x))) {
		throw new Error(
			`Unknown transformer: ${options.transform}\nTry: ${JSON.stringify(transforms)}`,
		);
	}

	runList = options.transform;
} else {
	runList = transforms;
}

for (const transform of runList) {
	runTransform(transform, args);
}

function runTransform(transformer, args) {
	const transformerPath = path.join(transformerDirectory, `${transformer}.js`);
	const codeShiftArgs = ['--transform', transformerPath].concat(args);
	console.log(`Executing command: jscodeshift ${codeShiftArgs.join(' ')}`);
	const result = execa.sync(jscodeshiftExecutable, codeShiftArgs, {
		stdio: 'inherit',
		stripEof: false,
	});

	if (result.error) {
		throw result.error;
	}
}
