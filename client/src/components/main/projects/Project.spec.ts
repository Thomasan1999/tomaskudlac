import {mount, MountingOptions, VueWrapper} from '@vue/test-utils';
import {ComponentPublicInstance} from 'vue';
import Project from '@/components/main/projects/Project.vue';
import useStore from '@/store';
import mockInitStore from '@/mocks/mockInitStore';
import {Pinia} from 'pinia';

describe('Project', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    function createProjectWrapper(
        props: MountingOptions<any>['props'] = {}
    ): VueWrapper<ComponentPublicInstance>
    {
        const defaultProps = {
            name: 'fifaManiaci'
        };

        return mount(Project, {
            global: {
                plugins: [pinia]
            },
            props: {
                ...defaultProps,
                ...props
            }
        });
    }

    it('is wrapped in project link', () =>
    {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const projectWrapper = createProjectWrapper({name: projectName});

        const locales = store.locales.sections.projects.projects[projectName];

        const projectWrapperElement = projectWrapper.element as HTMLAnchorElement;

        const localesUrl = new URL(locales.href);
        const projectWrapperElementUrl = new URL(projectWrapperElement.href);

        expect(localesUrl.toString()).toBe(projectWrapperElementUrl.toString());
    });

    it('renders project description', () =>
    {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const projectWrapper = createProjectWrapper({name: projectName});

        const locales = store.locales.sections.projects.projects[projectName];

        const textContentElement = projectWrapper.get('[data-testid="textContent"]');

        expect(textContentElement.text()).not.toBeFalsy();
        expect(textContentElement.text()).toContain(locales.frontEndDesc);
        expect(textContentElement.text()).toContain(locales.backEndDesc);
        expect(textContentElement.text()).toContain(locales.designDesc);
    });

    it('renders project title', () =>
    {
        const store = useStore();

        const projectName = 'fifaManiaci';

        const projectWrapper = createProjectWrapper({name: projectName});

        const locales = store.locales.sections.projects.projects[projectName];

        const textContentElement = projectWrapper.get('[data-testid="title"]');

        expect(textContentElement.text()).not.toBeFalsy();
        expect(textContentElement.text()).toContain(locales.title);
    });
});
