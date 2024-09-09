import Toast from '@/components/main/Toast.vue';
import { nextTick } from 'vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, buildSetProps, getTestingSelector } from '@/utils/test';
import { ToastProps } from '@/components/main/types';
import { ToastType } from '@/store/types';

const CLOSE_BUTTON_SELECTOR = getTestingSelector('close-button');
const TOAST_SELECTOR = getTestingSelector('toast');

describe('Toast', () => {
    beforeAll(async () => {
        await mockInitStore();
        document.body.style.setProperty('--primary-red', 'red');
        document.body.style.setProperty('--primary-green', 'green');
        vi.useFakeTimers();
    });

    const createToastWrapper = buildCreateWrapper(
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
    const setProps = buildSetProps<ToastProps>();

    it('renders message', async () => {
        const toastWrapper = createToastWrapper({
            message: 'This is a toast message.',
            type: ToastType.FAIL,
        });

        // Await rendering of HTML which is triggered only after 'mounted' lifecycle-hook
        await nextTick();

        expect(toastWrapper.text()).toContain('This is a toast message.');

        await setProps(toastWrapper, { message: 'Another message in the toast.' });

        expect(toastWrapper.text()).toContain('Another message in the toast.');
    });

    it('has different styles for each type', async () => {
        const toastWrapper = createToastWrapper({
            type: ToastType.FAIL,
        });

        await nextTick();

        const failStyles = toastWrapper.classes();

        await setProps(toastWrapper, { type: ToastType.SUCCESS });

        const successStyles = toastWrapper.classes();

        expect(failStyles).not.toBe(successStyles);
    });

    it('hides toast on close button click', async () => {
        const toastWrapper = createToastWrapper();

        await nextTick();

        expect(toastWrapper.find(TOAST_SELECTOR).exists()).toBe(true);

        await toastWrapper.get<HTMLElement>(CLOSE_BUTTON_SELECTOR).trigger('click');

        await nextTick();

        expect(toastWrapper.find(TOAST_SELECTOR).exists()).toBe(false);
    });

    it('hides toast after certain time', async () => {
        const toastWrapper = createToastWrapper();

        await nextTick();

        expect(toastWrapper.find(TOAST_SELECTOR).exists()).toBe(true);

        vi.runAllTimers();

        await nextTick();

        expect(toastWrapper.find(TOAST_SELECTOR).exists()).toBe(false);
    });
});
