import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../../components/main.ts';
import * as Styled from '../styled.jsx';

const { Input } = Bootstrap;

export class CreateGroup extends React.Component {
	static propTypes = {
		onChurchNameInputChange: PropTypes.func.isRequired,
		newChurchName: PropTypes.string,
		onChurchLocationInputChange: PropTypes.func.isRequired,
		newChurchLocation: PropTypes.string,
		showRequiredStars: PropTypes.bool,
	};

	churchNameInput = React.createRef();

	componentDidMount() {
		this.churchNameInput.current.focus();
	}

	render() {
		return (
			<Styled.CreateGroup>
				<Styled.CreateGroupLabel>
					Church Name{this.props.showRequiredStars && (
						<Styled.CreateGroupRequiredStar>*</Styled.CreateGroupRequiredStar>
					)}
				</Styled.CreateGroupLabel>
				<Input
					innerRef={this.churchNameInput}
					value={this.props.newChurchName}
					onChange={this.props.onChurchNameInputChange}
					placeholder="Church name"
					bsSize="lg"
				/>
				<Styled.CreateGroupLabel>
					Church Location{this.props.showRequiredStars && (
						<Styled.CreateGroupRequiredStar>*</Styled.CreateGroupRequiredStar>
					)}
				</Styled.CreateGroupLabel>
				<Input
					value={this.props.newChurchLocation}
					placeholder="City, State"
					onChange={this.props.onChurchLocationInputChange}
					bsSize="lg"
				/>
			</Styled.CreateGroup>
		);
	}
}
