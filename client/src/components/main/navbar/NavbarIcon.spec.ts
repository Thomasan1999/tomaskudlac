import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper } from '@/utils/test';

const createWrapper = buildCreateWrapper(NavbarIcon);

describe('NavbarIcon', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it("emits 'click' event on click", async () => {
        const wrapper = createWrapper({ mode: 'bars' });

        expect(wrapper.emitted().click).toBeUndefined();

        await wrapper.trigger('click');

        expect(wrapper.emitted().click).toHaveLength(1);
    });

    it("has a class based on 'mode' property", async () => {
        const wrapper = createWrapper({ mode: 'bars' });

        expect(wrapper.classes()).toContain('bars');

        await wrapper.setProps({ mode: 'cross' });

        expect(wrapper.classes()).toContain('cross');
    });
});
