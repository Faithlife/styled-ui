import { SafeQuill } from '../../QuillEditor/SafeQuill';

const Embed = SafeQuill && SafeQuill.import('blots/embed');
const ATTRIBUTES = ['alt', 'height', 'width', 'align'];

let ImageBlot;
if (Embed) {
	ImageBlot = class ImageBlot extends Embed {
		static blotName = 'image';
		static tagName = 'img';

		static create(data) {
			const node = super.create();
			node.setAttribute('src', data.url);
			node.setAttribute('width', data.width);
			node.setAttribute('align', data.align);
			if (data.title) {
				node.setAttribute('alt', data.title);
				node.setAttribute('title', data.title);
			}
			return node;
		}

		static formats(node) {
			return ATTRIBUTES.reduce((formats, attribute) => {
				if (node.hasAttribute(attribute)) {
					formats[attribute] = node.getAttribute(attribute);
				}
				return formats;
			}, {});
		}

		static value(node) {
			return node.getAttribute('src') || true;
		}

		format(name, value) {
			if (ATTRIBUTES.indexOf(name) > -1) {
				if (value) {
					this.domNode.setAttribute(name, value);
				} else {
					this.domNode.removeAttribute(name);
				}
			} else {
				super.format(name, value);
			}
		}
	};
}
export default ImageBlot;
