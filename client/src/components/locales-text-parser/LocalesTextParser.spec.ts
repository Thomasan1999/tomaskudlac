import LocalesTextParser from '@/components/locales-text-parser/LocalesTextParser.vue';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const createWrapper = buildCreateWrapper(LocalesTextParser);

describe('LocalesTextParser', () => {
    it('replaces placeholders with passed slots', () => {
        const wrapper = createWrapper(
            { tag: 'p', text: 'Try some {{placeholder}}. Nice {{lorem}}.' },
            {
                slots: {
                    placeholder: '<span data-testid="something">placeholder</span>',
                    lorem: '<div data-testid="ipsum">amet</div>',
                },
            },
        );

        expect(wrapper.text().startsWith('Try some ')).toBe(true);
        expect(wrapper.text().endsWith('.')).toBe(true);
        expect(wrapper.find(getTestingSelector('something')).exists()).toBe(true);
        expect(wrapper.find(getTestingSelector('something')).text()).toBe('placeholder');
        expect(wrapper.find(getTestingSelector('ipsum')).exists()).toBe(true);
        expect(wrapper.find(getTestingSelector('ipsum')).text()).toBe('amet');
    });

    it('replaces asterisks with strong tags', async () => {
        const wrapper = createWrapper({ tag: 'p', text: 'There is an *important text*.' });

        expect(wrapper.find('strong').text()).toBe('important text');

        await wrapper.setProps({ text: 'Lorem *ipsum dolor*' });

        expect(wrapper.find('strong').text()).toBe('ipsum dolor');
    });

    it('works with placeholders inside asterisks', () => {
        const wrapper = createWrapper(
            { tag: 'p', text: 'Try some *important {{placeholder}}*. Nice *{{lorem}}*.' },
            {
                slots: {
                    placeholder: '<span data-testid="something">placeholder</span>',
                    lorem: '<div data-testid="ipsum">amet</div>',
                },
            },
        );

        expect(wrapper.findAll('strong')).toHaveLength(2);
        expect(wrapper.findAll('strong')[0].text()).toBe('important placeholder');
        expect(wrapper.findAll('strong')[1].text()).toBe('amet');
    });
});
