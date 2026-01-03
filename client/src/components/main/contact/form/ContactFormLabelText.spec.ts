import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import ContactFormLabelText from '@/components/main/contact/form/ContactFormLabelText.vue';
import mockInitStore from '@/mocks/mockInitStore';

const LABEL_TEXT_SELECTOR = getTestingSelector('label-text');
const REQUIRED_SELECTOR = getTestingSelector('required');

const createWrapper = buildCreateWrapper(
    ContactFormLabelText,
    {
        fieldRequired: false,
        text: '',
    },
    {
        attachTo: document.body,
    },
);

describe('ContactFormLabelText', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('renders label text', async () => {
        let text = 'Field label';

        const wrapper = createWrapper({ text });

        const labelElement = wrapper.get(LABEL_TEXT_SELECTOR);

        expect(labelElement.text()).toContain(text);

        text = 'Something different';

        await wrapper.setProps({ text });

        expect(labelElement.text()).toContain(text);
    });

    it('shows required only when the property is set to "true"', async () => {
        const wrapper = createWrapper({ fieldRequired: false });

        expect(wrapper.get(REQUIRED_SELECTOR).isVisible()).toBe(false);

        await wrapper.setProps({ fieldRequired: true });

        expect(wrapper.get(REQUIRED_SELECTOR).isVisible()).toBe(true);
    });
});
