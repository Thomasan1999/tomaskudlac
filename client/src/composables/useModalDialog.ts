import { onMounted, onUnmounted, type Ref } from 'vue';

const FOCUSABLE_SELECTOR = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(', ');

export interface UseModalDialogOptions {
    /** Called when Escape is pressed. */
    onClose: () => void;
}

/**
 * Gives a modal container the keyboard contract a dialog owes its users: focus stays inside it while it is open,
 * Escape closes it, and whatever held focus before gets it back. Without the trap, tabbing walks straight out of
 * the dialog and into the page behind it, which a sighted mouse user never notices and a keyboard user cannot
 * recover from.
 *
 * Escape is handled here rather than in the template because it has to work wherever focus happens to be.
 *
 * @param container Element focus is confined to.
 * @param options Behaviour hooks.
 */
export default function useModalDialog(container: Ref<HTMLElement | null>, options: UseModalDialogOptions): void {
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusableElements = (): HTMLElement[] =>
        Array.from(container.value?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? []);

    const onKeydown = (event: KeyboardEvent): void => {
        if (event.key === 'Escape') {
            options.onClose();
            return;
        }

        if (event.key !== 'Tab') {
            return;
        }

        const focusableElements = getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (!firstElement || !lastElement) {
            // Nothing to focus, but focus still must not escape.
            event.preventDefault();
            return;
        }

        const activeElement = document.activeElement;
        const leavingBackwards =
            event.shiftKey && (activeElement === firstElement || activeElement === container.value);
        const leavingForwards = !event.shiftKey && activeElement === lastElement;

        if (leavingBackwards) {
            event.preventDefault();
            lastElement.focus();
        } else if (leavingForwards) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    onMounted(() => {
        document.addEventListener('keydown', onKeydown);

        (getFocusableElements()[0] ?? container.value)?.focus();
    });

    onUnmounted(() => {
        document.removeEventListener('keydown', onKeydown);

        previouslyFocused?.focus();
    });
}
