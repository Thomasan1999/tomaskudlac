import { flushPromises, mount } from '@vue/test-utils';
import App from '@/components/App.vue';
import { createPinia } from 'pinia';
import mockImageSrc from '@/mocks/mockImageSrc';

describe('App', () => {
    it('renders router view after component is initialized', async () => {
        mockImageSrc();

        const wrapper = mount(App, {
            global: {
                plugins: [createPinia()],
                stubs: ['RouterView'],
            },
        });

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(false);

        await flushPromises();

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    });
});
