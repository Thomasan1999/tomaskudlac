import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import {mount, MountingOptions, VueWrapper} from '@vue/test-utils';
import AboutMyself from '@/components/main/about-myself/AboutMyself.vue';
import useStore from '@/store';
import AboutMyselfColumn from '@/components/main/about-myself/AboutMyselfColumn.vue';

describe('AboutMyself', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    function createAboutMyselfWrapper(props: MountingOptions<any>['props'] = {}): VueWrapper
    {
        const defaultProps = {
            title: '',
            text: ''
        };

        return mount(AboutMyself, {
            global: {
                plugins: [pinia],
                stubs: ['AboutMyselfColumn']
            },
            props: {
                ...defaultProps,
                ...props
            }
        });
    }

    it('has heading', () =>
    {
        const aboutMyselfWrapper = createAboutMyselfWrapper();

        const headingElement = aboutMyselfWrapper.find('h1, h2, h3, h4, h5, h6');

        expect(headingElement.exists()).toBe(true);
    });

    it('renders photo of Tomáš Kudláč', () =>
    {
        const aboutMyselfWrapper = createAboutMyselfWrapper();

        const photoElement = aboutMyselfWrapper.find('[data-testid="photo"]');

        expect(photoElement.exists()).toBe(true);
    });

    it('renders all columns', () =>
    {
        const store = useStore();

        const aboutMyselfWrapper = createAboutMyselfWrapper();

        const columnLength = store.locales.sections.aboutMyself.columns.length;

        const columnComponents = aboutMyselfWrapper.findAllComponents(AboutMyselfColumn);

        expect(columnComponents.length).toBeGreaterThan(0);
        expect(columnComponents.length).toBe(columnLength);
    });
});
