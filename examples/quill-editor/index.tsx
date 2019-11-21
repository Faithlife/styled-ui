import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { LocalizationProvider } from '@faithlife/react-ui';
import styled from 'styled-components';
import QuillEditor, { Toolbar } from '@faithlife/quill-editor';
import localizedResources from '@faithlife/quill-editor/src/locales/en-US/resources.json';

const Spacing = styled.div`
	padding: 10px;
`;

const exampleCommunityChurchGroupId = '5698187';

const TestApp: React.FunctionComponent = () => {
	const quillRef = useRef<any>(null);
	const [htmlContent, setHtmlContent] = useState('<p/>');
	const [deltaContent, setDeltaContent] = useState<any>({ ops: [{ insert: 'hello' }] });
	const setAllContent = useCallback((content: any) => {
		if (content.ops) {
			const converter = quillRef.current.getHTML({
				inlineStyles: true,
				encodeHtml: false, // Disabled because the liquid templating engine can't understand html encoded quotes "
			});
			const html = converter.convert();
			setHtmlContent(html);
			setDeltaContent(content);
		}
	}, []);

	const handleChange = useCallback(
		content => {
			if (quillRef.current) {
				const deltas = quillRef.current.getEditor().getContents();
				setAllContent(deltas);
			}
		},
		[setAllContent]
	);

	return (
		<LocalizationProvider localizedResources={localizedResources}>
			<>
				<Spacing>
					<QuillEditorStyled
						placeholder={'Your message here...'}
						editorId="message"
						groupId={exampleCommunityChurchGroupId}
						ref={quillRef}
						defaultValue={deltaContent}
						onContentChange={handleChange}
					>
						<Toolbar editorId="message" />
					</QuillEditorStyled>
				</Spacing>
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
`;

ReactDOM.render(<TestApp />, document.getElementById('app'));
