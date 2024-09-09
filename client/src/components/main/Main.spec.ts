import Main from '@/components/main/Main.vue';
import mockInitStore from '@/mocks/mockInitStore';
import MainSection from '@/components/main/MainSection.vue';
import mainSections from '@/components/main/mainSections';
import { nextTick } from 'vue';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';

const SECTION_LINK_SELECTOR = getTestingSelector('section-link');

let routerReplaceCallTimes = 0;

vi.mock('@/router', () => {
    return {
        default: {
            currentRoute: {
                value: {
                    hash: '',
                },
            },
            replace: () => {
                routerReplaceCallTimes++;
            },
        },
    };
});

const createWrapper = buildCreateWrapper(Main, undefined, {
    global: {
        stubs: ['font-awesome-icon', 'footer-component'],
    },
});

describe('Main', () => {
    beforeAll(async () => {
        await mockInitStore();

        Element.prototype.scroll = function () {};
    });

    it('renders sections in the right order', () => {
        const wrapper = createWrapper();

        const mainSectionComponents = wrapper.findAllComponents(MainSection);

        mainSectionComponents.forEach((mainSection, mainSectionIndex) => {
            const name = mainSection.props().name;

            const order = mainSections[name].order;

            expect(order).toBe(mainSectionIndex);
        });
    });

    it('replaces route on link click', async () => {
        const wrapper = createWrapper();

        const callTimesBeforeClick = routerReplaceCallTimes;

        await wrapper.get(SECTION_LINK_SELECTOR).trigger('click');

        await nextTick();

        expect(routerReplaceCallTimes).toBe(callTimesBeforeClick + 1);
    });
});
