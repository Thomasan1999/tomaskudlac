import sleep from '@/utils/sleep';
import {flushPromises} from '@vue/test-utils';

describe('sleep', () =>
{
    it('resolves after timeout has passed', async () =>
    {
        jest.useFakeTimers();

        const setTimeoutSpy = jest.spyOn(window, 'setTimeout');

        const resolvedCallback = jest.fn();

        expect(resolvedCallback).not.toHaveBeenCalled();
        expect(setTimeoutSpy).not.toHaveBeenCalled();

        sleep(100).then(resolvedCallback);

        expect(setTimeoutSpy).toHaveBeenCalled();

        jest.advanceTimersByTime(50);

        expect(resolvedCallback).not.toHaveBeenCalled();

        await flushPromises();

        jest.advanceTimersByTime(50);

        await flushPromises();

        expect(resolvedCallback).toHaveBeenCalled();
    });
});
