/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { forwardClassRef } from '../utils';
import * as Styled from './styled';

export const Tab = forwardClassRef(
	class Tab extends PureComponent {
		static propTypes = {
			title: PropTypes.string.isRequired,
			vaultId: PropTypes.number.isRequired,
			filter: PropTypes.string,
			viewStyle: PropTypes.string,
		};

		render() {
			const vaultId = this.props.vaultId;
			const URI = `https://internal.amber.faithlife.com/embed/${vaultId}`;
			return (
				<Styled.Tab>
					{this.props.title}
					<Styled.Iframe src={URI} />
				</Styled.Tab>
			);
		}
	},
);
