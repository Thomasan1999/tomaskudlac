import { effectScope } from 'vue';
import useTimeouts, { type UseTimeoutsReturn } from '@/composables/useTimeouts';

describe('useTimeouts', () => {
    let scope: ReturnType<typeof effectScope>;
    let timeouts: UseTimeoutsReturn;

    beforeEach(() => {
        vi.useFakeTimers();

        scope = effectScope();
        timeouts = scope.run(() => useTimeouts())!;
    });

    afterEach(() => {
        scope.stop();
        vi.useRealTimers();
    });

    it('runs the callback after the delay', () => {
        const callback = vi.fn();

        timeouts.setSafeTimeout(callback, 100);

        expect(callback).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not run pending callbacks once the scope is disposed', () => {
        const callback = vi.fn();

        timeouts.setSafeTimeout(callback, 100);

        scope.stop();

        vi.advanceTimersByTime(1000);

        expect(callback).not.toHaveBeenCalled();
        expect(timeouts.isActive.value).toBe(false);
    });

    // A self-rescheduling chain is the case this exists for - one missed cancellation and it runs forever.
    it('stops a chain that reschedules itself', () => {
        const callback = vi.fn(() => {
            timeouts.setSafeTimeout(callback, 100);
        });

        timeouts.setSafeTimeout(callback, 100);

        vi.advanceTimersByTime(300);

        expect(callback).toHaveBeenCalledTimes(3);

        scope.stop();

        vi.advanceTimersByTime(1000);

        expect(callback).toHaveBeenCalledTimes(3);
    });

    it('ignores timeouts scheduled after disposal', () => {
        const callback = vi.fn();

        scope.stop();

        timeouts.setSafeTimeout(callback, 100);

        vi.advanceTimersByTime(1000);

        expect(callback).not.toHaveBeenCalled();
    });
});
