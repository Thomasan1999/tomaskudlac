import getMetaElement from '@/utils/getMetaElement';

describe('getMetaElement', () =>
{
    beforeAll(() =>
    {
        document.head.innerHTML = `
        <meta name="random" content="Aaa">
        <link rel="stylesheet" href="main.css">
        <title>Title</title>
       `;
    });

    it('creates element if does not exist', () =>
    {
        let metaTag = document.querySelector<HTMLMetaElement>('meta[name="description"]');

        expect(metaTag).toBeNull();

        metaTag = getMetaElement('description');

        expect(metaTag.tagName).toBe('META');
        expect(metaTag.name).toBe('description');
    });

    it('returns the right HTML element', () =>
    {
        document.head.innerHTML = `${document.head.innerHTML}<meta name="robots" content="noindex">`;

        const metaTag = getMetaElement('robots');

        expect(metaTag.tagName).toBe('META');
        expect(metaTag.content).toBe('noindex');
    });
});
