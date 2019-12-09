import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LocalizationProvider } from '@faithlife/react-ui';
import styled from 'styled-components';
import QuillEditor, { Toolbar } from '@faithlife/quill-editor';
import localizedResources from '@faithlife/quill-editor/src/locales/en-US/resources.json';

const exampleCommunityChurchGroupId = '5698187';

const TestApp: React.FunctionComponent = () => {
	const quillRef = useRef<any>(null);
	const [htmlContent, setHtmlContent] = useState(
		'<p><br></p><p><a href="http://google.com" rel="noopener noreferrer" target="_blank" class="ql-image-wrap"><img src="https://internal.files.logos.com/v1/files/7078936/content.jpg?signature=CYseDLT9KzRpmMO95dCxIfAaRqI" width="495px"></a>hello</p>'
	);
	const [inlineHtmlContent, setInlineHtmlContent] = useState('<p>hello</p>');
	const [deltaContent, setDeltaContent] = useState<any>({ ops: [{ insert: 'hello\n' }] });
	const setAllContent = useCallback((content: any) => {
		const inlineHtml = quillRef.current.getHTML({
			format: 'inline',
		});
		const delta = quillRef.current.getEditor().getContents();
		//const html = quillRef.current.getHTML();
		setHtmlContent(content);
		setInlineHtmlContent(inlineHtml);
		setDeltaContent(delta);
	}, []);

	const handleChange = useCallback(
		content => {
			setAllContent(content);
		},
		[setAllContent]
	);

	const [placeholder] = useState('Your message here...');
	const updatePlaceholder = useCallback(() => {
		setHtmlContent(htmlContent + 'a');
	}, [htmlContent]);

	return (
		<LocalizationProvider localizedResources={localizedResources}>
			<>
				<QuillEditorStyled
					placeholder={placeholder}
					editorId="message"
					groupId={exampleCommunityChurchGroupId}
					ref={quillRef}
					value={htmlContent}
					onContentChange={handleChange}
				>
					<Toolbar editorId="message" />
				</QuillEditorStyled>
				<br />
				<button onClick={updatePlaceholder}>{'test'}</button>
				<br />
				<br />
				{JSON.stringify(deltaContent)}
				<br />
				<br />
				{htmlContent}
				<br />
				<br />
				{inlineHtmlContent}
				<br />
				<br />
				<Preview dangerouslySetInnerHTML={{ __html: inlineHtmlContent }} />
			</>
		</LocalizationProvider>
	);
};

const QuillEditorStyled = styled(QuillEditor)`
	background: white;
	min-height: 150px;
	font-family: Source Sans Pro;
`;

const Preview = styled.div`
	border: 1px solid black;
`;

ReactDOM.render(<TestApp />, document.getElementById('app'));
