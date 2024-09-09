import Project from '@/components/main/projects/Project.vue';
import useStore from '@/store';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const TEXT_CONTENT_SELECTOR = getTestingSelector('text-content');
const TITLE_SELECTOR = getTestingSelector('title');

const createWrapper = buildCreateWrapper(Project, {
    name: 'fifaManiaci',
});

describe('Project', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('is wrapped in project link', () => {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const wrapper = createWrapper({ name: projectName });

        const locales = store.locales.sections.projects.projects[projectName];

        const wrapperElement = wrapper.element as HTMLAnchorElement;

        const localesUrl = new URL(locales.href);
        const wrapperElementUrl = new URL(wrapperElement.href);

        expect(localesUrl.toString()).toBe(wrapperElementUrl.toString());
    });

    it('renders project description', () => {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const wrapper = createWrapper({ name: projectName });

        const locales = store.locales.sections.projects.projects[projectName];

        const textContentElement = wrapper.get(TEXT_CONTENT_SELECTOR);

        expect(textContentElement.text()).not.toBeFalsy();
        expect(textContentElement.text()).toContain(locales.frontEndDesc);
        expect(textContentElement.text()).toContain(locales.backEndDesc);
        expect(textContentElement.text()).toContain(locales.designDesc);
    });

    it('renders project title', () => {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const wrapper = createWrapper({ name: projectName });

        const locales = store.locales.sections.projects.projects[projectName];

        const textContentElement = wrapper.get(TITLE_SELECTOR);

        expect(textContentElement.text()).not.toBeFalsy();
        expect(textContentElement.text()).toContain(locales.title);
    });
});
