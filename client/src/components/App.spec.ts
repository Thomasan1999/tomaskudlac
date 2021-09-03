import {mount} from '@vue/test-utils';
import App from '@/components/App.vue';
import {createPinia} from 'pinia';
import {nextTick} from 'vue';
import mockImageSrc from '@/mocks/mockImageSrc';

describe('App', () =>
{
    it('renders router view after component is initialized', async () =>
    {
        mockImageSrc();

        const wrapper = mount(App, {
            global: {
                plugins: [createPinia()],
                stubs: ['router-view']
            }
        });

        expect(wrapper.findComponent({name: 'router-view'}).exists()).toBe(false);

        await new Promise<void>((resolve) =>
        {
            wrapper.vm.$watch('initialized', async () =>
            {
                await nextTick();
                expect(wrapper.findComponent({name: 'router-view'}).exists()).toBe(true);
                resolve();
            });
        });
    });
});
