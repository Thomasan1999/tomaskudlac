import { Pinia } from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import { DOMWrapper, flushPromises, mount, VueWrapper } from '@vue/test-utils';
import ContactForm from '@/components/main/contact/form/ContactForm.vue';
import ContactFormField from '@/components/main/contact/form/ContactFormField.vue';
import contactFormFields from '@/components/main/contact/form/contactFormFields';
import { cloneDeep, merge } from 'lodash';
import { getTestingSelector } from '@/utils/test';
import { nextTick } from 'vue';
import { afterEach } from 'vitest';
import useStore from '@/store';

async function awaitSubmit(wrapper: Omit<DOMWrapper<HTMLFormElement>, 'exists'>): Promise<void> {
    wrapper.trigger('submit');
    await flushPromises();
}

window.fetch = () =>
    new Promise((resolve) =>
        resolve({
            json: async () => {
                return {};
            },
            ok: true,
            status: 200,
        } as any),
    );

const fetchSpy = vi.spyOn(window, 'fetch');
const resetSpy = vi.spyOn(HTMLFormElement.prototype, 'reset');

const defaultFormFields = cloneDeep(contactFormFields);

describe('ContactForm', () => {
    let pinia: Pinia;
    let store: ReturnType<typeof useStore>;

    beforeAll(async () => {
        pinia = await mockInitStore();
        store = useStore();
    });

    beforeEach(() => {
        fetchSpy.mockClear();

        merge(contactFormFields, defaultFormFields);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    function createContactFormWrapper(): VueWrapper {
        return mount(ContactForm, {
            global: {
                plugins: [pinia],
            },
        });
    }

    function getFieldTestingSelector(name: string): string {
        return getTestingSelector(`field-${name}`);
    }

    describe('validation', () => {
        async function expectInputToHaveValidity(
            fieldName: string,
            testCases: { value: string; validity: boolean }[],
        ): Promise<void> {
            const wrapper = createContactFormWrapper();

            const field = wrapper.getComponent<typeof ContactFormField>(getFieldTestingSelector(fieldName));

            for (const { value, validity } of testCases) {
                await field.find(`[name=${fieldName}]`).setValue(value);
                await nextTick();

                expect(contactFormFields.find((field) => field.name === fieldName)!.valid).toBe(validity);
            }
        }

        it('validates email', async () => {
            await expectInputToHaveValidity('email', [
                { value: '', validity: false },
                { value: 'email', validity: false },
                { value: 'name.surname@email.com', validity: true },
                { value: 'name.surname@emailcom', validity: false },
                { value: 'name.surnameemailcom@', validity: false },
                { value: 'namesurname123@email.com', validity: true },
                { value: 'namesurname123@email.com'.repeat(100), validity: false },
            ]);
        });

        it('validates message', async () => {
            await expectInputToHaveValidity('message', [
                { value: '', validity: false },
                { value: 'Random text', validity: true },
                { value: 'A', validity: true },
                { value: 'Another text', validity: true },
                { value: '#@3456736', validity: true },
            ]);
        });

        it('validates phone number', async () => {
            await expectInputToHaveValidity('phone', [
                { value: '', validity: true },
                { value: 'Phone Number', validity: false },
                { value: '0123456789', validity: true },
                { value: '0123 456 789', validity: true },
                { value: '+0123456789', validity: true },
            ]);
        });

        it('validates name', async () => {
            await expectInputToHaveValidity('name', [
                { value: '', validity: true },
                { value: 'Name Surname', validity: true },
                { value: 'Name# Surname', validity: false },
                { value: 'Name__Surname', validity: false },
                { value: 'NameSurname', validity: true },
                { value: '$$$$$$', validity: false },
                { value: 'Ňámě Śúřňämě', validity: true },
            ]);
        });
    });

    describe('submit', () => {
        it('touches fields on submit', async () => {
            const wrapper = createContactFormWrapper();

            const fields = wrapper.findAllComponents(ContactFormField);

            const requiredField = fields.find((field) => field.get('input').element.required)!;

            const classNameBeforeSubmit = requiredField.element.className;

            const formWrapper = wrapper.get('form');

            await awaitSubmit(formWrapper);

            expect(classNameBeforeSubmit).toBeTruthy();
            expect(classNameBeforeSubmit).not.toBe(requiredField.element.className);
        });

        async function makeFormSubmittable(formWrapper: Omit<DOMWrapper<HTMLFormElement>, 'exists'>): Promise<void> {
            await formWrapper.get('input[type=email]').setValue('name.surname@email.com');
            await formWrapper.get('textarea').setValue('Random message');
        }

        it('does not submit if fields are invalid', async () => {
            const wrapper = createContactFormWrapper();

            expect(fetchSpy).not.toHaveBeenCalled();

            const formWrapper = wrapper.get('form');

            await awaitSubmit(formWrapper);

            expect(fetchSpy).not.toHaveBeenCalled();

            await makeFormSubmittable(formWrapper);

            await awaitSubmit(formWrapper);

            expect(fetchSpy).toHaveBeenCalled();
        });

        it('submits site language', async () => {
            const wrapper = createContactFormWrapper();

            expect(fetchSpy).not.toHaveBeenCalled();

            const formWrapper = wrapper.get('form');

            expect(formWrapper.find('input[name=lang]').exists()).toBe(true);
        });

        it('displays toast message on form submit', async () => {
            const addToastSpy = vi.spyOn(store, 'addToast');

            const wrapper = createContactFormWrapper();

            expect(addToastSpy).not.toHaveBeenCalled();

            const formWrapper = wrapper.get('form');

            await makeFormSubmittable(formWrapper);

            await awaitSubmit(formWrapper);

            expect(addToastSpy).toHaveBeenCalledTimes(1);
        });

        it('resets form after successful submit', async () => {
            const wrapper = createContactFormWrapper();

            const formWrapper = wrapper.get('form');

            const nameFieldWrapper = formWrapper.get<HTMLInputElement>('input[name=name]');

            await nameFieldWrapper.setValue('Aaa');

            await makeFormSubmittable(formWrapper);

            fetchSpy.mockRejectedValueOnce(new Error());

            await awaitSubmit(formWrapper);

            expect(resetSpy).not.toHaveBeenCalled();

            fetchSpy.mockResolvedValueOnce(
                new Promise((resolve) =>
                    resolve({
                        json: async () => {
                            return {};
                        },
                        ok: true,
                        status: 200,
                    } as any),
                ) as never,
            );

            await awaitSubmit(formWrapper);

            expect(resetSpy).toHaveBeenCalledTimes(1);
        });
    });
});
