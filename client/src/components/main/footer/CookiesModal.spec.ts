import CookiesModal from '@/components/main/footer/CookiesModal.vue';
import { shallowMount, VueWrapper } from '@vue/test-utils';
import mockInitStore from '@/mocks/mockInitStore';
import { Pinia } from 'pinia';

describe('CookiesModal', () => {
    let pinia: Pinia;

    beforeAll(async () => {
        pinia = await mockInitStore();
    });

    function createCookiesModalWrapper(): VueWrapper {
        return shallowMount(CookiesModal, {
            global: {
                plugins: [pinia],
                renderStubDefaultSlot: true,
            },
        });
    }

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
