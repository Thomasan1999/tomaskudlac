import getUrlObject from '@/tests/e2e/utils/getUrlObject';
import { default as puppeteer, ElementHandle } from 'puppeteer';
import sleep from '@/utils/sleep';

describe('navigation', async () => {
    const domChangeTimeout = 500;
    const browser = await puppeteer.launch({ headless: true });
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

        const selector = '.navbar-middle-link';

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
        const initialHref = getUrlObject(page).href;

        const otherLangButtonSelector = '[data-testid="navbarOtherLang"]';

        const otherLangButton = (await page.$(otherLangButtonSelector))!;

        await otherLangButton.click();

        await sleep(domChangeTimeout);

        const otherLangButtonTextHandle = (await otherLangButton.getProperty('textContent'))!;

        const otherLangButtonText = (await otherLangButtonTextHandle.jsonValue())!;

        expect(otherLangButtonText).toBe('SK');

        const newHref = getUrlObject(page).href;

        expect(newHref).not.toBe(initialHref);
    });
});
