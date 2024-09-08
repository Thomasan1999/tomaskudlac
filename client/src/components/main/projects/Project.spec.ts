import Project from '@/components/main/projects/Project.vue';
import useStore from '@/store';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import { ProjectProps } from '@/components/main/projects/types';

const TEXT_CONTENT_SELECTOR = getTestingSelector('textContent');
const TITLE_SELECTOR = getTestingSelector('title');

describe('Project', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createProjectWrapper = buildCreateWrapper<ProjectProps>(Project, {
        name: 'fifaManiaci',
    });

    it('is wrapped in project link', () => {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const projectWrapper = createProjectWrapper({ name: projectName });

        const locales = store.locales.sections.projects.projects[projectName];

        const projectWrapperElement = projectWrapper.element as HTMLAnchorElement;

        const localesUrl = new URL(locales.href);
        const projectWrapperElementUrl = new URL(projectWrapperElement.href);

        expect(localesUrl.toString()).toBe(projectWrapperElementUrl.toString());
    });

    it('renders project description', () => {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const projectWrapper = createProjectWrapper({ name: projectName });

        const locales = store.locales.sections.projects.projects[projectName];

        const textContentElement = projectWrapper.get(TEXT_CONTENT_SELECTOR);

        expect(textContentElement.text()).not.toBeFalsy();
        expect(textContentElement.text()).toContain(locales.frontEndDesc);
        expect(textContentElement.text()).toContain(locales.backEndDesc);
        expect(textContentElement.text()).toContain(locales.designDesc);
    });

    it('renders project title', () => {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const projectWrapper = createProjectWrapper({ name: projectName });

        const locales = store.locales.sections.projects.projects[projectName];

        const textContentElement = projectWrapper.get(TITLE_SELECTOR);

        expect(textContentElement.text()).not.toBeFalsy();
        expect(textContentElement.text()).toContain(locales.title);
    });
});
