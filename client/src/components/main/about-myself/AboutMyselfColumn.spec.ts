import mockInitStore from '@/mocks/mockInitStore';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
import useStore from '@/store';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const TEXT_SELECTOR = getTestingSelector('text');
const TITLE_SELECTOR = getTestingSelector('title');

const createWrapper = buildCreateWrapper(AboutMyselfColumn, {
    title: '',
    text: '',
});

describe('AboutMyselfColumn', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it("renders 'text' property", async () => {
        let text = 'this is a random text';

        const wrapper = createWrapper({ text });

        const textElement = wrapper.get(TEXT_SELECTOR);

        expect(textElement.text()).toBe(text);

        text = 'this is another text';

        await wrapper.setProps({ text });

        expect(textElement.text()).toBe(text);
    });

    it("renders variables in 'text' property", async () => {
        const store = useStore();

        let rawText = '*JS* is {{age}} years old. Other programming languages are {{programmingLanguages}}';

        let parsedText = `
<strong>JS</strong> is ${store.age} years old. Other programming languages are ${store.programmingLanguagesString}
`.trim();

        const wrapper = createWrapper({ text: rawText });

        const textElement = wrapper.get(TEXT_SELECTOR);

        expect(textElement.html()).toContain(parsedText);

        rawText = "*I*'m {{age}} years old. These programming languages {{programmingLanguages}} are older.";

        parsedText = `
<strong>I</strong>'m ${store.age} years old. These programming languages ${store.programmingLanguagesString} are older.
`.trim();

        await wrapper.setProps({ text: rawText });

        expect(textElement.html()).toContain(parsedText);
    });

    it("renders 'title' property", async () => {
        let title = 'Title';

        const wrapper = createWrapper({ title });

        const titleElement = wrapper.get(TITLE_SELECTOR);

        expect(titleElement.text()).toBe(title);

        title = 'New Title';

        await wrapper.setProps({ title });

        expect(titleElement.text()).toBe(title);
    });
});
