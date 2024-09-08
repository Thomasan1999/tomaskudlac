import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { NavbarIconProps } from '@/components/main/navbar/types';

describe('NavbarIcon', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createNavbarIconWrapper = buildCreateWrapper<NavbarIconProps>(NavbarIcon);
    const setProps = buildSetProps<NavbarIconProps>();

    it("emits 'click' event on click", async () => {
        const navbarIconWrapper = createNavbarIconWrapper({ mode: 'bars' });

        expect(navbarIconWrapper.emitted().click).toBeUndefined();

        await navbarIconWrapper.trigger('click');

        expect(navbarIconWrapper.emitted().click).toHaveLength(1);
    });

    it("has a class based on 'mode' property", async () => {
        const navbarIconWrapper = createNavbarIconWrapper({ mode: 'bars' });

        expect(navbarIconWrapper.classes()).toContain('bars');

        await setProps(navbarIconWrapper, { mode: 'cross' });

        expect(navbarIconWrapper.classes()).toContain('cross');
    });
});
