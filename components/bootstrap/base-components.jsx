import * as _Bootstrap from 'reactstrap';
import { wrapBootstrap } from './util';

const inlineComponents = ['Button'];

export default Object.keys(_Bootstrap).reduce(
	(prev, curr) => ({
		...prev,
		[curr]: wrapBootstrap(_Bootstrap[curr], inlineComponents.includes(curr)),
	}),
	{},
);
