import React from 'react';
import { Box } from '../index';
import * as Icons12 from '../components/icons/12px';
import * as Icons18 from '../components/icons/18px';

export function IconGroup({ size }) {
	const icons = size === '12' ? Icons12 : Icons18;
	return (
		<Box display="flex" flexWrap="wrap">
			{Object.entries(icons).map(([name, Icon]) => (
				<IconDisplay key={name} name={name}>
					<Icon />
				</IconDisplay>
			))}
		</Box>
	);
}

function IconDisplay({ name, children }) {
	return (
		<Box display="flex" height="50px" width="250px" border={0} padding={3} alignItems="center">
			<Box width="30px" display="flex" justifyContent="flex-start" color="red">
				{children}
			</Box>
			<Box>{name}</Box>
		</Box>
	);
}
