import React from 'react';
import { Box, Heading } from '../index';
import * as icons from '../components/icons/svgs/icons';
import * as smallIcons from '../components/icons/svgs/small-icons';

export function IconTable() {
	return (
		<Box>
			<Heading level={22}>18px Icons</Heading>
			<Box display="flex" flexWrap="wrap">
				{Object.entries(icons).map(([name, Icon]) => (
					<IconDisplay key={name} name={name}>
						<Icon />
					</IconDisplay>
				))}
			</Box>
			<Heading marginTop={4} level={22}>
				12px Icons
			</Heading>
			<Box display="flex" flexWrap="wrap">
				{Object.entries(smallIcons).map(([name, Icon]) => (
					<IconDisplay key={name} name={name}>
						<Icon />
					</IconDisplay>
				))}
			</Box>
		</Box>
	);
}

function IconDisplay({ name, children }) {
	return (
		<Box display="flex" height="50px" width="200px" border={0} padding={3} alignItems="center">
			<Box width="30px" display="flex" justifyContent="flex-start">
				{children}
			</Box>
			<Box width="150px">{name}</Box>
		</Box>
	);
}
