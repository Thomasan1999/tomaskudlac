import CookiesModal from '@/components/main/footer/CookiesModal.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper } from '@/utils/test';

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

        await cookiesModalWrapper.get('[data-testid="closeButton"]').trigger('click');

        expect(cookiesModalWrapper.emitted().close).toHaveLength(1);
    });

    it("emits 'close' event on overlay click", async () => {
        const cookiesModalWrapper = createCookiesModalWrapper();

        expect(cookiesModalWrapper.emitted().close).toBeUndefined();

        await cookiesModalWrapper.get('[data-testid="overlay"]').trigger('click');

        expect(cookiesModalWrapper.emitted().close).toHaveLength(1);
    });
});
