import getUrlObject from '@/tests/e2e/utils/getUrlObject';

describe('navigation', () =>
{
    const domChangeTimeout = 30;

    beforeEach(async () =>
    {
        await page.goto('http://localhost:8082');
    });

    it('changes hash on scroll', async () =>
    {
        let previousHash: string = '';

        const selector = '.main-section';

        await page.waitForSelector(selector, {timeout: 10000});

        const sections = await page.$$<HTMLDivElement>(selector);

        for await (const sectionIndex of sections.slice(1).keys())
        {
            await page.evaluate(async (sectionIndex, selector) =>
            {
                const sectionElements = document.querySelectorAll<HTMLDivElement>(selector);

                const sectionElement = sectionElements[sectionIndex];

                sectionElement.scrollIntoView({behavior: 'instant' as any, block: 'end'});
            }, sectionIndex, selector);

            await page.waitForTimeout(domChangeTimeout);

            const url = getUrlObject();

            expect(url.hash).not.toBe(previousHash);

            previousHash = url.hash;
        }
    });

    it('changes hash on nav item click', async () =>
    {
        let previousHash: string = '';

        const selector = '.navbar-middle-link';

        await page.waitForSelector(selector, {timeout: 10000});

        const navbarLinks = await page.$$<HTMLDivElement>(selector);

        for await (const navbarLink of navbarLinks.slice(1))
        {
            await navbarLink.click();

            await page.waitForTimeout(domChangeTimeout);

            const url = getUrlObject();

            expect(url.hash).not.toBe(previousHash);

            previousHash = url.hash;
        }
    });


    it('changes href on language change', async () =>
    {
        const initialHref = getUrlObject().href;

        const otherLangButtonSelector = '[data-testid="navbarOtherLang"]';

        const otherLangButton = (await page.$(otherLangButtonSelector))!;

        await otherLangButton.click();

        await page.waitForTimeout(domChangeTimeout);

        const otherLangButtonTextHandle = (await otherLangButton.getProperty('textContent'))!;

        const otherLangButtonText = await otherLangButtonTextHandle.jsonValue<string>();

        expect(otherLangButtonText).toBe('SK');

        const newHref = getUrlObject().href;

        expect(newHref).not.toBe(initialHref);
    });
});
