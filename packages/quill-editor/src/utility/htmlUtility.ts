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
			return 'style="float: right; margin-left: 16px; margin-bottom: 8px;" ';
		} else {
			return 'style="float: left; margin-right: 16px; margin-bottom: 8px;" ';
		}
	}
	return '';
};

const renderFaithlifeImage = (op, context, isInline) => {
	const { imageAlign, link, ...otherAttributes } = op.attributes as any;

	// prettier-ignore
	return `${link ? `<a href="${link}" target="_blank" rel="noreferrer noopener" ${!isInline && imageAlign === 'wrap' ? 'class="ql-image-wrap" ' : ''}>` 
				   : !isInline && imageAlign ? '<span class="ql-image-wrap"/>' : ''
			}<img src="${op.insert.value.url}" ${renderAttributes(otherAttributes)}${isInline ? renderAlignAttribute(imageAlign, context):''}/>${link ? `</a>` : ''}`;
};

export const convertDeltaToHtml = (content, options: any = {}) => {
	const isInline = options.format === 'inline';
	const ops = content.ops || content;
	const defaultOptions = {
		inlineStyles: isInline,
		encodeHtml: false, // Disabled because the liquid templating engine doesn't understand html encoded quotes "
		urlSanitizer: url => url,
	};

	const finalOptions = { ...defaultOptions, ...options };
	const converter = new QuillDeltaToHtmlConverter(ops, finalOptions);

	converter.renderCustomWith((op, context) => {
		if (op.insert.type === 'faithlifeImage') {
			return renderFaithlifeImage(op, context, isInline);
		}
		return '';
	});

	const html = converter.convert();
	return html;
};

// legacy
export const convertDeltaToInlineHtml = (content, options = {}) => {
	return convertDeltaToHtml(content, { ...options, format: 'inline' });
};
