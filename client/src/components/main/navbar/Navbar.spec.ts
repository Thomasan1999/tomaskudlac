import Navbar from '@/components/main/navbar/Navbar.vue';
import {mount, VueWrapper} from '@vue/test-utils';
import {Pinia} from 'pinia';
import {nextTick, reactive} from 'vue';
import MainSectionObject from '@/components/main/MainSectionObject';
import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import mockWindowResizeBy from '@/mocks/mockWindowResizeBy';
import mockInitStore from '@/mocks/mockInitStore';

describe('Navbar', () =>
{
    let pinia: Pinia;

    const sections: [string, MainSectionObject][] = [
        [
            'home',
            reactive(new MainSectionObject({
                name: 'home',
                order: 0
            }))
        ],
        [
            'aboutMyself',
            reactive(new MainSectionObject({
                name: 'aboutMyself',
                order: 1
            }))
        ]
    ];

    function createNavbarWrapper(sectionsLength: number = Infinity): VueWrapper
    {
        return mount(Navbar, {
            global: {
                plugins: [pinia],
                stubs: {
                    FontAwesomeIcon: true,
                    RouterLink: {template: '<div></div>'}
                }
            },
            props: {
                activeSection: sections[0]?.[0] ?? '',
                sections: sections.slice(0, sectionsLength)
            }
        });
    }

    function getSectionLinks(navbarWrapper: VueWrapper): VueWrapper[]
    {
        const navbarLinks = navbarWrapper.findAllComponents(NavbarLink);

        return navbarLinks.filter((navbarLink) => (navbarLink.element as HTMLElement).dataset.testid === 'sectionLink');
    }

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    it('assigns \'active\' property to active section', async () =>
    {
        const navbarWrapper = createNavbarWrapper();

        const sectionLinks = getSectionLinks(navbarWrapper);

        expect(sectionLinks[0].props().active).toBeTruthy();

        await navbarWrapper.setProps({activeSection: sections[1][0]});

        expect(sectionLinks[1].props().active).toBeTruthy();

        await navbarWrapper.setProps({activeSection: 'randomSection'});

        const noLinkHasActiveClass = sectionLinks.every((sectionLink) => !sectionLink.props().active);

        expect(noLinkHasActiveClass).toBe(true);
    });

    it('changes navbar icon mode on navbar icon click', async () =>
    {
        mockWindowResizeBy();

        const navbarWrapper = createNavbarWrapper();

        window.resizeBy(640, 360);

        await nextTick();

        const navbarIcon = navbarWrapper.get('.navbar-icon');

        const oldClasses = navbarIcon.classes();

        await navbarIcon.trigger('click');

        expect(oldClasses).not.toBe(navbarIcon.classes());
    });

    it('renders all section links', async () =>
    {
        for await (const length of [2, 1, 0])
        {
            // navbarWrapper has to be initialized every iteration because 'setProps' didn't change template

            const navbarWrapper = createNavbarWrapper(length);

            const sectionLinks = getSectionLinks(navbarWrapper);

            expect(sectionLinks).toHaveLength(length);
        }
    });

    it('emits \'linkClick\' on a section link click', async () =>
    {
        const navbarWrapper = createNavbarWrapper();

        expect(navbarWrapper.emitted().linkClick).toBeUndefined();

        await navbarWrapper.get('[data-testid="logo"]').trigger('click');

        expect(navbarWrapper.emitted().linkClick).toHaveLength(1);

        await navbarWrapper.get('[data-testid="sectionLink"]').trigger('click');

        expect(navbarWrapper.emitted().linkClick).toHaveLength(2);
    });

    it('emits \'languageToggle\' on language button click', async () =>
    {
        const navbarWrapper = createNavbarWrapper();

        expect(navbarWrapper.emitted().languageToggle).toBeUndefined();

        await navbarWrapper.get('[data-testid="navbarOtherLang"]').trigger('click');

        expect(navbarWrapper.emitted().languageToggle).toHaveLength(1);
    });
});
