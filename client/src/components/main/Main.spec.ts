import {mount, VueWrapper} from '@vue/test-utils';
import Main from '@/components/main/Main.vue';
import mockInitStore from '@/mocks/mockInitStore';
import {Pinia} from 'pinia';
import MainSection from '@/components/main/MainSection.vue';
import mainSections from '@/components/main/mainSections';
import {ComponentPublicInstance, nextTick} from 'vue';

let routerReplaceCallTimes = 0;

jest.mock('@/router', () =>
{
    return {
        currentRoute: {
            value: {
                hash: ''
            }
        },
        replace: () =>
        {
            routerReplaceCallTimes++;
        }
    };
});

describe('Main', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();

        Element.prototype.scroll = function ()
        {
        };
    });

    function createMainWrapper(): VueWrapper<ComponentPublicInstance>
    {
        return mount(Main, {
            global: {
                plugins: [pinia],
                stubs: ['font-awesome-icon', 'footer-component']
            }
        });
    }

    it('renders sections in the right order', () =>
    {
        const mainWrapper = createMainWrapper();

        const mainSectionComponents = mainWrapper.findAllComponents(MainSection);

        mainSectionComponents.forEach((mainSection, mainSectionIndex) =>
        {
            const name = mainSection.props().name;

            const order = mainSections[name].order;

            expect(order).toBe(mainSectionIndex);
        });
    });

    it('replaces route on link click', async () =>
    {
        const mainWrapper = createMainWrapper();

        let callTimesBeforeClick = routerReplaceCallTimes;

        await mainWrapper.get('[data-testid="sectionLink"]').trigger('click');

        await nextTick();

        expect(routerReplaceCallTimes).toBe(callTimesBeforeClick + 1);
    });
});
