import CookiesModal from '@/components/main/footer/CookiesModal.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const CLOSE_BUTTON_SELECTOR = getTestingSelector('closeButton');
const OVERLAY_SELECTOR = getTestingSelector('overlay');

describe('CookiesModal', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createCookiesModalWrapper = buildCreateWrapper(CookiesModal, undefined, {
        global: {
            renderStubDefaultSlot: true,
        },
        shallow: true,
    });

    it("emits 'close' event on close button click", async () => {
        const cookiesModalWrapper = createCookiesModalWrapper();

        expect(cookiesModalWrapper.emitted().close).toBeUndefined();

        await cookiesModalWrapper.get(CLOSE_BUTTON_SELECTOR).trigger('click');

        expect(cookiesModalWrapper.emitted().close).toHaveLength(1);
    });

    it("emits 'close' event on overlay click", async () => {
        const cookiesModalWrapper = createCookiesModalWrapper();

        expect(cookiesModalWrapper.emitted().close).toBeUndefined();

        await cookiesModalWrapper.get(OVERLAY_SELECTOR).trigger('click');

        expect(cookiesModalWrapper.emitted().close).toHaveLength(1);
    });
});
