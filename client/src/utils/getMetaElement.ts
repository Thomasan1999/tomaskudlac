/**
 * Finds or if not found creates an HTML meta element with a given name.
 * @param name Name property of the element.
 * @returns The HTML meta element.
 * */
export default function getMetaElement(name: string): HTMLMetaElement {
    const existingTag = document.head.querySelector<HTMLMetaElement>(`meta[name=${name}]`);

    if (existingTag) {
        return existingTag;
    }

    const newTag = document.createElement('meta');

    newTag.name = name;

    document.head.appendChild(newTag);

    return newTag;
}
