import React, { useState } from 'react';

export function SampleState({ initialState, children }) {
	const [state, setState] = useState(initialState);

	return <>{children(state, setState)}</>;
}
