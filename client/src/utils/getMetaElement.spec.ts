import getMetaElement from '@/utils/getMetaElement';

describe('getMetaElement', () => {
    beforeAll(() => {
        document.head.innerHTML = `
        <meta name="random" content="Aaa">
        <link rel="stylesheet" href="main.css">
        <title>Title</title>
       `;
    });

    it('creates element if does not exist', () => {
        let metaTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');

        expect(metaTag).toBeNull();

        metaTag = getMetaElement('description');

        expect(metaTag.tagName).toBe('META');
        expect(metaTag.name).toBe('description');
    });

    // An unquoted attribute selector cannot hold a colon, so `meta[name=og:title]` threw a SyntaxError.
    it('handles names that are not valid unquoted attribute values', () => {
        const metaTag = getMetaElement('og:title');

        expect(metaTag.tagName).toBe('META');
        expect(metaTag.name).toBe('og:title');
        expect(getMetaElement('og:title')).toBe(metaTag);
    });

    it('returns the right HTML element', () => {
        document.head.innerHTML = `${document.head.innerHTML}<meta name="robots" content="noindex">`;

        const metaTag = getMetaElement('robots');

        expect(metaTag.tagName).toBe('META');
        expect(metaTag.content).toBe('noindex');
    });
});
