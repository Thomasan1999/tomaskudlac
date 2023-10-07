import {Page} from 'puppeteer';

export default function getUrlObject(page: Page): URL
{
    return new URL(page.url());
}
