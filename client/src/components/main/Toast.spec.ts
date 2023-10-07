import {mount, MountingOptions, VueWrapper} from '@vue/test-utils';
import Toast from '@/components/main/Toast.vue';
import {nextTick} from 'vue';
import mockInitStore from '@/mocks/mockInitStore';
import {Pinia} from 'pinia';

describe('Toast', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
        document.body.style.setProperty('--primary-red', 'red');
        document.body.style.setProperty('--primary-green', 'green');
        vi.useFakeTimers();
    });

    function createToastWrapper(props: MountingOptions<any>['props'] = {}): VueWrapper
    {
        const defaultProps = {
            message: '',
            type: 'fail'
        };

        return mount(Toast, {
            global: {
                plugins: [pinia],
                renderStubDefaultSlot: true,
                stubs: {
                    Teleport: true,
                    Transition: true
                }
            },
            props: {
                ...defaultProps,
                ...props
            }
        });
    }

    it('renders message', async () =>
    {
        const toastWrapper = createToastWrapper({
            message: 'This is a toast message.',
            type: 'fail'
        });

        // Await rendering of HTML which is triggered only after 'mounted' lifecycle-hook
        await nextTick();

        expect(toastWrapper.text()).toContain('This is a toast message.');

        await toastWrapper.setProps({message: 'Another message in the toast.'});

        expect(toastWrapper.text()).toContain('Another message in the toast.');
    });

    it('has different styles for each type', async () =>
    {
        const toastWrapper = createToastWrapper({
            type: 'fail'
        });

        await nextTick();

        const failStyles = toastWrapper.classes();

        await toastWrapper.setProps({type: 'success'});

        const successStyles = toastWrapper.classes();

        expect(failStyles).not.toBe(successStyles);
    });

    it('hides toast on close button click', async () =>
    {
        const toastWrapper = createToastWrapper();

        await nextTick();

        expect(toastWrapper.find('[data-testid="toast"]').exists()).toBe(true);

        await toastWrapper.get<HTMLElement>('[data-testid="closeButton"]').trigger('click');

        await nextTick();

        expect(toastWrapper.find('[data-testid="toast"]').exists()).toBe(false);
    });

    it('hides toast after certain time', async () =>
    {
        const toastWrapper = createToastWrapper();

        await nextTick();

        expect(toastWrapper.find('[data-testid="toast"]').exists()).toBe(true);

        vi.runAllTimers();

        await nextTick();

        expect(toastWrapper.find('[data-testid="toast"]').exists()).toBe(false);
    });
});
