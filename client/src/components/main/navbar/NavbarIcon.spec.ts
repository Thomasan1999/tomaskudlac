import {mount} from '@vue/test-utils';
import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';
import mockInitStore from '@/mocks/mockInitStore';

describe('NavbarIcon', () =>
{
    beforeAll(async () =>
    {
        await mockInitStore();
    });

    it('emits \'click\' event on click', async () =>
    {
        const navbarIconWrapper = mount(NavbarIcon, {props: {mode: 'bars'}});

        expect(navbarIconWrapper.emitted().click).toBeUndefined();

        await navbarIconWrapper.trigger('click');

        expect(navbarIconWrapper.emitted().click).toHaveLength(1);
    });

    it('has a class based on \'mode\' property', async () =>
    {
        const navbarIconWrapper = mount(NavbarIcon, {props: {mode: 'bars'}});

        expect(navbarIconWrapper.classes()).toContain('bars');

        await navbarIconWrapper.setProps({mode: 'cross'});

        expect(navbarIconWrapper.classes()).toContain('cross');
    });
});
