import getLinkElement from '@/utils/getLinkElement';

describe('getLinkElement', () => {
    beforeEach(() => {
        document.head.innerHTML = '<link rel="stylesheet" href="main.css">';
    });

    it('creates the element if it does not exist', () => {
        expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();

        const link = getLinkElement('canonical');

        expect(link.tagName).toBe('LINK');
        expect(link.rel).toBe('canonical');
    });

    it('returns the existing element', () => {
        document.head.innerHTML += '<link rel="manifest" href="manifest.webmanifest">';

        const link = getLinkElement('manifest');

        expect(link.href).toContain('manifest.webmanifest');
        expect(getLinkElement('manifest')).toBe(link);
    });
});
