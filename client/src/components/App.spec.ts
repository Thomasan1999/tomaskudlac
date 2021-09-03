import {mount} from '@vue/test-utils';
import App from '@/components/App.vue';
import {createPinia} from 'pinia';
import {nextTick} from 'vue';

describe('App', () =>
{
    it('renders router view after component is initialized', async () =>
    {
        // Prevent image creation hanging when initializing store
        Object.defineProperty(global.Image.prototype, 'src', {
            set()
            {
                this.onload();
            }
        });

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
