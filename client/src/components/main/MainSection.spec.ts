import MainSection from '@/components/main/MainSection.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { MainSectionProps } from '@/components/main/types';

describe('MainSection', () => {
    const headingSelector = 'h1, h2, h3, h4, h5, h6';

    beforeAll(async () => {
        await mockInitStore();
    });

    const createMainSectionWrapper = buildCreateWrapper<MainSectionProps>(MainSection, {
        name: 'home',
    });
    const setProps = buildSetProps<MainSectionProps>();

    it("adds/removes heading element depending on the 'heading' property", async () => {
        const mainSectionWrapper = createMainSectionWrapper({ heading: false });

        function expectHeadingToExist(expected: boolean): void {
            expect(mainSectionWrapper.find(headingSelector).exists()).toBe(expected);
        }

        expectHeadingToExist(false);

        await setProps(mainSectionWrapper, { heading: true });

        expectHeadingToExist(true);
    });

    it("derives 'id' from the 'name' property", async () => {
        const mainSectionWrapper = createMainSectionWrapper({ name: 'home' });

        function getId(): string {
            return mainSectionWrapper.attributes().id;
        }

        const homeId = getId();

        await setProps(mainSectionWrapper, { name: 'aboutMyself' });

        const aboutMyselfId = getId();

        expect(homeId).toBeTruthy();
        expect(aboutMyselfId).toBeTruthy();
        expect(homeId).not.toBe(aboutMyselfId);
    });

    it("derives heading text from the 'name' property", async () => {
        const mainSectionWrapper = createMainSectionWrapper({ heading: true, name: 'home' });

        function getHeadingText(): string {
            return mainSectionWrapper.get(headingSelector).text();
        }

        const homeText = getHeadingText();

        await setProps(mainSectionWrapper, { name: 'aboutMyself' });

        const aboutMyselfText = getHeadingText();

        expect(homeText).toBeTruthy();
        expect(aboutMyselfText).toBeTruthy();
        expect(homeText).not.toBe(aboutMyselfText);
    });
});
