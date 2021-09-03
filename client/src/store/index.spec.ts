import useStore from '@/store/index';
import {createPinia, setActivePinia} from 'pinia';
import mockWindowResizeBy from '@/mocks/mockWindowResizeBy';
import mockImageSrc from '@/mocks/mockImageSrc';

describe('store', () =>
{
    mockImageSrc();

    setActivePinia(createPinia());

    let store: ReturnType<typeof useStore> = useStore();

    afterEach(() =>
    {
        store.$reset();
    });

    it('computes data on init', async () =>
    {
        const propertiesToInit: (keyof typeof store)[] = ['age', 'imageFormat'];

        await store.init();

        propertiesToInit.forEach((propertyName) =>
        {
            expect(store[propertyName]).toBeTruthy();
        });
    });

    it('increments age correctly', async () =>
    {
        jest.useFakeTimers('modern');

        await store.init();

        const currentAge = store.age;

        const dates = [
            [new Date(`${2000 + currentAge}-06-30`), currentAge],
            [new Date(`${2000 + currentAge}-07-01`), currentAge + 1],
            [new Date(`${2001 + currentAge}-07-01`), currentAge + 2]
        ];

        dates.forEach(([date, age]) =>
        {
            jest.setSystemTime(date);

            jest.advanceTimersToNextTimer();

            expect(store.age).toBe(age);
        });

        jest.useRealTimers();
    });

    it('windowHeight and windowWidth props are equal to window size', async () =>
    {
        mockWindowResizeBy();

        function expectPropsToBeEqual(): void
        {
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
