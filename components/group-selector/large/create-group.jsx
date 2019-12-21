import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from '../styled';
import { Input } from '../../input';

export class CreateGroup extends React.Component {
	static propTypes = {
		showInPlace: PropTypes.bool,
		onChurchNameInputChange: PropTypes.func.isRequired,
		newChurchName: PropTypes.string,
		onChurchLocationInputChange: PropTypes.func.isRequired,
		newChurchLocation: PropTypes.string,
		showRequiredStars: PropTypes.bool,
		localizedResources: PropTypes.object,
	};

	churchNameInput = React.createRef();

	componentDidMount() {
		if (!this.props.showInPlace) {
			this.churchNameInput.current.focus();
		}
	}

	render() {
		const {
			showRequiredStars,
			newChurchName,
			newChurchLocation,
			onChurchNameInputChange,
			onChurchLocationInputChange,
			localizedResources,
		} = this.props;
		return (
			<Styled.CreateGroup>
				<Styled.CreateGroupLabel>
					{localizedResources.churchNameText}
					{showRequiredStars && <Styled.CreateGroupRequiredStar>*</Styled.CreateGroupRequiredStar>}
				</Styled.CreateGroupLabel>
				<Styled.InputWrapper>
					<Input
						ref={this.churchNameInput}
						value={newChurchName}
						onChange={onChurchNameInputChange}
						placeholder={localizedResources.churchNameText}
						small
					/>
				</Styled.InputWrapper>
				<Styled.CreateGroupLabel>
					{localizedResources.churchLocationText}
					{showRequiredStars && <Styled.CreateGroupRequiredStar>*</Styled.CreateGroupRequiredStar>}
				</Styled.CreateGroupLabel>
				<Styled.InputWrapper>
					<Input
						value={newChurchLocation}
						placeholder={localizedResources.churchLocationPlaceholder}
						onChange={onChurchLocationInputChange}
						small
					/>
				</Styled.InputWrapper>
			</Styled.CreateGroup>
		);
	}
}
