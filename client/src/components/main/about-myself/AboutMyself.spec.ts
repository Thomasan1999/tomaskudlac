import mockInitStore from '@/mocks/mockInitStore';
import AboutMyself from '@/components/main/about-myself/AboutMyself.vue';
import useStore from '@/store';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';
import { buildCreateWrapper } from '@/utils/test';

describe('AboutMyself', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createAboutMyselfWrapper = buildCreateWrapper(AboutMyself, undefined, {
        global: { stubs: ['AboutMyselfColumn'] },
    });

    it('has heading', () => {
        const aboutMyselfWrapper = createAboutMyselfWrapper();

        const headingElement = aboutMyselfWrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(true);
    });

    it('renders all columns', () => {
        const store = useStore();

        const aboutMyselfWrapper = createAboutMyselfWrapper();

        const columnLength = store.locales.sections.aboutMyself.columns.length;

        const columnComponents = aboutMyselfWrapper.findAllComponents(AboutMyselfColumn);

        expect(columnComponents.length).toBeGreaterThan(0);
        expect(columnComponents.length).toBe(columnLength);
    });
});
