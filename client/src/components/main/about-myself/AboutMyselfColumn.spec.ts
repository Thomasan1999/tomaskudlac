import mockInitStore from '@/mocks/mockInitStore';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
import useStore from '@/store';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { AboutMyselfColumnProps } from '@/components/main/about-myself/types';

describe('AboutMyselfColumn', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createAboutMyselfColumnWrapper = buildCreateWrapper<AboutMyselfColumnProps>(AboutMyselfColumn, {
        title: '',
        text: '',
    });
    const setProps = buildSetProps<AboutMyselfColumnProps>();

    it("renders 'text' property", async () => {
        let text = 'this is a random text';

        const aboutMyselfColumnWrapper = createAboutMyselfColumnWrapper({ text });

        const textElement = aboutMyselfColumnWrapper.get('[data-testid="text"]');

        expect(textElement.text()).toBe(text);

        text = 'this is another text';

        await setProps(aboutMyselfColumnWrapper, { text });

        expect(textElement.text()).toBe(text);
    });

    it("renders variables in 'text' property", async () => {
        const store = useStore();

        let rawText = '*JS* is {{age}} years old. Other programming languages are {{programmingLanguages}}';

        let parsedText = `
<strong>JS</strong> is ${store.age} years old. Other programming languages are ${store.programmingLanguagesString}
`.trim();

        const aboutMyselfColumnWrapper = createAboutMyselfColumnWrapper({ text: rawText });

        const textElement = aboutMyselfColumnWrapper.get('[data-testid="text"]');

        expect(textElement.html()).toContain(parsedText);

        rawText = "*I*'m {{age}} years old. These programming languages {{programmingLanguages}} are older.";

        parsedText = `
<strong>I</strong>'m ${store.age} years old. These programming languages ${store.programmingLanguagesString} are older.
`.trim();

        await setProps(aboutMyselfColumnWrapper, { text: rawText });

        expect(textElement.html()).toContain(parsedText);
    });

    it("renders 'title' property", async () => {
        let title = 'Title';

        const aboutMyselfColumnWrapper = createAboutMyselfColumnWrapper({ title });

        const titleElement = aboutMyselfColumnWrapper.get('[data-testid="title"]');

        expect(titleElement.text()).toBe(title);

        title = 'New Title';

        await setProps(aboutMyselfColumnWrapper, { title });

        expect(titleElement.text()).toBe(title);
    });
});
