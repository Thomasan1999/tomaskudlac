import getManifestElement from '@/utils/getManifestElement';

describe('getManifestElement', () => {
    it('returns the right HTML element', () => {
        let manifest = getManifestElement();

        document.head.innerHTML = `
<link rel="stylesheet" href="main.css">
<script></script>
`;
        expect(manifest).toBe(null);

        document.head.innerHTML += '<link rel="manifest" href="manifest.webmanifest">';

        manifest = getManifestElement();

        expect(manifest.tagName).toBe('LINK');
        expect(manifest.rel).toBe('manifest');
        expect(manifest.href).toContain('manifest.webmanifest');
    });
});
