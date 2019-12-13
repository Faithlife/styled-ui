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
		'<p>Normal</p><h1>Header 1</h1><h2>Header 2</h2><h3>Header 3?</h3><p><strong>Bold</strong></p><p><em>Italic</em></p><p><u>Underline</u></p><p><s>Strikethrough</s></p><blockquote>Blockquote</blockquote><ol><li>Point 1</li><li>Point 2</li></ol><ul><li>Point</li><li>Point</li></ul><p>Left</p><p class="ql-align-center">Center</p><p class="ql-align-right">Right</p><p class="ql-align-center">Center</p><p>Left</p><p><a href="https://www.google.com" rel="noopener noreferrer" target="_blank">Google</a>?</p><p>Plain picture</p><p><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="495px"></p><p>plain picture center</p><p class="ql-align-center"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="493"></p><p>plain picture right</p><p class="ql-align-right"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="511"></p><p>plain picture wrapped with text</p><p><span class="ql-image-wrap"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="492"></span></p><p>Hello! This is text that this picture is describing...</p><p>Or is it the other way around? :thinking:</p><p><br></p><p><br></p><p><br></p><p><br></p><p>plain picture center wrapped with text</p><p class="ql-align-center"><span class="ql-image-wrap"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="487"></span></p><p class="ql-align-center">Hello there!</p><p class="ql-align-center">Well... That didn\'t *really* work, but I can still achieve the same effect.</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>plain picture right wrapped with text</p><p class="ql-align-right"><span class="ql-image-wrap"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="494"></span></p><p class="ql-align-right">This is not hmm...</p><p class="ql-align-right">Again, I can achieve the same effect, but it\'s not the greatest experience.</p><p class="ql-align-right"><br></p><p class="ql-align-right"><br></p><p class="ql-align-right"><br></p><p>link picture</p><p><a href="https://www.google.com" rel="noopener noreferrer" target="_blank"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="492"></a></p><p>link picture right</p><p class="ql-align-right"><a href="https://www.google.com" rel="noopener noreferrer" target="_blank"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="491"></a></p><p>link picture wrapped with text</p><p><a href="https://www.google.com" rel="noopener noreferrer" target="_blank" class="ql-image-wrap"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="491"></a></p><p>This image links to google for some reason.</p><p><br></p><p><br></p><p><br></p><p>&lt;-- There\'s a yellow skittle right there.</p><p><br></p><p>link picture center wrapped with text</p><p class="ql-align-center"><a href="https://www.google.com" rel="noopener noreferrer" target="_blank" class="ql-image-wrap"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="488"></a> Woah... I didn\'t know you could actually put the picture in the middle...</p><p class="ql-align-center">Text won\'t wrap that way though</p><p class="ql-align-center">Ooh, it works better if you center *first* and then wrap.</p><p><br></p><p><br></p><p><br></p><p>link picture right wrapped with text</p><ol><li class="ql-align-right"><a href="https://www.google.com" rel="noopener noreferrer" target="_blank" class="ql-image-wrap"><img src="https://internal.files.logos.com/v1/files/7092747/content.png?signature=_ghsfTR3UcpaE-rcBQH2232XCac" width="492"></a> Type first</li><li class="ql-align-right">Add more lines</li><li class="ql-align-right">Add alignment</li><li class="ql-align-right">Add wrapping</li><li class="ql-align-right">Add link</li></ol><p class="ql-align-right"><br></p><p class="ql-align-right"><br></p>'
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
					autofocus
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
	max-height: 400px;
	font-family: Source Sans Pro;
`;

const Preview = styled.div`
	border: 1px solid black;
`;

ReactDOM.render(<TestApp />, document.getElementById('app'));
