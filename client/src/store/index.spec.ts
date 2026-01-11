import useStore from '@/store/index';
import { createPinia, setActivePinia } from 'pinia';
import mockWindowResizeBy from '@/mocks/mockWindowResizeBy';
import mockImageSrc from '@/mocks/mockImageSrc';

describe('store', () => {
    mockImageSrc();

    let store: ReturnType<typeof useStore>;

    function initStore(): void {
        setActivePinia(createPinia());
        store = useStore();
    }

    beforeEach(() => {
        initStore();
    });

    it('computes data on init', async () => {
        const propertiesToInit: (keyof typeof store)[] = ['age', 'imageFormat'];

        await store.init();

        propertiesToInit.forEach((propertyName) => {
            expect(store[propertyName]).toBeTruthy();
        });
    });

    it('increments age correctly', async () => {
        vi.useFakeTimers();

        const dates = [
            [new Date('2023-06-29'), 24],
            [new Date('2024-06-20'), 25],
            [new Date('2025-06-25'), 26],
        ];

        for await (const [date, age] of dates) {
            initStore();

            vi.setSystemTime(date);

            await store.init();

            await vi.runOnlyPendingTimersAsync();

            expect(store.age).toBe(age);
        }

        vi.useRealTimers();
    });

    it('windowHeight and windowWidth props are equal to window size', async () => {
        mockWindowResizeBy();

        function expectPropsToBeEqual(): void {
            expect(store.windowHeight).toBe(window.innerHeight);
            expect(store.windowWidth).toBe(window.innerWidth);
        }

        await store.init();

        expectPropsToBeEqual();

        window.resizeBy(100, 200);

        expectPropsToBeEqual();

        window.resizeBy(500, 1000);

        expectPropsToBeEqual();
    });
});
