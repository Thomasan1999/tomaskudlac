import Navbar from '@/components/main/navbar/Navbar.vue';
import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import MainSectionObject from '@/components/main/MainSectionObject';
import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import mockWindowResizeBy from '@/mocks/mockWindowResizeBy';
import mockInitStore from '@/mocks/mockInitStore';
import { buildCreateWrapper, buildSetProps, getTestingSelector } from '@/utils/test';
import { NavbarProps } from '@/components/main/navbar/types';

const LOGO_SELECTOR = getTestingSelector('logo');
const NAVBAR_OTHER_LANG_SELECTOR = getTestingSelector('navbar-other-lang');
const SECTION_LINK_SELECTOR = getTestingSelector('section-link');

describe('Navbar', () => {
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

    const createNavbarWrapper = buildCreateWrapper(
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
    const setProps = buildSetProps<NavbarProps>();

    function getSectionLinks(navbarWrapper: VueWrapper): ReturnType<typeof mount<typeof NavbarLink>>[] {
        const navbarLinks = navbarWrapper.findAllComponents(NavbarLink);

        return navbarLinks.filter(
            (navbarLink) => (navbarLink.element as HTMLElement).dataset.testid === 'section-link',
        );
    }

    beforeAll(async () => {
        await mockInitStore();
    });

    it("assigns 'active' property to active section", async () => {
        const navbarWrapper = createNavbarWrapper();

        const sectionLinks = getSectionLinks(navbarWrapper);

        expect(sectionLinks[0].props().active).toBeTruthy();

        await setProps(navbarWrapper, { activeSection: sections[1][0] });

        expect(sectionLinks[1].props().active).toBeTruthy();

        await setProps(navbarWrapper, { activeSection: 'randomSection' });

        const noLinkHasActiveClass = sectionLinks.every((sectionLink) => !sectionLink.props().active);

        expect(noLinkHasActiveClass).toBe(true);
    });

    it('changes navbar icon mode on navbar icon click', async () => {
        mockWindowResizeBy();

        const navbarWrapper = createNavbarWrapper();

        window.resizeBy(640, 360);

        await nextTick();

        const navbarIcon = navbarWrapper.get('.navbar-icon');

        const oldClasses = navbarIcon.classes();

        await navbarIcon.trigger('click');

        expect(oldClasses).not.toBe(navbarIcon.classes());
    });

    it('renders all section links', async () => {
        for await (const length of [2, 1, 0]) {
            // navbarWrapper has to be initialized every iteration because 'setProps' didn't change template

            const navbarWrapper = createNavbarWrapper({
                sections: sections.slice(0, length),
            });

            const sectionLinks = getSectionLinks(navbarWrapper);

            expect(sectionLinks).toHaveLength(length);
        }
    });

    it("emits 'linkClick' on a section link click", async () => {
        const navbarWrapper = createNavbarWrapper();

        expect(navbarWrapper.emitted().linkClick).toBeUndefined();

        await navbarWrapper.get(LOGO_SELECTOR).trigger('click');

        expect(navbarWrapper.emitted().linkClick).toHaveLength(1);

        await navbarWrapper.get(SECTION_LINK_SELECTOR).trigger('click');

        expect(navbarWrapper.emitted().linkClick).toHaveLength(2);
    });

    it("emits 'languageToggle' on language button click", async () => {
        const navbarWrapper = createNavbarWrapper();

        expect(navbarWrapper.emitted().languageToggle).toBeUndefined();

        await navbarWrapper.get(NAVBAR_OTHER_LANG_SELECTOR).trigger('click');

        expect(navbarWrapper.emitted().languageToggle).toHaveLength(1);
    });
});
