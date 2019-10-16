import React from 'react';
import { Paragraph } from './Paragraph';

export const Heading = React.forwardRef(({ level = 24, children, ...props }, ref) => (
	<Paragraph as="header" ref={ref} {...props} textStyle={`h.${level}`}>
		{children}
	</Paragraph>
));
