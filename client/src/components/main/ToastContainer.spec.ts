import mockInitStore from '@/mocks/mockInitStore';
import type { Pinia } from 'pinia';
import useStore from '@/store';
import { ToastType } from '@/store/types';
import { buildCreateWrapper, emitComponentEvent, getTestingSelector } from '@/utils/test';
import ToastContainer from '@/components/main/ToastContainer.vue';
import Toast from '@/components/main/Toast.vue';
import { nextTick } from 'vue';

const TOAST_SELECTOR = getTestingSelector('toast');

describe('ToastContainer', () => {
    let pinia: Pinia;
    let store: ReturnType<typeof useStore>;
    let createWrapper: ReturnType<typeof buildCreateWrapper<never, typeof ToastContainer>>;

    beforeAll(async () => {
        pinia = await mockInitStore();
        store = useStore();
        createWrapper = buildCreateWrapper(ToastContainer, undefined, {
            global: {
                plugins: [pinia],
            },
        });
        document.body.innerHTML = '<div id="modal-container"></div>';
    });

    it('displays all toasts', async () => {
        createWrapper();

        expect(document.body.querySelectorAll(TOAST_SELECTOR)).toHaveLength(0);

        store.addToast({ message: '', type: ToastType.SUCCESS });
        store.addToast({ message: '', type: ToastType.SUCCESS });
        store.addToast({ message: '', type: ToastType.SUCCESS });
        await nextTick();

        expect(document.body.querySelectorAll(TOAST_SELECTOR)).toHaveLength(3);

        store.addToast({ message: '', type: ToastType.FAIL });
        store.addToast({ message: '', type: ToastType.FAIL });
        await nextTick();

        expect(document.body.querySelectorAll(TOAST_SELECTOR)).toHaveLength(5);

        store.removeToast(4);
        await nextTick();

        expect(document.body.querySelectorAll(TOAST_SELECTOR)).toHaveLength(4);
    });

    it('removes toast on toast close', async () => {
        const removeToastSpy = vi.spyOn(store, 'removeToast');

        expect(removeToastSpy).not.toHaveBeenCalled();

        const wrapper = createWrapper();

        await emitComponentEvent(wrapper.findComponent(Toast), 'close');

        expect(removeToastSpy).toHaveBeenNthCalledWith(1, 0);

        await emitComponentEvent(wrapper.findAllComponents(Toast)[1], 'close');

        expect(removeToastSpy).toHaveBeenNthCalledWith(2, 1);
    });
});
