import React from 'react';
import PropTypes from 'prop-types';
import { DefaultThemeProvider } from '@faithlife/styled-ui';
import styled, { css } from 'styled-components';
import LocationPinSvg from '../icons/location-pin.svg';

const Container = styled.div`
	margin-top: ${props => props.marginTop};
	margin-bottom: ${props => props.marginBottom};

	${({ theme }) => css`
		svg path {
			fill: ${theme.colors.green4};
		}
	`}
`;

LocationPin.propTypes = { marginBottom: PropTypes.string, marginTop: PropTypes.string };
export function LocationPin({ marginBottom, marginTop }) {
	return (
		<DefaultThemeProvider>
			<Container marginBottom={marginBottom} marginTop={marginTop}>
				<LocationPinSvg />
			</Container>
		</DefaultThemeProvider>
	);
}
