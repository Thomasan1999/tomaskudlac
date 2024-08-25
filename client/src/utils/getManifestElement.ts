/**
 * Returns the HTML element which contains path to Web Manifest.
 * */
export default function getManifestElement(): HTMLLinkElement {
    return document.head.querySelector<HTMLLinkElement>('link[rel=manifest]')!;
}
