import {mount, VueWrapper} from '@vue/test-utils';
import {ComponentPublicInstance} from 'vue';
import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import Contact from '@/components/main/contact/Contact.vue';

describe('Contact', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    function createContactWrapper(): VueWrapper<ComponentPublicInstance>
    {
        return mount(Contact, {
            global: {
                plugins: [pinia],
                stubs: ['ContactForm']
            }
        });
    }

    it('has heading', () =>
    {
        const contactWrapper = createContactWrapper();

        const headingElement = contactWrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(true);
    });

    it('renders brief text', () =>
    {
        const contactWrapper = createContactWrapper();

        const briefTextElement = contactWrapper.find('[data-testid="briefText"]');

        expect(briefTextElement.exists()).toBe(true);
    });
});
