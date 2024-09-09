import mockInitStore from '@/mocks/mockInitStore';
import ContactFormFieldError from '@/components/main/contact/form/ContactFormFieldError.vue';
import { buildCreateWrapper } from '@/utils/test';

describe('ContactFormFieldError', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createWrapper = buildCreateWrapper(ContactFormFieldError, {
        error: '',
    });

    it("does display message only if 'error' property is not empty", async () => {
        const wrapper = createWrapper({ error: '' });

        expect(wrapper.find('div').exists()).toBe(false);

        await wrapper.setProps({ error: 'empty' });

        expect(wrapper.find('div').exists()).toBe(true);
    });
});
