import ToastCloseButton from '@/components/toast/ToastCloseButton.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const CLOSE_BUTTON_SELECTOR = getTestingSelector('close-button');

const createWrapper = buildCreateWrapper(ToastCloseButton);

describe('ToastCloseButton', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it("emits 'click' event on click", async () => {
        const wrapper = createWrapper();

        expect(wrapper.emitted('click')).toBeUndefined();

        await wrapper.get<HTMLElement>(CLOSE_BUTTON_SELECTOR).trigger('click');

        expect(wrapper.emitted('click')).toHaveLength(1);
    });
});
