import Toast from '@/components/toast/Toast.vue';
import { nextTick } from 'vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import { ToastType } from '@/store/types';

const CLOSE_BUTTON_SELECTOR = getTestingSelector('close-button');
const TOAST_SELECTOR = getTestingSelector('toast');

const createWrapper = buildCreateWrapper(
    Toast,
    {
        message: '',
        type: ToastType.FAIL,
    },
    {
        global: {
            renderStubDefaultSlot: true,
            stubs: {
                Teleport: true,
                Transition: true,
            },
        },
    },
);

describe('Toast', () => {
    beforeAll(async () => {
        await mockInitStore();
        vi.useFakeTimers();
    });

    it('renders message', async () => {
        const wrapper = createWrapper({
            message: 'This is a toast message.',
            type: ToastType.FAIL,
        });

        // Await rendering of HTML which is triggered only after 'mounted' lifecycle-hook
        await nextTick();

        expect(wrapper.text()).toContain('This is a toast message.');

        await wrapper.setProps({ message: 'Another message in the toast.' });

        expect(wrapper.text()).toContain('Another message in the toast.');
    });

    it('has different styles for each type', async () => {
        const wrapper = createWrapper({
            type: ToastType.FAIL,
        });

        await nextTick();

        const failStyles = wrapper.classes();

        await wrapper.setProps({ type: ToastType.SUCCESS });

        const successStyles = wrapper.classes();

        expect(failStyles).not.toBe(successStyles);
    });

    it('hides toast on close button click', async () => {
        const wrapper = createWrapper();

        await nextTick();

        expect(wrapper.find(TOAST_SELECTOR).exists()).toBe(true);

        await wrapper.get<HTMLElement>(CLOSE_BUTTON_SELECTOR).trigger('click');

        await nextTick();

        expect(wrapper.find(TOAST_SELECTOR).exists()).toBe(false);
    });

    it('hides toast after certain time', async () => {
        const wrapper = createWrapper();

        await nextTick();

        expect(wrapper.find(TOAST_SELECTOR).exists()).toBe(true);

        vi.runAllTimers();

        await nextTick();

        expect(wrapper.find(TOAST_SELECTOR).exists()).toBe(false);
    });
});
