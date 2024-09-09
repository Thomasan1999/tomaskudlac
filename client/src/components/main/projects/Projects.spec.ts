import Projects from '@/components/main/projects/Projects.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper } from '@/utils/test';

describe('Projects', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createWrapper = buildCreateWrapper(Projects, undefined, {
        global: {
            stubs: ['Project'],
        },
    });

    it('has heading', () => {
        const wrapper = createWrapper();

        const headingElement = wrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(true);
    });
});
