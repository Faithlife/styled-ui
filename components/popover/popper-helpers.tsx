import React, { SFC, MouseEvent } from 'react';
import { Manager, Reference } from 'react-popper';
import * as Styled from './styled';

type referenceProps = {
	onClick: ((event: MouseEvent) => void);
	onMouseEnter: ((event: MouseEvent) => void);
	onMouseLeave: ((event: MouseEvent) => void);
};

type Props = Partial<referenceProps>;

/** Popover reference container from react-popper */
export const PopoverReference: SFC<Props> = ({ children, ...referenceProps }) => (
	<Reference>
		{({ ref }) => (
			<Styled.ReferenceContainer {...referenceProps} ref={ref}>
				{children}
			</Styled.ReferenceContainer>
		)}
	</Reference>
);

/** Popover manager from react-popper */
export const PopoverManager = Manager;
export const PlainPopoverReference = Reference;
