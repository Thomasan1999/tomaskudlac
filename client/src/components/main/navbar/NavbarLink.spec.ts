import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import { RouterLink } from 'vue-router';
import { buildCreateWrapper } from '@/utils/test';
import { FontWeight } from '@/types/components';

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

describe('NavbarLink', () => {
    it("has different background color and default cursor when 'active' property is true", async () => {
        const wrapper = createWrapper({ active: false });

        expect(wrapper.classes('cursor-default')).toBe(false);
        expect(wrapper.classes('bg-navbar-link-active')).toBe(false);

        await wrapper.setProps({ active: true });

        expect(wrapper.classes('cursor-default')).toBe(true);
        expect(wrapper.classes('bg-navbar-link-active')).toBe(true);
    });

    it("includes 'RouterLink' component if 'routerLink' property is set to true", async () => {
        const wrapper = createWrapper({ routerLink: false });

        expect(wrapper.findComponent(RouterLink).exists()).toBe(false);

        await wrapper.setProps({ routerLink: true });

        expect(wrapper.findComponent(RouterLink).exists()).toBe(true);
    });

    it("uses 'text' property as default slot if defined", async () => {
        const wrapper = createWrapper({ text: 'Hello World' });

        expect(wrapper.text()).toContain('Hello World');

        await wrapper.setProps({ text: 'Link Text' });

        expect(wrapper.text()).toContain('Link Text');
    });

    it("uses 'title' property as default slot if text is not defined", async () => {
        const wrapper = createWrapper({ title: 'Random Title' });

        expect(wrapper.text()).toContain('Random Title');

        await wrapper.setProps({ text: 'Another Name' });

        expect(wrapper.text()).toContain('Another Name');
    });

    it("uses 'to' property as href", async () => {
        function expectHrefToBe(value: string): void {
            expect(wrapper.get('a').attributes().href).toBe(value);
        }

        const wrapper = createWrapper({ to: '/' });

        expectHrefToBe('/');

        await wrapper.setProps({ to: '/route' });

        expectHrefToBe('/route');

        await wrapper.setProps({ routerLink: true });

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

    it("assigns a class based on 'fontWeight' property", async () => {
        const wrapper = createWrapper({ fontWeight: FontWeight.NORMAL });

        expect(wrapper.classes('font-normal')).toBe(true);

        await wrapper.setProps({ fontWeight: FontWeight.LIGHT });

        expect(wrapper.classes('font-light')).toBe(true);
    });
});
