import bootstrapComponents from './base-components.jsx';
import InferredText from './inferred-text.jsx';
import Typeahead from './typeahead.jsx';
import InferredTypeahead from './inferred-typeahead.jsx';

import './custom.scss';

export default {
	...bootstrapComponents,
	Typeahead,
	InferredTypeahead,
	InferredText,
};
