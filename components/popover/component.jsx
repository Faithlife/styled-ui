import React from 'react';
import { PopoverBase } from './popover-base';

/** Pre-styled popover that uses unstyled popovers internally. */
export function Popover(props) {
	const {
		children,
		placement,
		borderRadius,
		padding,
		paddingY,
		paddingX,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		maxWidth,
		...otherProps
	} = props;
	return (
		<PopoverBase
			{...otherProps}
			placement={placement}
			borderRadius={borderRadius || 1}
			padding={padding || 4}
			paddingY={paddingY || padding || ''}
			paddingX={paddingX || padding || ''}
			paddingTop={paddingTop || paddingY || padding || ''}
			paddingRight={paddingRight || paddingX || padding || ''}
			paddingBottom={paddingBottom || paddingY || padding || ''}
			paddingLeft={paddingLeft || paddingX || padding || ''}
			maxWidth={maxWidth || '300px'}
		>
			{children}
		</PopoverBase>
	);
}

Popover.propTypes = { ...PopoverBase.propTypes };

Popover.defaultProps = {
	placement: 'top',
};
