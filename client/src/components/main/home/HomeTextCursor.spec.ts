import { VueWrapper } from '@vue/test-utils';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import HomeTextCursor from '@/components/main/home/HomeTextCursor.vue';

const CURSOR_SELECTOR = getTestingSelector('cursor');

const createWrapper = buildCreateWrapper(HomeTextCursor);

describe('HomeTextCursor', () => {
    function getCursorElement(wrapper: VueWrapper) {
        return wrapper.get<HTMLSpanElement>(CURSOR_SELECTOR);
    }

    it("blinks by the 'blinking' property", async () => {
        const wrapper = createWrapper({
            blinking: false,
        });

        expect(getCursorElement(wrapper).classes('animate-blinking')).toBe(false);

        await wrapper.setProps({ blinking: true });

        expect(getCursorElement(wrapper).classes('animate-blinking')).toBe(true);
    });
});
