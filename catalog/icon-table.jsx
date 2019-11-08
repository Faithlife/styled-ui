import React from 'react';
import { Box } from '../index';
import * as icons from '../components/icons';

export function IconTable() {
	return (
		<Box display="flex" flexWrap="wrap">
			{Object.entries(icons).map(([name, Icon]) => (
				<Box
					key={name}
					display="flex"
					height="50px"
					width="200px"
					border={1}
					padding={3}
					alignItems="center"
				>
					<Box width="150px">{name}</Box>
					<Box width="50px" display="flex" justifyContent="flex-end">
						<Icon />
					</Box>
				</Box>
			))}
		</Box>
	);
}
