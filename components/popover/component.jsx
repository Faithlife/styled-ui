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
			padding={isDefined(padding) ? padding : 4}
			paddingY={isDefined(paddingY) ? paddingY : isDefined(padding) ? padding : ''}
			paddingX={isDefined(paddingX) ? paddingX : isDefined(padding) ? padding : ''}
			paddingTop={
				isDefined(paddingTop)
					? paddingTop
					: isDefined(paddingY)
					? paddingY
					: isDefined(padding)
					? padding
					: ''
			}
			paddingRight={
				isDefined(paddingRight)
					? paddingRight
					: isDefined(paddingX)
					? paddingX
					: isDefined(padding)
					? padding
					: ''
			}
			paddingBottom={
				isDefined(paddingBottom)
					? paddingBottom
					: isDefined(paddingY)
					? paddingY
					: isDefined(padding)
					? padding
					: ''
			}
			paddingLeft={
				isDefined(paddingLeft)
					? paddingLeft
					: isDefined(paddingX)
					? paddingX
					: isDefined(padding)
					? padding
					: ''
			}
			maxWidth={isDefined(maxWidth) ? maxWidth : '300px'}
		>
			{children}
		</PopoverBase>
	);
}

Popover.propTypes = { ...PopoverBase.propTypes };

Popover.defaultProps = {
	placement: 'top',
};

const isDefined = function(value) {
	return value !== undefined && value !== null;
};
