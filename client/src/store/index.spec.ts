import useStore from '@/store/index';
import { createPinia, setActivePinia } from 'pinia';
import mockWindowResizeBy from '@/mocks/mockWindowResizeBy';

describe('store', () => {
    let store: ReturnType<typeof useStore>;

    function initStore(): void {
        setActivePinia(createPinia());
        store = useStore();
    }

    beforeEach(() => {
        initStore();
    });

    it('computes data on init', async () => {
        const propertiesToInit: (keyof typeof store)[] = ['age'];

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

    /**
     * `setTimeout` stores its delay in a 32-bit signed integer, so anything above 2^31 - 1 overflows and fires
     * immediately. The guard used to compare against 2^32, which left two failure windows: delays between the two
     * ceilings overflowed into an immediate re-run (a tight recursion), and everything above 2^32 was skipped
     * entirely, so the age stopped updating for most of the year.
     */
    describe('birthday timer', () => {
        const MAX_TIMEOUT_DELAY = 2 ** 31 - 1;

        async function getScheduledDelays(date: Date): Promise<number[]> {
            vi.useFakeTimers();
            vi.setSystemTime(date);

            initStore();

            const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

            await store.init();

            const delays = setTimeoutSpy.mock.calls.map(([, delay]) => delay as number);

            setTimeoutSpy.mockRestore();
            vi.useRealTimers();

            return delays;
        }

        it.each([
            ['inside the overflow window', new Date('2026-06-05')],
            ['far from the birthday', new Date('2026-08-22')],
            ['just after the birthday', new Date('2026-07-01')],
        ])('schedules a delay within the ceiling when %s', async (_, date) => {
            const delays = await getScheduledDelays(date);

            expect(delays).not.toHaveLength(0);

            delays.forEach((delay) => {
                expect(delay).toBeGreaterThan(0);
                expect(delay).toBeLessThanOrEqual(MAX_TIMEOUT_DELAY);
            });
        });
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
