import getUrlObject from '@/tests/e2e/utils/getUrlObject';
import { default as puppeteer, type Browser, type ElementHandle, type Page } from 'puppeteer';
import { getTestingSelector } from '@/utils/test';
import { inject } from 'vitest';

const NAVBAR_LANG_CZ_SELECTOR = getTestingSelector('navbar-lang-cz');
const NAVBAR_LANG_EN_SELECTOR = getTestingSelector('navbar-lang-en');

describe('navigation', () => {
    const baseUrl = inject('baseUrl');

    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: true,
            args: process.env.CI ? ['--no-sandbox'] : undefined,
        });
        page = await browser.newPage();
    });

    // Without this the run leaks a Chromium process every time.
    afterAll(async () => {
        await browser?.close();
    });

    beforeEach(async () => {
        await page.goto(baseUrl);
    });

    /** Waits for the navigation to land somewhere new instead of guessing how long it takes. */
    async function waitForHashChange(previousHash: string): Promise<string> {
        await page.waitForFunction((hash) => window.location.hash !== hash, {}, previousHash);

        return getUrlObject(page).hash;
    }

    async function waitForHrefChange(previousHref: string): Promise<string> {
        await page.waitForFunction((href) => window.location.href !== href, {}, previousHref);

        return getUrlObject(page).href;
    }

    it('changes hash on scroll', async () => {
        const selector = '.main-section';

        await page.waitForSelector(selector, { timeout: 10000 });

        const sections = (await page.$$(selector)) as ElementHandle<HTMLDivElement>[];

        let previousHash = '';

        for await (const sectionIndex of sections.slice(1).keys()) {
            await page.evaluate(
                async (index, sectionSelector) => {
                    document
                        .querySelectorAll<HTMLDivElement>(sectionSelector)
                        [index].scrollIntoView({ behavior: 'instant', block: 'end' });
                },
                sectionIndex,
                selector,
            );

            previousHash = await waitForHashChange(previousHash);
        }
    });

    it('changes hash on nav item click', async () => {
        const selector = getTestingSelector('section-link');

        await page.waitForSelector(selector, { timeout: 10000 });

        const navbarLinks = (await page.$$(selector)) as ElementHandle<HTMLDivElement>[];

        let previousHash = '';

        for await (const navbarLink of navbarLinks.slice(1)) {
            await navbarLink.click();

            previousHash = await waitForHashChange(previousHash);
        }
    });

    it('changes href on language change', async () => {
        const skHref = getUrlObject(page).href;

        await (await page.$(NAVBAR_LANG_CZ_SELECTOR))!.click();

        const czHref = await waitForHrefChange(skHref);

        await (await page.$(NAVBAR_LANG_EN_SELECTOR))!.click();

        const enHref = await waitForHrefChange(czHref);

        expect(czHref).not.toBe(skHref);
        expect(enHref).not.toBe(czHref);
        expect(enHref).not.toBe(skHref);
    });
});
