import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { system } from 'styled-system';
import { Box } from '../Box';
import { Text } from '../Text';
import { SmallCheck } from '../icons';

export function CheckboxContent({ isChecked, children, disabled, hoverBorderColor, ...props }) {
	return (
		<React.Fragment>
			<HoverableBox
				disabled={disabled}
				border={1}
				borderColor={disabled ? 'gray22' : '#95908f'}
				hoverBorderColor={hoverBorderColor || (disabled || 'blue4')}
				borderRadius={1}
				position="absolute"
				width="14px"
				height="14px"
				background="transparent"
				backgroundColor={disabled && 'gray8'}
				{...props}
			>
				<Box position="absolute" top="0" left="0" width="14px" height="14px">
					<IconBox
						as={SmallCheck}
						position="absolute"
						top="1.5px"
						left="1.5px"
						height="9.6px"
						width="9.6px"
						opacity={isChecked ? '1' : '0'}
						fill={hoverBorderColor || 'blue4'}
					/>
				</Box>
			</HoverableBox>
			{children && (
				<Label marginLeft="22px" siblingMarginLeft="6px" textStyle="c.14">
					{children}
				</Label>
			)}
		</React.Fragment>
	);
}

CheckboxContent.propTypes = {
	children: PropTypes.node,
	isChecked: PropTypes.bool,
	disabled: PropTypes.bool,
};

const hoverBorderColor = system({ hoverBorderColor: { property: 'borderColor', scale: 'colors' } });
const HoverableBox = styled(Box)`
	@media (hover: hover) {
		&:hover {
			${hoverBorderColor};
		}
	}
	@media (hover: none) {
		&:active {
			${hoverBorderColor};
		}
	}
`;

const IconBox = styled(Box)`
	path {
		${system({ fill: { property: 'fill', scale: 'colors' } })};
	}
`;

const Label = styled(Text)`
	& + & {
		${system({ siblingMarginLeft: { property: 'margin-left', scale: 'space' } })};
	}
`;
