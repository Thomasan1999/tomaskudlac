import { onScopeDispose, readonly, ref, type Ref } from 'vue';

export interface UseTimeoutsReturn {
    /**
     * False once the scope has been disposed. Chains that resume after an `await` should check it before carrying
     * on, since clearing a pending timeout cannot stop work that is already suspended mid-promise.
     */
    isActive: Readonly<Ref<boolean>>;
    setSafeTimeout: (callback: () => void, delay: number) => void;
}

/**
 * Timeouts tied to the current effect scope. Anything still pending is cleared when the component goes away, so a
 * self-rescheduling chain cannot outlive it and keep writing to refs nothing renders any more.
 */
export default function useTimeouts(): UseTimeoutsReturn {
    const timeoutIds = new Set<ReturnType<typeof setTimeout>>();
    const isActive = ref(true);

    const setSafeTimeout = (callback: () => void, delay: number): void => {
        if (!isActive.value) {
            return;
        }

        // Safe to close over before the assignment completes - the callback only runs on a later tick.
        const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
            timeoutIds.delete(timeoutId);

            if (isActive.value) {
                callback();
            }
        }, delay);

        timeoutIds.add(timeoutId);
    };

    onScopeDispose(() => {
        isActive.value = false;

        timeoutIds.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        timeoutIds.clear();
    });

    return { isActive: readonly(isActive), setSafeTimeout };
}
