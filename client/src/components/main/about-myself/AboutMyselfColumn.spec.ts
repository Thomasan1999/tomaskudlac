import { mount, MountingOptions, VueWrapper } from '@vue/test-utils';
import { Pinia } from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
import useStore from '@/store';

describe('AboutMyselfColumn', () => {
    let pinia: Pinia;

    beforeAll(async () => {
        pinia = await mockInitStore();
    });

    function createAboutMyselfColumnWrapper(props: MountingOptions<any>['props'] = {}): VueWrapper {
        const defaultProps = {
            title: '',
            text: '',
        };

        return mount(AboutMyselfColumn, {
            global: {
                plugins: [pinia],
            },
            props: {
                ...defaultProps,
                ...props,
            },
        });
    }

    it("renders 'text' property", async () => {
        let text = 'this is a random text';

        const aboutMyselfColumnWrapper = createAboutMyselfColumnWrapper({ text });

        const textElement = aboutMyselfColumnWrapper.get('[data-testid="text"]');

        expect(textElement.text()).toBe(text);

        text = 'this is another text';

        await aboutMyselfColumnWrapper.setProps({ text });

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

        await aboutMyselfColumnWrapper.setProps({ text: rawText });

        expect(textElement.html()).toContain(parsedText);
    });

    it("renders 'title' property", async () => {
        let title = 'Title';

        const aboutMyselfColumnWrapper = createAboutMyselfColumnWrapper({ title });

        const titleElement = aboutMyselfColumnWrapper.get('[data-testid="title"]');

        expect(titleElement.text()).toBe(title);

        title = 'New Title';

        await aboutMyselfColumnWrapper.setProps({ title });

        expect(titleElement.text()).toBe(title);
    });
});
