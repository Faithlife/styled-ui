import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from '../components/check-box/container.jsx';
import checkboxTheme from '../components/check-box/secondary-theme.less';
import DemoInput from '../components/demo-input/container.jsx';
import demoInputTheme from '../components/demo-input/secondary-theme.less';
import DemoButton from './button/container.jsx';
import demoButtonTheme from './button/alternate-theme.less';

storiesOf('Button', module)
	.add('with text', () => <DemoButton onClick={action('clicked')}>Toggle shadow</DemoButton>)
	.add('with alternate theme', () => (
		<DemoButton onClick={action('clicked')} theme={demoButtonTheme}>
			Toggle shadow
		</DemoButton>
	))
	.add('with some emoji', () => (
		<DemoButton onClick={action('clicked')}>
			<span role="img" aria-label="so cool">
				😀 😎 👍 💯
			</span>
		</DemoButton>
	));

storiesOf('Checkbox', module)
	.add('with text', () => <Checkbox />)
	.add('with alternate theme', () => <Checkbox theme={checkboxTheme} />);

storiesOf('Input', module)
	.add('with instant validation', () => <DemoInput />)
	.add('with delayed validation', () => <DemoInput validationDelay={100} />)
	.add('with alternate theme', () => <DemoInput theme={demoInputTheme} />);
