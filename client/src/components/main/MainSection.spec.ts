import { mount, MountingOptions, VueWrapper } from '@vue/test-utils';
import MainSection from '@/components/main/MainSection.vue';
import mockInitStore from '@/mocks/mockInitStore';
import { Pinia } from 'pinia';

describe('MainSection', () => {
    const headingSelector = 'h1, h2, h3, h4, h5, h6';

    let pinia: Pinia;

    beforeAll(async () => {
        pinia = await mockInitStore();
    });

    function createMainSectionWrapper(props: MountingOptions<any>['props'] = {}): VueWrapper {
        const defaultProps = {
            name: 'home',
        };

        return mount(MainSection, {
            global: {
                plugins: [pinia],
            },
            props: {
                ...defaultProps,
                ...props,
            },
        });
    }

    it("has different classes depending on 'background' property", async () => {
        const mainSectionWrapper = createMainSectionWrapper();

        const classesWithoutBackground = mainSectionWrapper.classes();

        await mainSectionWrapper.setProps({ background: true });

        const classesWithBackground = mainSectionWrapper.classes();

        expect(classesWithBackground).not.toBe(classesWithoutBackground);
    });

    it("adds/removes heading element depending on the 'heading' property", async () => {
        const mainSectionWrapper = createMainSectionWrapper({ heading: false });

        function expectHeadingToExist(expected: boolean): void {
            expect(mainSectionWrapper.find(headingSelector).exists()).toBe(expected);
        }

        expectHeadingToExist(false);

        await mainSectionWrapper.setProps({ heading: true });

        expectHeadingToExist(true);
    });

    it("derives 'id' from the 'name' property", async () => {
        const mainSectionWrapper = createMainSectionWrapper({ name: 'home' });

        function getId(): string {
            return mainSectionWrapper.attributes().id;
        }

        const homeId = getId();

        await mainSectionWrapper.setProps({ name: 'aboutMyself' });

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

        await mainSectionWrapper.setProps({ name: 'aboutMyself' });

        const aboutMyselfText = getHeadingText();

        expect(homeText).toBeTruthy();
        expect(aboutMyselfText).toBeTruthy();
        expect(homeText).not.toBe(aboutMyselfText);
    });
});
