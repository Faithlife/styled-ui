import React from 'react';
import ReactQuill from 'react-quill';

const UnstyledDiv = ({ children, ...props }) => <div {...props}>{children}</div>;
export const SafeQuill = ReactQuill && (ReactQuill as any).Quill;
export const SafeReactQuill = SafeQuill ? ReactQuill : UnstyledDiv;
