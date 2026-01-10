import CookiesModal from '@/components/main/footer/CookiesModal.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const CLOSE_BUTTON_SELECTOR = getTestingSelector('close-button');
const OVERLAY_SELECTOR = getTestingSelector('overlay');

const createWrapper = buildCreateWrapper(CookiesModal, undefined, {
    global: {
        renderStubDefaultSlot: true,
    },
    shallow: true,
});

describe('CookiesModal', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it("emits 'close' event on close button click", async () => {
        const wrapper = createWrapper();

        expect(wrapper.emitted('close')).toBeUndefined();

        await wrapper.get(CLOSE_BUTTON_SELECTOR).trigger('click');

        expect(wrapper.emitted('close')).toHaveLength(1);
    });

    it("emits 'close' event on overlay click", async () => {
        const wrapper = createWrapper();

        expect(wrapper.emitted('close')).toBeUndefined();

        await wrapper.get(OVERLAY_SELECTOR).trigger('click');

        expect(wrapper.emitted('close')).toHaveLength(1);
    });
});
