import React, { useState } from 'react';
import { useCellEditor } from '../../components/grid';
import { Button } from '../../components/button';

export const IncrementButton = React.forwardRef(({ value }, ref) => {
	const [count, setCount] = useState(value);
	useCellEditor(ref, count, true);

	return (
		<Button
			variant="primaryOutline"
			size="medium"
			onClick={() => setCount(c => c + 1)}
		>{`${count} +`}</Button>
	);
});
