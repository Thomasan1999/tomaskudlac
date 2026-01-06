import mockInitStore from '@/mocks/mockInitStore';
import ContactBriefText from '@/components/main/contact/ContactBriefText.vue';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const PHONE_NUMBER_LINK_SELECTOR = getTestingSelector('phone-number-link');

const createWrapper = buildCreateWrapper(ContactBriefText);

describe('ContactBriefText', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('renders phone number link', () => {
        const wrapper = createWrapper();

        const phoneNumberLink = wrapper.find(PHONE_NUMBER_LINK_SELECTOR);

        expect(phoneNumberLink.exists()).toBe(true);
    });
});
