import mockInitStore from '@/mocks/mockInitStore';
import AboutMyself from '@/components/main/about-myself/AboutMyself.vue';
import useStore from '@/store';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
import { buildCreateWrapper } from '@/utils/test';

describe('AboutMyself', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createWrapper = buildCreateWrapper(AboutMyself, undefined, {
        global: { stubs: ['AboutMyselfColumn'] },
    });

    it('has heading', () => {
        const wrapper = createWrapper();

        const headingElement = wrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(true);
    });

    it('renders all columns', () => {
        const store = useStore();

        const wrapper = createWrapper();

        const columnLength = store.locales.sections.aboutMyself.columns.length;

        const columnComponents = wrapper.findAllComponents(AboutMyselfColumn);

        expect(columnComponents.length).toBeGreaterThan(0);
        expect(columnComponents.length).toBe(columnLength);
    });
});
