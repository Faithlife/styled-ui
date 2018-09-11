import React from 'react';

export const Check = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
		<path
			fill="none"
			fillRule="evenodd"
			stroke="#62BB46"
			strokeWidth="2.2"
			d="M3.57 8.51l4.453 4.428L15.962 5"
		/>
	</svg>
);

export const Exclamation = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
		<path
			fill="#D94848"
			fillRule="nonzero"
			d="M9 2C5.15 2 2 5.15 2 9s3.15 7 7 7 7-3.15 7-7-3.15-7-7-7zm0 12.25c-2.888 0-5.25-2.363-5.25-5.25 0-2.888 2.362-5.25 5.25-5.25 2.887 0 5.25 2.362 5.25 5.25 0 2.887-2.363 5.25-5.25 5.25zM8.125 5.5v4.375h1.75V5.5h-1.75zm.875 7a.875.875 0 1 0 0-1.75.875.875 0 0 0 0 1.75z"
		/>
	</svg>
);

export const Close = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#979797"
				fillRule="nonzero"
				d="M9,7.58578644 L13.2928932,3.29289322 L14.7071068,4.70710678 L10.4142136,9 L14.7071068,13.2928932 L13.2928932,14.7071068 L9,10.4142136 L4.70710678,14.7071068 L3.29289322,13.2928932 L7.58578644,9 L3.29289322,4.70710678 L4.70710678,3.29289322 L9,7.58578644 Z"
			/>
			<g>
				<mask id="x-b" fill="#A8A8A8">
					<path d="M9,7.58578644 L13.2928932,3.29289322 L14.7071068,4.70710678 L10.4142136,9 L14.7071068,13.2928932 L13.2928932,14.7071068 L9,10.4142136 L4.70710678,14.7071068 L3.29289322,13.2928932 L7.58578644,9 L3.29289322,4.70710678 L4.70710678,3.29289322 L9,7.58578644 Z" />
				</mask>
				<rect width="18" height="18" />
			</g>
		</g>
	</svg>
);

export const LightBulbL = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M7 13h3v-1.292l.444-.297a3.5 3.5 0 1 0-3.887 0l.443.297V13zm4 1H6v-1.758a4.5 4.5 0 1 1 5 0V14z"
			/>
			<path fill="#1E91D6" d="M6.5 15h4v1h-4z" />
		</g>
	</svg>
);

export const LightBulbM = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M10 13v-1.292l.444-.297a3.5 3.5 0 1 0-3.887 0l.443.297V13h3zm1 1H6v-1.758a4.5 4.5 0 1 1 5 0V14zm-4.5 1h4v1h-4v-1z"
			/>
			<path
				fill="#79CAFB"
				d="M8 1h1v1H8V1zm5 2h1v1h-1V3zM3 3h1v1H3V3zm12 5h1v1h-1V8zM1 8h1v1H1V8z"
			/>
		</g>
	</svg>
);
export const LightBulbH = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M10 13v-1.292l.444-.297a3.5 3.5 0 1 0-3.887 0l.443.297V13h3zm1 1H6v-1.758a4.5 4.5 0 1 1 5 0V14zm-4.5 1h4v1h-4v-1z"
			/>
			<path
				fill="#79CAFB"
				d="M8 0h1v3H8V0zm6 8h3v1h-3V8zM0 8h3v1H0V8zm13.354-3.646l-.708-.708 2.291-2.29.708.707-2.291 2.29zm-9.708 0l-2.29-2.291.707-.708 2.29 2.291-.707.708z"
			/>
		</g>
	</svg>
);

export const OKCircle = props => (
	<svg {...props} xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18">
		<g fill="none" fillRule="evenodd">
			<path
				fill="#0174B9"
				fillRule="nonzero"
				d="M8.5 16a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm0 1a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17z"
			/>
			<path
				fill="#1E91D6"
				d="M5.59 12.108c-.383 0-.734-.07-1.052-.212a2.278 2.278 0 0 1-.818-.612 2.867 2.867 0 0 1-.531-.967A4.063 4.063 0 0 1 3 9.03c0-.474.063-.898.189-1.273.126-.376.303-.692.53-.95.228-.258.501-.456.819-.594a2.614 2.614 0 0 1 1.052-.207c.384 0 .735.069 1.053.207.317.138.592.336.823.594.23.258.409.574.535.95.126.375.189.799.189 1.273 0 .48-.063.909-.19 1.287-.125.378-.303.7-.534.967a2.32 2.32 0 0 1-.823.612 2.566 2.566 0 0 1-1.053.212zm0-.909c.234 0 .444-.051.63-.153.186-.102.345-.247.477-.436.132-.19.233-.417.305-.684.072-.268.108-.566.108-.896 0-.66-.136-1.177-.409-1.552a1.302 1.302 0 0 0-1.11-.563c-.468 0-.839.187-1.111.563-.273.375-.41.892-.41 1.552 0 .33.036.628.108.896.072.267.174.494.306.684.132.189.29.334.477.436.186.102.395.153.63.153zm3.778-5.085h1.043v2.673h.027l2.096-2.673h1.16l-1.808 2.295L14 12h-1.151l-1.592-2.772-.846 1.053V12H9.368V6.114z"
			/>
		</g>
	</svg>
);

export const KebabVertical = props => (
	<svg {...props} viewBox="0 0 62 62" xmlns="http://www.w3.org/2000/svg">
		<path
			transform="rotate(90 31,31)"
			d="m8.016,36.5c3.047,0 5.516,-2.462 5.516,-5.5s-2.47,-5.5 -5.516,-5.5s-5.516,2.462 -5.516,5.5s2.47,5.5 5.516,5.5zm22.984,0c3.046,0 5.516,-2.462 5.516,-5.5s-2.47,-5.5 -5.516,-5.5s-5.516,2.462 -5.516,5.5s2.47,5.5 5.516,5.5zm22.984,0c3.046,0 5.516,-2.462 5.516,-5.5s-2.47,-5.5 -5.516,-5.5c-3.047,0 -5.516,2.462 -5.516,5.5s2.47,5.5 5.516,5.5z"
			fill="currentColor"
			fillRule="evenodd"
		/>
	</svg>
);

export function GearIcon(props) {
	return React.createElement(
		'svg',
		{ width: '18', height: '18', viewBox: '0 0 18 18', ...props },
		React.createElement('path', {
			fill: 'currentColor',
			d:
				'M14.3 6.2l1.1-2.1L14 2.7l-2.1 1.1c-.3-.2-.7-.3-1.1-.4L10 1H8l-.8 2.3c-.3.1-.7.2-1 .4L4.1 2.6 2.6 4.1l1.1 2.1c-.2.3-.3.7-.4 1L1 8v2l2.3.8c.1.4.3.7.4 1.1L2.6 14 4 15.4l2.1-1.1c.3.2.7.3 1.1.4L8 17h2l.8-2.3c.4-.1.7-.3 1.1-.4l2.1 1.1 1.4-1.4-1.1-2.1c.2-.3.3-.7.4-1.1L17 10V8l-2.3-.8c-.1-.3-.2-.7-.4-1zM9 12c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z',
		}),
	);
}

export const SolidTriangleIcon = props => (
	<svg {...props} width="12" height="12" viewBox="0 0 12 12">
		<path
			fill="currentColor"
			className="icon-path"
			d="M4.27 1.2l5.33 4a1 1 0 0 1 0 1.6l-5.33 4a1 1 0 0 1-1.6-.8V2a1 1 0 0 1 1.6-.8z"
		/>
	</svg>
);
