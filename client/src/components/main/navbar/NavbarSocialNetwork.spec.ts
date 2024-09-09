import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { buildCreateWrapper } from '@/utils/test';

describe('NavbarSocialNetwork', () => {
    beforeAll(() => {
        library.add(faEnvelope, faTimes);
    });

    const createWrapper = buildCreateWrapper(
        NavbarSocialNetwork,
        {
            icon: ['', ''],
            title: 'Title',
            to: '/',
        },
        {
            global: {
                stubs: ['FontAwesomeIcon'],
            },
        },
    );

    it("renders different icons for different 'icon' property value", async () => {
        const wrapper = createWrapper({ icon: ['fas', 'times'] });

        const fasTimesHtml = wrapper.html();

        await wrapper.setProps({ icon: ['fas', 'envelope'] });

        const fasEnvelopeHtml = wrapper.html();

        expect(fasTimesHtml).not.toBe(fasEnvelopeHtml);
    });

    it("renders 'title' property", async () => {
        const wrapper = createWrapper({ title: 'Some Title' });

        expect(wrapper.attributes('title')).toBe('Some Title');

        await wrapper.setProps({ title: 'Another Title' });

        expect(wrapper.attributes('title')).toBe('Another Title');
    });

    it("uses 'to' property as href", async () => {
        const wrapper = createWrapper({ to: '/' });

        expect(wrapper.attributes('href')).toBe('/');

        await wrapper.setProps({ to: '/route' });

        expect(wrapper.attributes('href')).toBe('/route');
    });
});
