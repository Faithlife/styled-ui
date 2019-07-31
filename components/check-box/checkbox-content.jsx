import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../Box';
import { SmallCheck } from '../icons';
import * as Styled from './styled';

export function CheckboxContent({ isChecked, title, children, disabled }) {
	return (
		<React.Fragment>
			<Styled.HoverableBox
				disabled={disabled}
				border="1px solid" // {1}
				borderColor={disabled ? '#c7c7c7' : '#95908f'} // gray22 : no identifier
				hoverBorderColor={disabled || '#1e91d6'} // blue4
				borderRadius="3px" // {1}
				position="absolute"
				width="14px"
				height="14px"
				background="transparent"
				backgroundColor={disabled && '#ebebeb'} // gray8
			>
				<Box
					position="absolute"
					top="0"
					left="0"
					width="14px"
					height="14px"
					css={`
						cursor: ${disabled ? 'default' : 'pointer'};
					`}
				>
					<Styled.IconBox
						as={SmallCheck}
						position="absolute"
						top="1.5px"
						left="1.5px"
						height="9.6px"
						width="9.6px"
						opacity={isChecked ? '1' : '0'}
						fill="#1e91d6" // blue4
					/>
				</Box>
			</Styled.HoverableBox>
			{title && (
				<Styled.Label marginLeft="22px" siblingMarginLeft="6px">
					{title}
				</Styled.Label>
			)}
			{children && (
				<Styled.Label marginLeft="22px" siblingMarginLeft="6px">
					{children}
				</Styled.Label>
			)}
		</React.Fragment>
	);
}

CheckboxContent.propTypes = {
	children: PropTypes.node,
	title: PropTypes.string,
	isChecked: PropTypes.bool,
	disabled: PropTypes.bool,
};
