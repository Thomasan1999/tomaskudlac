import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { NavbarSocialNetworkProps } from '@/components/main/navbar/types';

describe('NavbarSocialNetwork', () => {
    beforeAll(() => {
        library.add(faEnvelope, faTimes);
    });

    const createNavbarSocialNetwork = buildCreateWrapper(
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
        const navbarSocialNetworkWrapper = createNavbarSocialNetwork({ icon: ['fas', 'times'] });

        const fasTimesHtml = navbarSocialNetworkWrapper.html();

        await setProps(navbarSocialNetworkWrapper, { icon: ['fas', 'envelope'] });

        const fasEnvelopeHtml = navbarSocialNetworkWrapper.html();

        expect(fasTimesHtml).not.toBe(fasEnvelopeHtml);
    });

    it("renders 'title' property", async () => {
        const navbarSocialNetworkWrapper = createNavbarSocialNetwork({ title: 'Some Title' });

        expect(navbarSocialNetworkWrapper.attributes('title')).toBe('Some Title');

        await setProps(navbarSocialNetworkWrapper, { title: 'Another Title' });

        expect(navbarSocialNetworkWrapper.attributes('title')).toBe('Another Title');
    });

    it("uses 'to' property as href", async () => {
        const navbarSocialNetworkWrapper = createNavbarSocialNetwork({ to: '/' });

        expect(navbarSocialNetworkWrapper.attributes('href')).toBe('/');

        await setProps(navbarSocialNetworkWrapper, { to: '/route' });

        expect(navbarSocialNetworkWrapper.attributes('href')).toBe('/route');
    });
});
