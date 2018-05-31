import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './check-box/story.jsx';
import TextInput from './text-input/story.jsx';
import DemoButton from './demo-button/story.jsx';
import OkCancelStory from './demo-button/ok-cancel.jsx';

storiesOf('Button', module)
	.add('with text', () => <DemoButton onClick={action('clicked')} />)
	.add('with alternate theme', () => (
		<DemoButton
			onClick={action('clicked')}
			theme={{
				default: '#D94848',
				hover: '#EE7878',
				active: '#BD2929',
				disabled: '#aaa',
			}}
		/>
	))
	.add('ok cancel', () => <OkCancelStory />);

storiesOf('Checkbox', module)
	.add('with text', () => <Checkbox />)
	.add('with alternate theme', () => (
		<Checkbox theme={{ primary: 'plum', border: 'rebeccapurple' }} />
	));

storiesOf('Text input', module)
	.add('with debounced validation', () => <TextInput demoValidation validationDelay={200} />)
	.add('with no validation', () => <TextInput />)
	.add('with offline network', () => (
		<TextInput demoValidation demoFailedApiValidation validationDelay={200} />
	))
	.add('with slow API validation', () => (
		<TextInput demoValidation demoSlowNetwork validationDelay={200} />
	))
	.add('with alternate theme', () => (
		<TextInput demoValidation theme={{ background: '#393939', text: 'white' }} />
	));
