import {mount, VueWrapper} from '@vue/test-utils';
import Projects from '@/components/main/projects/Projects.vue';
import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';

describe('Projects', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    function createProjectsWrapper(): VueWrapper
    {
        return mount(Projects, {
            global: {
                plugins: [pinia],
                stubs: ['Project']
            }
        });
    }

    it('has heading', () =>
    {
        const projectsWrapper = createProjectsWrapper();

        const headingElement = projectsWrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(true);
    });
});
