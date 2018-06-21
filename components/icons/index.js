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
		<g fill="none" fillRule="evenodd" transform="translate(-3 -3)">
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
