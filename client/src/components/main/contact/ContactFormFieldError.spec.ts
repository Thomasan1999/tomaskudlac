import { Pinia } from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import { mount, MountingOptions, VueWrapper } from '@vue/test-utils';
import ContactFormFieldError from '@/components/main/contact/ContactFormFieldError.vue';

describe('ContactFormFieldError', () => {
    let pinia: Pinia;

    beforeAll(async () => {
        pinia = await mockInitStore();
    });

    function createContactFormFieldErrorWrapper(props: MountingOptions<any>['props'] = {}): VueWrapper {
        const defaultProps = {
            error: '',
        };

        return mount(ContactFormFieldError, {
            global: {
                plugins: [pinia],
            },
            props: {
                ...defaultProps,
                ...props,
            },
        });
    }

    it("does display message only if 'error' property is not empty", async () => {
        const wrapper = createContactFormFieldErrorWrapper({ error: '' });

        expect(wrapper.find('div').exists()).toBe(false);

        await wrapper.setProps({ error: 'empty' });

        expect(wrapper.find('div').exists()).toBe(true);
    });
});
