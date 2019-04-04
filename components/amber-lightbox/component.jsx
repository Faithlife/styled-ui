/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tab } from './tab';
import * as Styled from './styled';

export class AmberLightbox extends PureComponent {
	static propTypes = {
		/* tabs: PropTypes.arrayOf(
			PropTypes.shape({
				onFileSelected: PropTypes.func.isRequired,
				title: PropTypes.string.isRequired,
				vaultId: PropTypes.number.isRequired,
				filter: PropTypes.string,
				viewStyle: PropTypes.string,
			}),
		),*/
		// fileTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
		allowMultiSelect: PropTypes.bool,
		hideNativeTab: PropTypes.bool,
		localizationProps: PropTypes.shape({
			addText: PropTypes.string,
			cancelText: PropTypes.string,
		}),
	};

	render() {
		const addText = this.props.localizationProps.addText
			? this.props.localizationProps.addText
			: 'Add';
		const cancelText = this.props.localizationProps.cancelText
			? this.props.localizationProps.cancelText
			: 'Cancel';
		return (
			<Styled.Container>
				<Styled.Title>Add File</Styled.Title>
				<Tab
					// onFileSelected
					title={'my vault'}
					vaultId={7390930}
					filter={'kind: photo'}
					viewStyle={'embeded'}
				/>
				<button>{addText}</button>
				<button>{cancelText}</button>
			</Styled.Container>
		);
	}
}

// mime types
// view but not upload
// standard term for localization
