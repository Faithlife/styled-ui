import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from '../styled';
import { Input } from '../../input';

export class CreateGroup extends React.Component {
	static propTypes = {
		onChurchNameInputChange: PropTypes.func.isRequired,
		newChurchName: PropTypes.string,
		onChurchLocationInputChange: PropTypes.func.isRequired,
		newChurchLocation: PropTypes.string,
		showRequiredStars: PropTypes.bool,
		resources: PropTypes.object,
	};

	churchNameInput = React.createRef();

	componentDidMount() {
		this.churchNameInput.current.focus();
	}

	render() {
		const {
			showRequiredStars,
			newChurchName,
			newChurchLocation,
			onChurchNameInputChange,
			onChurchLocationInputChange,
			resources,
		} = this.props;
		return (
			<Styled.CreateGroup>
				<Styled.CreateGroupLabel>
					{resources.churchNameText}
					{showRequiredStars && <Styled.CreateGroupRequiredStar>*</Styled.CreateGroupRequiredStar>}
				</Styled.CreateGroupLabel>
				<Styled.InputWrapper>
					<Input
						ref={this.churchNameInput}
						value={newChurchName}
						onChange={onChurchNameInputChange}
						placeholder={resources.churchNameText}
						small
					/>
				</Styled.InputWrapper>
				<Styled.CreateGroupLabel>
					{resources.churchLocationText}
					{showRequiredStars && <Styled.CreateGroupRequiredStar>*</Styled.CreateGroupRequiredStar>}
				</Styled.CreateGroupLabel>
				<Styled.InputWrapper>
					<Input
						value={newChurchLocation}
						placeholder={resources.churchLocationPlaceholder}
						onChange={onChurchLocationInputChange}
						small
					/>
				</Styled.InputWrapper>
			</Styled.CreateGroup>
		);
	}
}
