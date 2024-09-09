import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import ContactFormBottomPart from '@/components/main/contact/form/ContactFormBottomPart.vue';

const REQUIRED_LEGEND_SELECTOR = getTestingSelector('required-legend');
const SUBMIT_BUTTON_SELECTOR = getTestingSelector('submit-button');

const createWrapper = buildCreateWrapper(ContactFormBottomPart, {
    formValid: false,
    submitDisabled: false,
});

describe('ContactFormBottomPart', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('renders required legend', () => {
        const wrapper = createWrapper();

        expect(wrapper.find(REQUIRED_LEGEND_SELECTOR).exists()).toBe(true);
    });

    it('disables button by "submitDisabled" property', async () => {
        const wrapper = createWrapper({ submitDisabled: false });

        expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).attributes('disabled')).toBeUndefined();

        await wrapper.setProps({ submitDisabled: true });

        expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).attributes('disabled')).toBeDefined();
    });

    it('sets button title by "formValid" property', async () => {
        const wrapper = createWrapper({ formValid: false });

        const formValidTitle = wrapper.find(SUBMIT_BUTTON_SELECTOR).attributes('title');

        await wrapper.setProps({ formValid: true });

        expect(wrapper.find(SUBMIT_BUTTON_SELECTOR).attributes('title')).not.toBe(formValidTitle);
    });
});
