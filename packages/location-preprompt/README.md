# LocationPreprompt

This component provides a pre-prompt that can be shown to users before asking for location permissions.
This allows users to feel more at ease with providing their location details.

- [Getting Started](#getting-started)
- [Exports](#exports)

## Getting started

1. Import the component

```jsx
import { LocationPreprompt } from '@faithlife/file-picker';
```

2. Use the component

```jsx
// Use a prepackaged modal.
const MyComponent = props => {
	...
	return (
		<LocationPreprompt.Default
			isSmallViewport={props.isSmallViewport}
			onAcceptClick={() => alert('User agreed to share location information.')}
			onDeclineClick={() => alert("User declined to share location information")}>
	);
}

// Build your own.
const MyComponent = props => {
	...
	return (
		<LocationPreprompt>
			<LocationPreprompt.CenterBox height="100%">
				<LocationPreprompt.Pin />
				<LocationPreprompt.Title>{'We need location information.'}</Title>
				<LocationPreprompt.Text>
					{'This feature requires your current location to process the foobar.'}
				</LocationPreprompt.Text>
				<LocationPreprompt.Text>
					{'Location information is not saved or shared. Click OK to accept.'}
				</LocationPreprompt.Text>
				<LocationPreprompt.Footer
					acceptButtonText={"OK"}
					declineButtonText={"NEVER!"}
					onAcceptClick={onAcceptClick}
					onDeclineClick={onDeclineClick}
				/>
			</LocationPreprompt.CenterBox>
		</LocationPreprompt>
	);
}
```

## Exports

```js
import { LocationPreprompt } from '@faithlife/location-preprompt';
const { CenterBox, Pin, Title, Text, Footer, Default } = LocationPreprompt;
```
