import React from 'react';
import PropTypes from 'prop-types';
import * as _TextInput from './text-input';

const OurButton = props => <button>{props.children}</button>;

OurButton.propTypes = {
	children: PropTypes.node,
};

export { default as Checkbox } from './check-box/component.jsx';
// export { default as Button } from './demo-button/component.jsx';
export const TextInput = _TextInput;
export const Button = OurButton;
