import mockInitStore from '@/mocks/mockInitStore';
import ContactFormFieldError from '@/components/main/contact/form/ContactFormFieldError.vue';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { ContactFormFieldErrorProps } from '@/components/main/contact/form/types';

describe('ContactFormFieldError', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createContactFormFieldErrorWrapper = buildCreateWrapper(ContactFormFieldError, {
        error: '',
    });
    const setProps = buildSetProps<ContactFormFieldErrorProps>();

    it("does display message only if 'error' property is not empty", async () => {
        const wrapper = createContactFormFieldErrorWrapper({ error: '' });

        expect(wrapper.find('div').exists()).toBe(false);

        await setProps(wrapper, { error: 'empty' });

        expect(wrapper.find('div').exists()).toBe(true);
    });
});
