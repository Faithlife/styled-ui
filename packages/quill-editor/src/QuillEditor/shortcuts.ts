export const getShortcuts = quillRef => ({
	openLink: {
		key: 13,
		altKey: true,
		handler: () => {
			const format = quillRef.current.getEditor().getFormat();
			if (format.link) {
				window.open(format.link);
			}
		},
	},
	clearFormatting: {
		key: ' ',
		shortKey: true,
		handler: range => {
			quillRef.current.getEditor().removeFormat(range.index, range.length, 'user');
		},
	},
	setHeading0: {
		key: '0',
		shortKey: true,
		altKey: true,
		handler: () => {
			quillRef.current.getEditor().format('header', 0);
		},
	},
	setHeading1: {
		key: '1',
		shortKey: true,
		altKey: true,
		handler: () => {
			quillRef.current.getEditor().format('header', 1);
		},
	},
	setHeading2: {
		key: '2',
		shortKey: true,
		altKey: true,
		handler: () => {
			quillRef.current.getEditor().format('header', 2);
		},
	},
	setHeading3: {
		key: '3',
		shortKey: true,
		altKey: true,
		handler: () => {
			quillRef.current.getEditor().format('header', 3);
		},
	},
	alignCenter: {
		key: 'e',
		shortKey: true,
		shiftKey: true,
		handler: () => {
			quillRef.current.getEditor().format('align', 'center');
		},
	},
	alignRight: {
		key: 'r',
		shortKey: true,
		shiftKey: true,
		handler: () => {
			quillRef.current.getEditor().format('align', 'right');
		},
	},
	strikethroughButton: {
		key: '5',
		altKey: true,
		shiftKey: true,
		handler: (range, context) => {
			if (context.format.strike) {
				quillRef.current.getEditor().format('strike', false);
			} else {
				quillRef.current.getEditor().format('strike', true);
			}
		},
	},
	orderedListButton: {
		key: '7',
		shortKey: true,
		shiftKey: true,
		handler: (range, context) => {
			if (context.format.list === 'ordered') {
				quillRef.current.getEditor().format('list', false);
			} else {
				quillRef.current.getEditor().format('list', 'ordered');
			}
		},
	},
	bulletListButton: {
		key: '8',
		shortKey: true,
		shiftKey: true,
		handler: (range, context) => {
			if (context.format.list === 'bullet') {
				quillRef.current.getEditor().format('list', false);
			} else {
				quillRef.current.getEditor().format('list', 'bullet');
			}
		},
	},
});
