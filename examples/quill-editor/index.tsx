import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import { LocalizationProvider } from '@faithlife/react-ui';
import { Delta } from 'quill';
import styled from 'styled-components';
import QuillEditor, { Toolbar } from '@faithlife/quill-editor';
import localizedResources from '@faithlife/quill-editor/src/locales/en-US/resources.json';

const Spacing = styled.div`
	padding: 10px;
`;

const exampleCommunityChurchGroupId = '5698187';

const App: React.FunctionComponent = () => {
	const quillRef = useRef<any>(null);
	const [htmlContent, setHtmlContent] = useState('<p/>');
	const [deltaContent, setDeltaContent] = useState<Partial<Delta>>({ ops: [{ insert: 'hello' }] });
	const setAllContent = useCallback((content: Delta) => {
		if (content.ops) {
			const converter = new QuillDeltaToHtmlConverter(content.ops, {
				inlineStyles: true,
				encodeHtml: false, // Disabled because the liquid templating engine can't understand html encoded quotes "
			});
			const html = converter.convert();
			setHtmlContent(html);
			setDeltaContent(content);
		}
	}, []);

	const handleChange = useCallback(content => {
		if (quillRef.current) {
			const deltas = quillRef.current.getEditor().getContents();
			setAllContent(deltas);
		}
	}, []);

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

ReactDOM.render(<App />, document.getElementById('app'), null);
