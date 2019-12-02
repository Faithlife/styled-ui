import ReactQuill from 'react-quill';
import styled from 'styled-components';

export const SafeQuill = ReactQuill && (ReactQuill as any).Quill;
export const SafeReactQuill = SafeQuill ? ReactQuill : styled.div``;
