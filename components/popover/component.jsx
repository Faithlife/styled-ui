import React from 'react';
import { PopoverBase } from './popover-base';

/** Pre-styled popover that uses unstyled popovers internally. */
export function Popover(props) {
	const { children, placement, ...otherProps } = props;
	return (
		<PopoverBase
			placement={placement}
			borderRadius={1}
			padding={4}
			maxWidth="300px"
			{...otherProps}
		>
			{children}
		</PopoverBase>
	);
}

Popover.propTypes = { ...PopoverBase.propTypes };

Popover.defaultProps = {
	placement: 'top',
};
