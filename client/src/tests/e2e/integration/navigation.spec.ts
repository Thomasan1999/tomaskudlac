import getUrlObject from '@/tests/e2e/utils/getUrlObject';
import { default as puppeteer, ElementHandle } from 'puppeteer';
import sleep from '@/utils/sleep';
import { getTestingSelector } from '@/utils/test';

const NAVBAR_LANG_CZ_SELECTOR = getTestingSelector('navbar-lang-cz');
const NAVBAR_LANG_EN_SELECTOR = getTestingSelector('navbar-lang-en');

describe('navigation', async () => {
    const domChangeTimeout = 500;
    const browser = await puppeteer.launch({ headless: true, args: process.env.CI ? ['--no-sandbox'] : undefined });
    const page = await browser.newPage();

    beforeEach(async () => {
        await page.goto('http://localhost:8082');
    });

    it('changes hash on scroll', async () => {
        let previousHash: string = '';

        const selector = '.main-section';

        await page.waitForSelector(selector, { timeout: 10000 });

        const sections = (await page.$$(selector)) as ElementHandle<HTMLDivElement>[];

        for await (const sectionIndex of sections.slice(1).keys()) {
            await page.evaluate(
                async (sectionIndex, selector) => {
                    const sectionElements = document.querySelectorAll<HTMLDivElement>(selector);

                    const sectionElement = sectionElements[sectionIndex];

                    sectionElement.scrollIntoView({ behavior: 'instant', block: 'end' });
                },
                sectionIndex,
                selector,
            );

            await sleep(domChangeTimeout);

            const url = getUrlObject(page);

            expect(url.hash).not.toBe(previousHash);

            previousHash = url.hash;
        }
    });

    it('changes hash on nav item click', async () => {
        let previousHash: string = '';

        const selector = getTestingSelector('section-link');

        await page.waitForSelector(selector, { timeout: 10000 });

        const navbarLinks = (await page.$$(selector)) as ElementHandle<HTMLDivElement>[];

        for await (const navbarLink of navbarLinks.slice(1)) {
            await navbarLink.click();

            await sleep(domChangeTimeout);

            const url = getUrlObject(page);

            expect(url.hash).not.toBe(previousHash);

            previousHash = url.hash;
        }
    });

    it('changes href on language change', async () => {
        const skHref = getUrlObject(page).href;

        const czLangButton = (await page.$(NAVBAR_LANG_CZ_SELECTOR))!;

        await czLangButton.click();

        await sleep(domChangeTimeout);

        const czHref = getUrlObject(page).href;

        expect(czHref).not.toBe(skHref);

        const enLangButton = (await page.$(NAVBAR_LANG_EN_SELECTOR))!;

        await enLangButton.click();

        await sleep(domChangeTimeout);

        const enHref = getUrlObject(page).href;

        expect(enHref).not.toBe(czHref);
        expect(enHref).not.toBe(skHref);
    });
});
