import mockInitStore from '@/mocks/mockInitStore';
import Contact from '@/components/main/contact/Contact.vue';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const BRIEF_TEXT_SELECTOR = getTestingSelector('brief-text');

describe('Contact', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createWrapper = buildCreateWrapper(Contact, undefined, {
        global: {
            stubs: ['ContactForm'],
        },
    });

    it('has heading', () => {
        const wrapper = createWrapper();

        const headingElement = wrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(true);
    });

    it('renders brief text', () => {
        const wrapper = createWrapper();

        const briefTextElement = wrapper.find(BRIEF_TEXT_SELECTOR);

        expect(briefTextElement.exists()).toBe(true);
    });
});
