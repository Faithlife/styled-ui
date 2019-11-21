import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { GroupSelector } from '@faithlife/group-selector';

export class App extends PureComponent {
	state = {
		groups: [],
		selectedGroupId: 1,
		mobile: false,
	};
	render() {
		return (
			<header>
				<GroupSelector
					onSearchInputChange={() => {
						alert('handled by application');
					}}
					onCreateGroup={() => {
						alert('handled by application');
					}}
					onSelectionChange={() => {
						alert('handled by application');
					}}
					groups={this.state.groups}
					selectedGroupId={this.state.selectedGroupId}
					groupSearchResults={this.state.groups}
					groupSelectorView={'no-groups'}
					onGetStartedClick={() => {
						alert('handled by application');
					}}
					onClaimGroupClick={() => {
						alert('handled by application');
					}}
					onJoinGroupClick={() => {
						alert('Should Join the group, or request');
					}}
					onAdminRequestClick={() => {
						alert('Admin access requested');
					}}
					isMobile={false}
				/>
			</header>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('#app'));
