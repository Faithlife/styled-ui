import React from 'react';
import ReactDOM from 'react-dom';
import { LocationPreprompt } from '@faithlife/location-preprompt';

const App = () => (
	<LocationPreprompt.Default
		onDeclineClick={() => alert('Declined to give location info.')}
		onAcceptClick={() => alert('Accepted giving location info.')}
	/>
);

ReactDOM.render(<App />, document.querySelector('#app'));
