import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './check-box/story.jsx';
import DemoInput from './demo-input/story.jsx';
import demoInputTheme from './demo-input/alternate-theme.less';
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

storiesOf('Input', module)
	.add('with no validation', () => <DemoInput />)
	.add('with instant validation', () => <DemoInput demoValidation />)
	.add('with delayed validation', () => <DemoInput demoValidation validationDelay={100} />)
	.add('with alternate theme', () => <DemoInput demoValidation theme={demoInputTheme} />);
