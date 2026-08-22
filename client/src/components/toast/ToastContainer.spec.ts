import mockInitStore from '@/mocks/mockInitStore';
import useStore from '@/store';
import { ToastType } from '@/store/types';
import { buildCreateWrapper, emitComponentEvent, getTestingSelector } from '@/utils/test';
import ToastContainer from '@/components/toast/ToastContainer.vue';
import Toast from '@/components/toast/Toast.vue';
import { nextTick } from 'vue';
import { enableAutoUnmount } from '@vue/test-utils';

const TOAST_SELECTOR = getTestingSelector('toast');

const createWrapper = buildCreateWrapper(ToastContainer);

describe('ToastContainer', () => {
    let store: ReturnType<typeof useStore>;

    // Every container teleports into the same #modal-container, so a wrapper left mounted would render the store's
    // toasts a second time in the next test.
    enableAutoUnmount(afterEach);

    beforeAll(async () => {
        await mockInitStore();
        store = useStore();
        document.body.innerHTML = '<div id="modal-container"></div>';
    });

    /**
     * A live region only announces content that lands in it while it is already on the page, so the region has to be
     * the container rather than the individual toasts.
     */
    it('announces toasts through a non-atomic live region', () => {
        createWrapper();

        const region = document.body.querySelector(getTestingSelector('toast-container'))!;

        expect(region.getAttribute('aria-live')).toBe('polite');
        expect(region.getAttribute('aria-atomic')).toBe('false');
        expect(region.getAttribute('role')).toBe('status');
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

        store.removeToast(store.toasts[4].id);
        await nextTick();

        expect(document.body.querySelectorAll(TOAST_SELECTOR)).toHaveLength(4);
    });

    /**
     * Toasts used to be rendered by an unkeyed `v-for` and removed by array index. Text content still came out right,
     * because props were patched onto whichever node held the slot - but the node and the component instance behind
     * it were reused, so a surviving toast inherited the dismissed one's lifetime timer and its stacking offset,
     * both of which `Toast` sets up once in `onMounted`.
     *
     * Asserting on node identity is what pins that down: with a key the dismissed toast's node is the one that goes.
     */
    it('keeps the surviving toasts on their own DOM nodes when one is dismissed', async () => {
        store.toasts = [];
        await nextTick();

        createWrapper();

        ['first', 'second', 'third'].forEach((message) => {
            store.addToast({ message, type: ToastType.SUCCESS });
        });
        await nextTick();

        const nodesBefore = Array.from(document.body.querySelectorAll(TOAST_SELECTOR));

        expect(nodesBefore).toHaveLength(3);

        store.removeToast(store.toasts[0].id);
        await nextTick();

        const nodesAfter = Array.from(document.body.querySelectorAll(TOAST_SELECTOR));

        expect(nodesAfter).toEqual([nodesBefore[1], nodesBefore[2]]);
    });

    it('removes toast on toast close', async () => {
        const removeToastSpy = vi.spyOn(store, 'removeToast');

        expect(removeToastSpy).not.toHaveBeenCalled();

        const wrapper = createWrapper();

        const [firstToast, secondToast] = store.toasts;

        await emitComponentEvent(wrapper.findComponent(Toast), 'close');

        expect(removeToastSpy).toHaveBeenNthCalledWith(1, firstToast.id);

        await emitComponentEvent(wrapper.findAllComponents(Toast)[0], 'close');

        expect(removeToastSpy).toHaveBeenNthCalledWith(2, secondToast.id);
    });
});
