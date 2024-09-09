import Navbar from '@/components/main/navbar/Navbar.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import MainSectionObject from '@/components/main/MainSectionObject';
import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import mockWindowResizeBy from '@/mocks/mockWindowResizeBy';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const LOGO_SELECTOR = getTestingSelector('logo');
const NAVBAR_OTHER_LANG_SELECTOR = getTestingSelector('navbar-other-lang');
const SECTION_LINK_SELECTOR = getTestingSelector('section-link');

const sections: [string, MainSectionObject][] = [
    [
        'home',
        reactive(
            new MainSectionObject({
                name: 'home',
                order: 0,
            }),
        ),
    ],
    [
        'aboutMyself',
        reactive(
            new MainSectionObject({
                name: 'aboutMyself',
                order: 1,
            }),
        ),
    ],
];

const createWrapper = buildCreateWrapper(
    Navbar,
    {
        activeSection: sections[0][0],
        sections,
    },
    {
        global: {
            stubs: {
                FontAwesomeIcon: true,
                RouterLink: { template: '<div></div>' },
            },
        },
    },
);

describe('Navbar', () => {
    function getSectionLinks(wrapper: VueWrapper): ReturnType<typeof mount<typeof NavbarLink>>[] {
        const navbarLinks = wrapper.findAllComponents(NavbarLink);

        return navbarLinks.filter(
            (navbarLink) => (navbarLink.element as HTMLElement).dataset.testid === 'section-link',
        );
    }

    beforeAll(async () => {
        await mockInitStore();
    });

    it("assigns 'active' property to active section", async () => {
        const wrapper = createWrapper();

        const sectionLinks = getSectionLinks(wrapper);

        expect(sectionLinks[0].props().active).toBeTruthy();

        await wrapper.setProps({ activeSection: sections[1][0] });

        expect(sectionLinks[1].props().active).toBeTruthy();

        await wrapper.setProps({ activeSection: 'randomSection' });

        const noLinkHasActiveClass = sectionLinks.every((sectionLink) => !sectionLink.props().active);

        expect(noLinkHasActiveClass).toBe(true);
    });

    it('changes navbar icon mode on navbar icon click', async () => {
        mockWindowResizeBy();

        const wrapper = createWrapper();

        window.resizeBy(640, 360);

        await nextTick();

        const navbarIcon = wrapper.get('.navbar-icon');

        const oldClasses = navbarIcon.classes();

        await navbarIcon.trigger('click');

        expect(oldClasses).not.toBe(navbarIcon.classes());
    });

    it('renders all section links', async () => {
        for await (const length of [2, 1, 0]) {
            // wrapper has to be initialized every iteration because 'setProps' didn't change template

            const wrapper = createWrapper({
                sections: sections.slice(0, length),
            });

            const sectionLinks = getSectionLinks(wrapper);

            expect(sectionLinks).toHaveLength(length);
        }
    });

    it("emits 'linkClick' on a section link click", async () => {
        const wrapper = createWrapper();

        expect(wrapper.emitted().linkClick).toBeUndefined();

        await wrapper.get(LOGO_SELECTOR).trigger('click');

        expect(wrapper.emitted().linkClick).toHaveLength(1);

        await wrapper.get(SECTION_LINK_SELECTOR).trigger('click');

        expect(wrapper.emitted().linkClick).toHaveLength(2);
    });

    it("emits 'languageToggle' on language button click", async () => {
        const wrapper = createWrapper();

        expect(wrapper.emitted().languageToggle).toBeUndefined();

        await wrapper.get(NAVBAR_OTHER_LANG_SELECTOR).trigger('click');

        expect(wrapper.emitted().languageToggle).toHaveLength(1);
    });
});
