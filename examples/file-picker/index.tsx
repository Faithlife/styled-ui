import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import { Box } from '@faithlife/styled-ui';
import { FilePicker } from '@faithlife/file-picker';

const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggleIsOpen = useCallback(() => {
		setIsOpen(previousState => !previousState);
	}, []);

	return (
		<Box
			display="grid"
			top={0}
			left={0}
			right={0}
			minHeight="50vh"
			position="absolute"
			alignItems="center"
			justifyContent="center"
		>
			<Box
				onClick={toggleIsOpen}
				width={300}
				height={200}
				border="2px dashed"
				borderColor="blue4"
				display="grid"
				alignItems="center"
				justifyContent="center"
				color="blue4"
				fontWeight="bold"
			>
				+ Add photo
			</Box>
			<FilePicker isOpen={isOpen} onClose={toggleIsOpen} title="File Picker">
				<FilePicker.Tab title="one" padding={4}>
					Heyo
				</FilePicker.Tab>
				<FilePicker.Tab title="two">Hi there!</FilePicker.Tab>
				<FilePicker.Tab title="three">Привет!</FilePicker.Tab>
			</FilePicker>
		</Box>
	);
};

ReactDOM.render(<App />, document.querySelector('#app'));
