import { flushPromises } from '@vue/test-utils';
import App from '@/components/App.vue';
import { buildCreateWrapper, initPinia } from '@/utils/test';

const createWrapper = buildCreateWrapper(App, undefined, {
    global: {
        stubs: ['RouterView'],
    },
});

describe('App', () => {
    // A fresh store per test: `init()` resolves during the first one, so a shared store would already be
    // initialized by the time the next test mounts.
    beforeEach(() => {
        initPinia();
    });

    /**
     * Teleport resolves its target on mount and never retries, and ToastContainer mounts straight away while the
     * router view waits for the store. A target rendered further down the tree is therefore already too late.
     */
    it('provides the teleport target before anything can teleport into it', () => {
        const wrapper = createWrapper();

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(false);
        expect(wrapper.find('#modal-container').exists()).toBe(true);
    });

    it('renders router view after component is initialized', async () => {
        const wrapper = createWrapper();

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(false);

        await flushPromises();

        expect(wrapper.findComponent({ name: 'RouterView' }).exists()).toBe(true);
    });
});
