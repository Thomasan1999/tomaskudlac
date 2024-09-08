import mockInitStore from '@/mocks/mockInitStore';
import Home from '@/components/main/home/Home.vue';
import { buildCreateWrapper } from '@/utils/test';

describe('Home', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createHomeWrapper = buildCreateWrapper(Home, undefined, {
        global: {
            stubs: ['HomeText'],
        },
    });

    it('does not have heading', () => {
        const homeWrapper = createHomeWrapper();

        const headingElement = homeWrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(false);
    });
});
