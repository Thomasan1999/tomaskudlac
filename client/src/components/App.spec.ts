import { flushPromises } from '@vue/test-utils';
import App from '@/components/App.vue';
import mockImageSrc from '@/mocks/mockImageSrc';
import { buildCreateWrapper, initPinia } from '@/utils/test';

const createWrapper = buildCreateWrapper(App, undefined, {
    global: {
        stubs: ['RouterView'],
    },
});

describe('App', () => {
    beforeAll(() => {
        initPinia();
    });

    it('renders router view after component is initialized', async () => {
        mockImageSrc();

        const wrapper = createWrapper();

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(false);

        await flushPromises();

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    });
});
