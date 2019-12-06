import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

function renderAttributes(attributes) {
	return Object.entries(attributes).reduce(
		(attrs, [key, value]) => `${attrs}${key}="${value}" `,
		''
	);
}

const renderAlignAttribute = (alignment, context) => {
	if (alignment === 'wrap') {
		if (context && context.attributes.align === 'right') {
			return 'style="float: right; margin-left: 16px; margin-bottom: 8px;"';
		} else {
			return 'style="float: left; margin-right: 16px; margin-bottom: 8px;"';
		}
	}
	return '';
};

const renderFaithlifeImage = (op, context) => {
	const { imageAlign, ...otherAttributes } = op.attributes as any;
	return `<img src="${op.insert.value.url}" 
		${renderAttributes(otherAttributes)}
		${renderAlignAttribute(imageAlign, context)} />`;
};

export const getRenderedHtmlContent = (ops, options) => {
	const defaultOptions = {
		inlineStyles: true,
		encodeHtml: false, // Disabled because the liquid templating engine can't understand html encoded quotes "
	};
	const converter = new QuillDeltaToHtmlConverter(ops, { ...defaultOptions, ...options });

	converter.renderCustomWith((op, context) => {
		if (op.insert.type === 'faithlifeImage') {
			return renderFaithlifeImage(op, context);
		}
		return '';
	});
	const html = converter.convert();
	return html;
};
