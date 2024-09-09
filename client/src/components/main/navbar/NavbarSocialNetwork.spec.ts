import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { NavbarSocialNetworkProps } from '@/components/main/navbar/types';

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
    const setProps = buildSetProps<NavbarSocialNetworkProps>();

    it("renders different icons for different 'icon' property value", async () => {
        const wrapper = createWrapper({ icon: ['fas', 'times'] });

        const fasTimesHtml = wrapper.html();

        await setProps(wrapper, { icon: ['fas', 'envelope'] });

        const fasEnvelopeHtml = wrapper.html();

        expect(fasTimesHtml).not.toBe(fasEnvelopeHtml);
    });

    it("renders 'title' property", async () => {
        const wrapper = createWrapper({ title: 'Some Title' });

        expect(wrapper.attributes('title')).toBe('Some Title');

        await setProps(wrapper, { title: 'Another Title' });

        expect(wrapper.attributes('title')).toBe('Another Title');
    });

    it("uses 'to' property as href", async () => {
        const wrapper = createWrapper({ to: '/' });

        expect(wrapper.attributes('href')).toBe('/');

        await setProps(wrapper, { to: '/route' });

        expect(wrapper.attributes('href')).toBe('/route');
    });
});
