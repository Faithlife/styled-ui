import React from 'react';
import { ProductDrawer } from '../../components/product-drawer';
import resources from './resources.json';

export const ProductDrawerWithResources = props => (
	<ProductDrawer {...props} resources={{ ...resources, ...props.localizedResources }} />
);
