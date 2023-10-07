import sleep from '@/utils/sleep';
import {flushPromises} from '@vue/test-utils';

describe('sleep', () =>
{
    it('resolves after timeout has passed', async () =>
    {
        vi.useFakeTimers();

        const setTimeoutSpy = vi.spyOn(window, 'setTimeout');

        const resolvedCallback = vi.fn();

        expect(resolvedCallback).not.toHaveBeenCalled();
        expect(setTimeoutSpy).not.toHaveBeenCalled();

        sleep(100).then(resolvedCallback);

        expect(setTimeoutSpy).toHaveBeenCalled();

        vi.advanceTimersByTime(50);

        expect(resolvedCallback).not.toHaveBeenCalled();

        await flushPromises();

        vi.advanceTimersByTime(50);

        await flushPromises();

        expect(resolvedCallback).toHaveBeenCalled();
    });
});
