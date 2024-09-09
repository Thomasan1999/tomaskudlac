import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { NavbarIconProps } from '@/components/main/navbar/types';

describe('NavbarIcon', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createWrapper = buildCreateWrapper(NavbarIcon);
    const setProps = buildSetProps<NavbarIconProps>();

    it("emits 'click' event on click", async () => {
        const wrapper = createWrapper({ mode: 'bars' });

        expect(wrapper.emitted().click).toBeUndefined();

        await wrapper.trigger('click');

        expect(wrapper.emitted().click).toHaveLength(1);
    });

    it("has a class based on 'mode' property", async () => {
        const wrapper = createWrapper({ mode: 'bars' });

        expect(wrapper.classes()).toContain('bars');

        await setProps(wrapper, { mode: 'cross' });

        expect(wrapper.classes()).toContain('cross');
    });
});
