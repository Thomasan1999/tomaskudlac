import { defineComponent, h, ref } from 'vue';
import { enableAutoUnmount, mount, type VueWrapper } from '@vue/test-utils';
import useModalDialog from '@/composables/useModalDialog';

const onClose = vi.fn();

const Dialog = defineComponent({
    setup() {
        const container = ref<HTMLElement | null>(null);

        useModalDialog(container, { onClose });

        return () =>
            h('div', { ref: container, tabindex: -1 }, [
                h('button', { 'data-testid': 'first' }, 'first'),
                h('button', { 'data-testid': 'last' }, 'last'),
            ]);
    },
});

function pressKey(key: string, shiftKey = false): void {
    document.dispatchEvent(new KeyboardEvent('keydown', { key, shiftKey }));
}

describe('useModalDialog', () => {
    // The listener lives on document, so a dialog left mounted keeps handling keys in the next test.
    enableAutoUnmount(afterEach);

    let wrapper: VueWrapper;
    let outsideButton: HTMLButtonElement;

    beforeEach(() => {
        onClose.mockClear();

        document.body.innerHTML = '<button id="outside">outside</button><div id="host"></div>';

        outsideButton = document.querySelector<HTMLButtonElement>('#outside')!;
        outsideButton.focus();

        wrapper = mount(Dialog, { attachTo: '#host' });
    });

    function getButton(testId: string): HTMLButtonElement {
        return wrapper.get<HTMLButtonElement>(`[data-testid="${testId}"]`).element;
    }

    it('focuses the first focusable element on mount', () => {
        expect(document.activeElement).toBe(getButton('first'));
    });

    it('closes on Escape', () => {
        pressKey('Escape');

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('wraps focus forwards from the last element', () => {
        getButton('last').focus();

        pressKey('Tab');

        expect(document.activeElement).toBe(getButton('first'));
    });

    it('wraps focus backwards from the first element', () => {
        getButton('first').focus();

        pressKey('Tab', true);

        expect(document.activeElement).toBe(getButton('last'));
    });

    it('leaves focus alone in the middle of the dialog', () => {
        getButton('first').focus();

        pressKey('Tab');

        expect(document.activeElement).toBe(getButton('first'));
    });

    it('restores focus to the previously focused element on unmount', () => {
        expect(document.activeElement).not.toBe(outsideButton);

        wrapper.unmount();

        expect(document.activeElement).toBe(outsideButton);
    });

    it('stops listening once unmounted', () => {
        wrapper.unmount();

        pressKey('Escape');

        expect(onClose).not.toHaveBeenCalled();
    });
});
