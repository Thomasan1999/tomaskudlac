import MainSection from '@/components/main/MainSection.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { MainSectionProps } from '@/components/main/types';

describe('MainSection', () => {
    const headingSelector = 'h1, h2, h3, h4, h5, h6';

    beforeAll(async () => {
        await mockInitStore();
    });

    const createWrapper = buildCreateWrapper(MainSection, {
        name: 'home',
    });
    const setProps = buildSetProps<MainSectionProps>();

    it("adds/removes heading element depending on the 'heading' property", async () => {
        const wrapper = createWrapper({ heading: false });

        function expectHeadingToExist(expected: boolean): void {
            expect(wrapper.find(headingSelector).exists()).toBe(expected);
        }

        expectHeadingToExist(false);

        await setProps(wrapper, { heading: true });

        expectHeadingToExist(true);
    });

    it("derives 'id' from the 'name' property", async () => {
        const wrapper = createWrapper({ name: 'home' });

        function getId(): string {
            return wrapper.attributes().id;
        }

        const homeId = getId();

        await setProps(wrapper, { name: 'aboutMyself' });

        const aboutMyselfId = getId();

        expect(homeId).toBeTruthy();
        expect(aboutMyselfId).toBeTruthy();
        expect(homeId).not.toBe(aboutMyselfId);
    });

    it("derives heading text from the 'name' property", async () => {
        const wrapper = createWrapper({ heading: true, name: 'home' });

        function getHeadingText(): string {
            return wrapper.get(headingSelector).text();
        }

        const homeText = getHeadingText();

        await setProps(wrapper, { name: 'aboutMyself' });

        const aboutMyselfText = getHeadingText();

        expect(homeText).toBeTruthy();
        expect(aboutMyselfText).toBeTruthy();
        expect(homeText).not.toBe(aboutMyselfText);
    });
});
