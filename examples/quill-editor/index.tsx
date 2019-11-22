import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LocalizationProvider } from '@faithlife/react-ui';
import styled from 'styled-components';
import QuillEditor, { Toolbar } from '@faithlife/quill-editor';
import localizedResources from '@faithlife/quill-editor/src/locales/en-US/resources.json';

const exampleCommunityChurchGroupId = '5698187';

const TestApp: React.FunctionComponent = () => {
	const quillRef = useRef<any>(null);
	const [htmlContent, setHtmlContent] = useState('<p/>');
	const [deltaContent, setDeltaContent] = useState<any>({ ops: [{ insert: 'hello\n' }] });
	const setAllContent = useCallback((content: any) => {
		if (content.ops) {
			const html = quillRef.current.getHTML({
				inlineStyles: true,
				encodeHtml: false, // Disabled because the liquid templating engine can't understand html encoded quotes "
			});
			setHtmlContent(html);
			setDeltaContent(content);
		}
	}, []);

	const handleChange = useCallback(
		content => {
			setAllContent(content);
		},
		[setAllContent]
	);

	return (
		<LocalizationProvider localizedResources={localizedResources}>
			<>
				<QuillEditorStyled
					placeholder={'Your message here...'}
					editorId="message"
					groupId={exampleCommunityChurchGroupId}
					ref={quillRef}
					value={deltaContent}
					onContentChange={handleChange}
				>
					<Toolbar editorId="message" />
				</QuillEditorStyled>
				<br />
				{htmlContent}
				<br />
				{JSON.stringify(deltaContent)}
			</>
		</LocalizationProvider>
	);
};

const QuillEditorStyled = styled(QuillEditor)`
	background: white;
	min-height: 150px;
	font-family: Source Sans Pro;
`;

ReactDOM.render(<TestApp />, document.getElementById('app'));
