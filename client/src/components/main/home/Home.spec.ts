import mockInitStore from '@/mocks/mockInitStore';
import Home from '@/components/main/home/Home.vue';
import { buildCreateWrapper } from '@/utils/test';

const createWrapper = buildCreateWrapper(Home, undefined, {
    global: {
        stubs: ['HomeText'],
    },
});

describe('Home', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('does not have heading', () => {
        const wrapper = createWrapper();

        const headingElement = wrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(false);
    });
});
