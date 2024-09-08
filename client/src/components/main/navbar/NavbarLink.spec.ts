import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import { RouterLink } from 'vue-router';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { NavbarLinkProps } from '@/components/main/navbar/types';

describe('NavbarLink', () => {
    const createNavbarLink = buildCreateWrapper<NavbarLinkProps>(
        NavbarLink,
        {
            title: 'Link',
            to: '/',
        },
        {
            global: {
                stubs: {
                    RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"></a>' },
                },
            },
        },
    );
    const setProps = buildSetProps<NavbarLinkProps>();

    it("has 'active' class based on 'active' property", async () => {
        const navbarLinkWrapper = createNavbarLink({ active: false });

        expect(navbarLinkWrapper.classes()).not.toContain('active');

        await setProps(navbarLinkWrapper, { active: true });

        expect(navbarLinkWrapper.classes()).toContain('active');
    });

    it("includes 'RouterLink' component if 'routerLink' property is set to true", async () => {
        const navbarLinkWrapper = createNavbarLink({ routerLink: false });

        expect(navbarLinkWrapper.findComponent(RouterLink).exists()).toBe(false);

        await setProps(navbarLinkWrapper, { routerLink: true });

        expect(navbarLinkWrapper.findComponent(RouterLink).exists()).toBe(true);
    });

    it("uses 'text' property as default slot if defined", async () => {
        const navbarLinkWrapper = createNavbarLink({ text: 'Hello World' });

        expect(navbarLinkWrapper.text()).toContain('Hello World');

        await setProps(navbarLinkWrapper, { text: 'Link Text' });

        expect(navbarLinkWrapper.text()).toContain('Link Text');
    });

    it("uses 'title' property as default slot if text is not defined", async () => {
        const navbarLinkWrapper = createNavbarLink({ title: 'Random Title' });

        expect(navbarLinkWrapper.text()).toContain('Random Title');

        await setProps(navbarLinkWrapper, { text: 'Another Name' });

        expect(navbarLinkWrapper.text()).toContain('Another Name');
    });

    it("uses 'to' property as href", async () => {
        function expectHrefToBe(value: string): void {
            expect(navbarLinkWrapper.get('a').attributes().href).toBe(value);
        }

        const navbarLinkWrapper = createNavbarLink({ to: '/' });

        expectHrefToBe('/');

        await setProps(navbarLinkWrapper, { to: '/route' });

        expectHrefToBe('/route');

        await setProps(navbarLinkWrapper, { routerLink: true });

        expectHrefToBe('/route');
    });

    it('renders default slot if defined', () => {
        function expectSlotTextToBe(text: string): void {
            const navbarLinkWrapper = createNavbarLink(
                { title: 'Title', text: 'Text' },
                { slots: { default: `<p class="slot">${text}</p>` } },
            );

            expect(navbarLinkWrapper.get('.slot').text()).toBe(text);
        }

        expectSlotTextToBe('First Text');
        expectSlotTextToBe('Another Text');
    });
});
