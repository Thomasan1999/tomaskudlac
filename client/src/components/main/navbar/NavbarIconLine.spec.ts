import NavbarIconLine from '@/components/main/navbar/NavbarIconLine.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper } from '@/utils/test';
import { NavbarIconMode } from '@/components/main/navbar/types';

const createWrapper = buildCreateWrapper(NavbarIconLine);

describe('NavbarIconLine', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it("has a class based on 'mode' property", async () => {
        const barsIcon = createWrapper({ mode: NavbarIconMode.BARS });
        const crossIcon = createWrapper({ mode: NavbarIconMode.CROSS });

        expect(barsIcon.classes()).not.toBe(crossIcon.classes());
    });
});
