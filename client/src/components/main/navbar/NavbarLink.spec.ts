import {mount, MountingOptions, VueWrapper} from '@vue/test-utils';
import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import {RouterLink} from 'vue-router';

describe('NavbarLink', () =>
{
    function createNavbarLink(
        props: MountingOptions<any>['props'] = {},
        slots?: MountingOptions<any>['slots']
    ): VueWrapper
    {
        const defaultProps = {
            title: 'Link',
            to: '/'
        };

        return mount(NavbarLink, {
            global: {
                stubs: {
                    'RouterLink': {name: 'RouterLink', props: ['to'], template: '<a :href="to"></a>'}
                }
            },
            props: {...defaultProps, ...props},
            slots
        });
    }

    it('has \'active\' class based on \'active\' property', async () =>
    {
        const navbarLinkWrapper = createNavbarLink({active: false});

        expect(navbarLinkWrapper.classes()).not.toContain('active');

        await navbarLinkWrapper.setProps({active: true});

        expect(navbarLinkWrapper.classes()).toContain('active');
    });

    it('includes \'RouterLink\' component if \'routerLink\' property is set to true', async () =>
    {
        const navbarLinkWrapper = createNavbarLink({routerLink: false});

        expect(navbarLinkWrapper.findComponent(RouterLink).exists()).toBe(false);

        await navbarLinkWrapper.setProps({routerLink: true});

        expect(navbarLinkWrapper.findComponent(RouterLink).exists()).toBe(true);
    });

    it('uses \'text\' property as default slot if defined', async () =>
    {
        const navbarLinkWrapper = createNavbarLink({text: 'Hello World'});

        expect(navbarLinkWrapper.text()).toContain('Hello World');

        await navbarLinkWrapper.setProps({text: 'Link Text'});

        expect(navbarLinkWrapper.text()).toContain('Link Text');
    });

    it('uses \'title\' property as default slot if text is not defined', async () =>
    {
        const navbarLinkWrapper = createNavbarLink({title: 'Random Title'});

        expect(navbarLinkWrapper.text()).toContain('Random Title');

        await navbarLinkWrapper.setProps({text: 'Another Name'});

        expect(navbarLinkWrapper.text()).toContain('Another Name');
    });

    it('uses \'to\' property as href', async () =>
    {
        function expectHrefToBe(value: string): void
        {
            expect(navbarLinkWrapper.get('a').attributes().href).toBe(value);
        }

        const navbarLinkWrapper = createNavbarLink({to: '/'});

        expectHrefToBe('/');

        await navbarLinkWrapper.setProps({to: '/route'});

        expectHrefToBe('/route');

        await navbarLinkWrapper.setProps({routerLink: true});

        expectHrefToBe('/route');
    });

    it('renders default slot if defined', () =>
    {
        function expectSlotTextToBe(text: string): void
        {
            const navbarLinkWrapper = createNavbarLink(
                {title: 'Title', text: 'Text'},
                {default: `<p class="slot">${text}</p>`}
            );

            expect(navbarLinkWrapper.get('.slot').text()).toBe(text);
        }

        expectSlotTextToBe('First Text');
        expectSlotTextToBe('Another Text');
    });
});
