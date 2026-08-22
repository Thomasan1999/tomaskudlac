/**
 * Finds or, if not present, creates the `link` element with a given `rel`.
 *
 * @param rel Rel attribute of the element.
 * @returns The HTML link element.
 */
export default function getLinkElement(rel: string): HTMLLinkElement {
    const existingTag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

    if (existingTag) {
        return existingTag;
    }

    const newTag = document.createElement('link');

    newTag.rel = rel;

    document.head.appendChild(newTag);

    return newTag;
}
