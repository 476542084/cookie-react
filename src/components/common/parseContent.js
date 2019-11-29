const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

export const parseContent = (postText) => {
    return {__html: DOMPurify.sanitize(postText)}
}