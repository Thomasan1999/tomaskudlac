import {mount, VueWrapper} from '@vue/test-utils';
import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import Home from '@/components/main/home/Home.vue';

describe('Home', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    function createHomeWrapper(): VueWrapper
    {
        return mount(Home, {
            global: {
                plugins: [pinia],
                stubs: ['HomeText']
            }
        });
    }

    it('does not have heading', () =>
    {
        const homeWrapper = createHomeWrapper();

        const headingElement = homeWrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(false);
    });
});
