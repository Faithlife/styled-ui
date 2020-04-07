import React from 'react';
import ReactQuill from 'react-quill';

const PlaceholderDiv = ({ children, ...props }) => (
	<div {...props} className={'quill ' + props.className}>
		{children}
	</div>
);

export const SafeQuill = ReactQuill && (ReactQuill as any).Quill;
export const SafeReactQuill = SafeQuill ? ReactQuill : PlaceholderDiv;
