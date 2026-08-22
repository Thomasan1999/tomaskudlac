import cz from '@/locales/cz';
import en from '@/locales/en';
import sk from '@/locales/sk';
import { Locales } from '@/locales/types';

/** Present in every language, but with contents that legitimately differ - compared by presence only. */
const LEAF_PATHS = ['navbar.otherLangs'];

/** Absent in some languages by design, so excluded from the comparison entirely. */
const OPTIONAL_PATHS = ['cookies'];

/**
 * Collects the dot-separated path of every key in the object. Arrays are treated as leaves - their element shape is
 * already guaranteed by the {@link Locales} type.
 */
function collectKeyPaths(value: object, prefix = ''): string[] {
    return Object.entries(value).flatMap(([key, keyValue]) => {
        const path = prefix ? `${prefix}.${key}` : key;

        if (OPTIONAL_PATHS.includes(path)) {
            return [];
        }

        if (LEAF_PATHS.includes(path)) {
            return [path];
        }

        const isPlainObject = typeof keyValue === 'object' && keyValue !== null && !Array.isArray(keyValue);

        return isPlainObject ? collectKeyPaths(keyValue, path) : [path];
    });
}

describe('locales', () => {
    const localesByLanguage: Record<string, Locales> = { cz, en, sk };

    /**
     * The `Locales` type cannot catch every drift on its own: `apiMessages` and `sections.projects.projects` are
     * index signatures, so their keys are unconstrained. Both are looked up by exact key at runtime - `apiMessages`
     * against the raw strings the API returns, `projects` against the hardcoded project names - so a mismatch is a
     * silent failure in one language only.
     */
    it('has the same key paths in every language', () => {
        const referencePaths = collectKeyPaths(sk).sort();

        Object.entries(localesByLanguage).forEach(([language, locales]) => {
            expect(collectKeyPaths(locales).sort(), `${language} differs from sk`).toEqual(referencePaths);
        });
    });

    /**
     * English links out to an external explanation rather than opening the modal, so translating these would be
     * shipping text nothing can display - see FooterCopyrightLink.
     */
    it('carries cookies texts exactly where the footer opens the modal', () => {
        expect(Object.keys(sk)).toContain('cookies');
        expect(Object.keys(cz)).toContain('cookies');
        expect(Object.keys(en)).not.toContain('cookies');
    });

    it('lists the two other languages in navbar.otherLangs', () => {
        Object.entries(localesByLanguage).forEach(([language, locales]) => {
            const otherLangs = Object.keys(locales.navbar.otherLangs).sort();
            const expected = Object.keys(localesByLanguage)
                .filter((otherLanguage) => otherLanguage !== language)
                .sort();

            expect(otherLangs, `${language} lists the wrong other languages`).toEqual(expected);
        });
    });
});
