import type { RouteLocationNormalized } from 'vue-router';
import getLinkElement from '@/utils/getLinkElement';
import getMetaElement from '@/utils/getMetaElement';
import { parseTemplateVariables } from '@/utils/parseTemplateVariables';

/** Origin the canonical and Open Graph URLs are built from. */
export const SITE_ORIGIN = 'https://tomaskudlac.sk';

/**
 * Points the document head at the given route.
 *
 * The server renders these tags for the language it was asked for, but the language can also change client-side
 * without a request, and a crawler arriving at a switched page would otherwise read the tags of the language it
 * started from. Everything the server varies has to be kept in step here.
 */
export default function syncDocumentHead(
    to: RouteLocationNormalized,
    templateVariables: Record<string, string | number>,
): void {
    const { canonicalPath, language, ogLocale, title } = to.meta;

    const description = parseTemplateVariables(to.meta.description, templateVariables);

    document.documentElement.lang = language;
    document.title = title;

    getMetaElement('description').content = description;

    getLinkElement('manifest').href = `/manifest_${language}.webmanifest`;

    const canonicalUrl = `${SITE_ORIGIN}${canonicalPath ?? to.path}`;

    getLinkElement('canonical').href = canonicalUrl;

    getMetaElement('og:title', 'property').content = title;
    getMetaElement('og:description', 'property').content = description;
    getMetaElement('og:url', 'property').content = canonicalUrl;

    if (ogLocale) {
        getMetaElement('og:locale', 'property').content = ogLocale;
    }
}
