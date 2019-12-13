import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BrandBar } from '@faithlife/brand-bar';
import '@faithlife/brand-bar/dist/brand-bar.css';
import localizedResources from '@faithlife/brand-bar/dist/locales/en-US/resources.json';
import { ProductDrawer } from '@faithlife/product-drawer';

const ProductDrawerContainer = styled.div`
	margin: 10px 32px;
`;

const App = () => (
	<BrandBar userName="John Doe" avatarUrl="" localizedResources={localizedResources}>
		<ProductDrawerContainer>
			<ProductDrawer />
		</ProductDrawerContainer>
	</BrandBar>
);

ReactDOM.render(<App />, document.querySelector('#app'));
