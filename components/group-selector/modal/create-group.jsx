import React from 'react';
import PropTypes from 'prop-types';
import { Bootstrap } from '../../../components/main.js';
import * as Styled from '../styled.jsx';

const { Button, Input } = Bootstrap;

export class CreateGroup extends React.Component {
	static propTypes = {
		onCreateGroup: PropTypes.func.isRequired,
		onChurchNameInputChange: PropTypes.func.isRequired,
		newChurchName: PropTypes.string,
		onChurchLocationInputChange: PropTypes.func.isRequired,
		newChurchLocation: PropTypes.string,
		showButton: PropTypes.bool.isRequired,
	};

	render() {
		return (
			<Styled.CreateGroup>
				<Styled.CreateGroupLabel>Church Name</Styled.CreateGroupLabel>
				<Input
					style={{ marginBottom: '20px', marginTop: '4px' }}
					onChange={this.props.onChurchNameInputChange}
					placeholder="Church name"
					bsSize="lg"
				/>
				<div>
					<Styled.CreateGroupLabel>Church Location</Styled.CreateGroupLabel>
					<Input
						style={{ marginTop: '4px' }}
						value={this.props.newChurchLocation}
						placeholder="City, State"
						onChange={this.props.onChurchLocationInputChange}
						bsSize="lg"
					/>
					{this.props.showButton && (
						<Styled.CreateGroupButtonWrapper>
							<Styled.CreateGroupButtonText>Don't see your church?</Styled.CreateGroupButtonText>
							<Button
								color="primary"
								disabled={this.props.newChurchName === '' || this.props.newChurchLocation === ''}
								onClick={this.props.onCreateGroup}
							>
								Create
							</Button>
						</Styled.CreateGroupButtonWrapper>
					)}
				</div>
			</Styled.CreateGroup>
		);
	}
}
