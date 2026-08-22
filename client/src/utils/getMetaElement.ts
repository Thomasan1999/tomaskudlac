/**
 * Finds or, if not found, creates an HTML meta element with a given name.
 *
 * @param name Value the element is identified by.
 * @param attribute Attribute holding that value. Open Graph tags are addressed by `property`, per its spec - the
 *   scrapers that read them ignore `name`.
 * @returns The HTML meta element.
 * */
export default function getMetaElement(name: string, attribute: 'name' | 'property' = 'name'): HTMLMetaElement {
    const existingTag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);

    if (existingTag) {
        return existingTag;
    }

    const newTag = document.createElement('meta');

    newTag.setAttribute(attribute, name);

    document.head.appendChild(newTag);

    return newTag;
}
