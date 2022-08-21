import {MountingOptions, shallowMount, VueWrapper} from '@vue/test-utils';
import Toast from '@/components/main/Toast.vue';
import {ComponentPublicInstance, nextTick} from 'vue';
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
        jest.useFakeTimers();
    });

    function createToastWrapper(props: MountingOptions<any>['props'] = {}): VueWrapper<ComponentPublicInstance>
    {
        const defaultProps = {
            message: '',
            type: 'fail'
        };

        return shallowMount(Toast, {
            global: {
                plugins: [pinia],
                renderStubDefaultSlot: true,
                stubs: {
                    transition: false
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

        /*
            List of classes is used instead of checking styles, might later refactor the test to Cypress to directly
            check the rendered styles.
         */

        const failStyles = toastWrapper.classes();

        await toastWrapper.setProps({type: 'success'});

        const successStyles = toastWrapper.classes();

        expect(failStyles).not.toBe(successStyles);
    });

    /*
       //TODO Fix tests when stubbing transition or some alternative approach will be available
    it('emits \'close\' event on close button click', async () =>
       {
           const toastWrapper = createToastWrapper();

           await nextTick();

           expect(toastWrapper.emitted().close).toBeUndefined();

           await toastWrapper.get<HTMLElement>('[data-testid="closeButton"]').trigger('click');

           await nextTick();

           expect(toastWrapper.emitted().close).toHaveLength(1);
       });

       it('emits \'close\' after certain time', async () =>
       {
           const toastWrapper = createToastWrapper();

           await nextTick();

           expect(toastWrapper.emitted().close).toBeUndefined();

           jest.runAllTimers();

           await nextTick();

           expect(toastWrapper.emitted().close).toHaveLength(1);
       });
       */
});
