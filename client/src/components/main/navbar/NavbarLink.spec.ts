import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import { RouterLink } from 'vue-router';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { NavbarLinkProps } from '@/components/main/navbar/types';

describe('NavbarLink', () => {
    const createWrapper = buildCreateWrapper(
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
        const wrapper = createWrapper({ active: false });

        expect(wrapper.classes()).not.toContain('active');

        await setProps(wrapper, { active: true });

        expect(wrapper.classes()).toContain('active');
    });

    it("includes 'RouterLink' component if 'routerLink' property is set to true", async () => {
        const wrapper = createWrapper({ routerLink: false });

        expect(wrapper.findComponent(RouterLink).exists()).toBe(false);

        await setProps(wrapper, { routerLink: true });

        expect(wrapper.findComponent(RouterLink).exists()).toBe(true);
    });

    it("uses 'text' property as default slot if defined", async () => {
        const wrapper = createWrapper({ text: 'Hello World' });

        expect(wrapper.text()).toContain('Hello World');

        await setProps(wrapper, { text: 'Link Text' });

        expect(wrapper.text()).toContain('Link Text');
    });

    it("uses 'title' property as default slot if text is not defined", async () => {
        const wrapper = createWrapper({ title: 'Random Title' });

        expect(wrapper.text()).toContain('Random Title');

        await setProps(wrapper, { text: 'Another Name' });

        expect(wrapper.text()).toContain('Another Name');
    });

    it("uses 'to' property as href", async () => {
        function expectHrefToBe(value: string): void {
            expect(wrapper.get('a').attributes().href).toBe(value);
        }

        const wrapper = createWrapper({ to: '/' });

        expectHrefToBe('/');

        await setProps(wrapper, { to: '/route' });

        expectHrefToBe('/route');

        await setProps(wrapper, { routerLink: true });

        expectHrefToBe('/route');
    });

    it('renders default slot if defined', () => {
        function expectSlotTextToBe(text: string): void {
            const wrapper = createWrapper(
                { title: 'Title', text: 'Text' },
                { slots: { default: `<p class="slot">${text}</p>` } },
            );

            expect(wrapper.get('.slot').text()).toBe(text);
        }

        expectSlotTextToBe('First Text');
        expectSlotTextToBe('Another Text');
    });
});
