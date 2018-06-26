```hint
Experimental warning: The styled inputs below are based off of Faithlife Sites and may not be consistent with the new styled controls, prefer to use Bootstrap components where possible.
```

### Validated input

A standard text input control with local validation. \`TextInput.Input\` is used as a render prop so that additional input properties can be set, such as \`placeholder\`.

```react
showSource: true
state: { isValid: false, value: '' }
---
<div className="container">
	<style>
	{`
		.container {
			font-family: 'Source Sans Pro';
			color: #333333;
		}
		.inputWrapper {
			max-width: 300px;
		}
		.container > * {
			margin: 8px;
		}
	`}
	</style>
	<div className="inputWrapper">
		<ValidatedInput
			value={state.value}
			onValidationChange={newState => {
				if (newState.isValid != null) {
					setState({ isValid: newState.isValid });
				}
				if (newState.inputValue != null) {
					setState({ validatedValue: newState.inputValue });
				}
			}}
			getIsValidInput={value => ({
				isValid: value !== 'error',
				validationErrorString: 'This is a custom error message',
			})}
			debounce={200}
			placeholder="Bellingham"
			title="Location"
			help={<span>Try typing 'error'</span>}
		/>
	</div>
	<Button primary medium disabled={!state.isValid}>
		Save
	</Button>
</div>
```

### No validation

```react
showSource: true
state: { isValid: false, value: '' }
---
<div className="container">
	<style>
	{`
		.container {
			font-family: 'Source Sans Pro';
			color: #333333;
		}
		.inputWrapper {
			max-width: 300px;
		}
		.container > * {
			margin: 8px;
		}
	`}
	</style>
	<div className="inputWrapper">
		<Input
			value={state.value}
			onChange={value => setState({ value: value, isValid: value !== '' })}
			placeholder="Bellingham"
			title="Location"
			debounce={200}
		/>
	</div>
	<Button primary medium disabled={!state.isValid}>
		Save
	</Button>
</div>
```

### Remote API Validation

Simulates making a network call to validate the field, using a Promise which takes 500 ms to resolve.

```react
showSource: true
state: { isValid: false, value: '' }
---
<div className="container">
	<style>
	{`
		.container {
			font-family: 'Source Sans Pro';
			color: #333333;
		}
		.inputWrapper {
			max-width: 300px;
		}
		.container > * {
			margin: 8px;
		}
	`}
	</style>
	<div className="inputWrapper">
		<ValidatedInput
			value={state.value}
			onValidationChange={newState => {
				if (newState.isValid != null) {
					setState({ isValid: newState.isValid });
				}
				if (newState.inputValue != null) {
					setState({ value: newState.inputValue });
				}
			}}
			getIsValidInput={value =>
				delayPromise(500).then(() =>
					Promise.resolve({
						isValid: value !== 'error',
						validationErrorString: 'This is a custom error message',
					}),
				)
			}
			debounce={200}
			placeholder="Bellingham"
			title="Location"
			help={<span>Try typing 'error'</span>}
		/>
	</div>
	<Button primary medium disabled={!state.isValid}>
		Save
	</Button>
</div>
```

API calls can sometimes fail. When this happens, the control will show a generic error message.

```react
showSource: true
state: { isValid: false, value: '' }
---
<div className="container">
	<style>
	{`
		.container {
			font-family: 'Source Sans Pro';
			color: #333333;
		}
		.inputWrapper {
			max-width: 300px;
		}
		.container > * {
			margin: 8px;
		}
	`}
	</style>
	<div className="inputWrapper">
		<ValidatedInput
			value={state.value}
			onValidationChange={newState => {
				if (newState.isValid != null) {
					setState({ isValid: newState.isValid });
				}
				if (newState.inputValue != null) {
					setState({ value: newState.inputValue });
				}
			}}
			getIsValidInput={value =>
				delayPromise(500).then(() =>
					Promise.reject()
				)
			}
			debounce={200}
			placeholder="Bellingham"
			title="Location"
			help={<span>Try typing 'error'</span>}
		/>
	</div>
	<Button primary medium disabled={!state.isValid}>
		Save
	</Button>
</div>
```

