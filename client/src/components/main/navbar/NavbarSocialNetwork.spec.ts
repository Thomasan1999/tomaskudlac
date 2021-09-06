import {mount, MountingOptions, VueWrapper} from '@vue/test-utils';
import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
import {ComponentPublicInstance} from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faTimes} from '@fortawesome/free-solid-svg-icons';

describe('NavbarSocialNetwork', () =>
{
    beforeAll(() =>
    {
        library.add(faEnvelope, faTimes);
    });

    function createNavbarSocialNetwork(props: MountingOptions<any>['props'] = {}): VueWrapper<ComponentPublicInstance>
    {
        const defaultProps = {
            icon: [],
            title: 'Title',
            to: '/'
        };

        return mount(NavbarSocialNetwork, {
            global: {
                components: {
                    FontAwesomeIcon: props.icon ? FontAwesomeIcon : {template: '<div></div>'}
                }
            },
            props: {
                ...defaultProps,
                ...props
            }
        });
    }

    it('renders different icons for different \'icon\' property value', async () =>
    {
        const navbarSocialNetworkWrapper = createNavbarSocialNetwork({icon: ['fas', 'times']});

        const fasTimesHtml = navbarSocialNetworkWrapper.html();

        await navbarSocialNetworkWrapper.setProps({icon: ['fas', 'envelope']});

        const fasEnvelopeHtml = navbarSocialNetworkWrapper.html();

        expect(fasTimesHtml).not.toBe(fasEnvelopeHtml);
    });

    it('renders \'title\' property', async () =>
    {
        const navbarSocialNetworkWrapper = createNavbarSocialNetwork({title: 'Some Title'});

        expect(navbarSocialNetworkWrapper.attributes().title).toBe('Some Title');

        await navbarSocialNetworkWrapper.setProps({title: 'Another Title'});

        expect(navbarSocialNetworkWrapper.attributes().title).toBe('Another Title');
    });

    it('uses \'to\' property as href', async () =>
    {
        const navbarSocialNetworkWrapper = createNavbarSocialNetwork({to: '/'});

        expect(navbarSocialNetworkWrapper.attributes().href).toBe('/');

        await navbarSocialNetworkWrapper.setProps({to: '/route'});

        expect(navbarSocialNetworkWrapper.attributes().href).toBe('/route');
    });
});
