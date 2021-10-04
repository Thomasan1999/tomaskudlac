import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import {DOMWrapper, mount, VueWrapper} from '@vue/test-utils';
import {ComponentPublicInstance} from 'vue';
import ContactFormType from '@/components/main/contact/ContactForm.vue';
import ContactFormField from '@/components/main/contact/ContactFormField.vue';
import Toast from '@/components/main/Toast.vue';

let ContactForm: typeof ContactFormType;

window.fetch = () => (
    new Promise(
        (resolve) => resolve({
            json: async () =>
            {
                return {};
            },
            ok: true,
            status: 200
        } as any)
    )
);

const fetchSpy = jest.spyOn(window, 'fetch');

describe('ContactForm', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    beforeEach(() =>
    {
        fetchSpy.mockClear();

        jest.isolateModules(() =>
        {
            ContactForm = require('./ContactForm.vue').default;
        });
    });

    function createContactFormWrapper(): VueWrapper<ComponentPublicInstance>
    {
        return mount(ContactForm, {
            global: {
                plugins: [pinia],
                stubs: ['Toast']
            }
        });
    }

    describe('validation', () =>
    {
        async function expectInputToHaveValidity(
            input: Omit<DOMWrapper<HTMLInputElement | HTMLTextAreaElement>, 'exists'>,
            valueToSet: string,
            validity: boolean
        ): Promise<void>
        {
            await input.setValue(valueToSet);

            expect(input.element.validity.valid).toBe(validity);
        }

        it('validates email', async () =>
        {
            const wrapper = createContactFormWrapper();

            const emailInput = wrapper.get<HTMLInputElement>('input[type=email]');

            await expectInputToHaveValidity(emailInput, '', false);
            await expectInputToHaveValidity(emailInput, 'email', false);
            await expectInputToHaveValidity(emailInput, 'name.surname@email.com', true);
            await expectInputToHaveValidity(emailInput, 'name.surname@emailcom', false);
            await expectInputToHaveValidity(emailInput, 'name.surnameemailcom@', false);
            await expectInputToHaveValidity(emailInput, 'namesurname123@email.com', true);
            await expectInputToHaveValidity(emailInput, 'namesurname123@email.com'.repeat(100), false);
        });

        it('validates message', async () =>
        {
            const wrapper = createContactFormWrapper();

            const messageInput = wrapper.get('textarea');

            await expectInputToHaveValidity(messageInput, '', false);
            await expectInputToHaveValidity(messageInput, 'Random text', true);
            await expectInputToHaveValidity(messageInput, 'A', true);
            await expectInputToHaveValidity(messageInput, 'Another text', true);
            await expectInputToHaveValidity(messageInput, '#@3456736', true);
        });

        it('validates phone number', async () =>
        {
            const wrapper = createContactFormWrapper();

            const phoneInput = wrapper.get<HTMLInputElement>('input[type=tel]');

            await expectInputToHaveValidity(phoneInput, '', true);
            await expectInputToHaveValidity(phoneInput, 'Phone Number', false);
            await expectInputToHaveValidity(phoneInput, '0123456789', true);
            await expectInputToHaveValidity(phoneInput, '0123 456 789', true);
            await expectInputToHaveValidity(phoneInput, '+0123456789', true);
        });

        it('validates name', async () =>
        {
            const wrapper = createContactFormWrapper();

            const nameInput = wrapper.get<HTMLInputElement>('input[name=name]');

            await expectInputToHaveValidity(nameInput, '', true);
            await expectInputToHaveValidity(nameInput, 'Name Surname', true);
            await expectInputToHaveValidity(nameInput, 'Name# Surname', false);
            await expectInputToHaveValidity(nameInput, 'Name__Surname', false);
            await expectInputToHaveValidity(nameInput, 'NameSurname', true);
            await expectInputToHaveValidity(nameInput, '$$$$$$', false);
            await expectInputToHaveValidity(nameInput, 'Ňámě Śúřňämě', true);
        });
    });

    describe('submit', () =>
    {
        it('touches fields on submit', async () =>
        {
            const wrapper = createContactFormWrapper();

            const fields = wrapper.findAllComponents(ContactFormField);

            const requiredField = fields.find((field) => (
                field.get('input').element.required
            ))!;

            const classNameBeforeSubmit = requiredField.element.className;

            const formWrapper = wrapper.get('form');

            await formWrapper.trigger('submit');

            expect(classNameBeforeSubmit).toBeTruthy();
            expect(classNameBeforeSubmit).not.toBe(requiredField.element.className);
        });

        async function makeFormSubmittable(formWrapper: Omit<DOMWrapper<HTMLFormElement>, 'exists'>): Promise<void>
        {
            await formWrapper.get('input[type=email]').setValue('name.surname@email.com');
            await formWrapper.get('textarea').setValue('Random message');
        }

        it('does not submit if fields are invalid', async () =>
        {
            const wrapper = createContactFormWrapper();

            expect(fetchSpy).not.toHaveBeenCalled();

            const formWrapper = wrapper.get('form');

            await formWrapper.trigger('submit');

            expect(fetchSpy).not.toHaveBeenCalled();

            await makeFormSubmittable(formWrapper);

            await formWrapper.trigger('submit');

            expect(fetchSpy).toHaveBeenCalled();
        });

        it('submits site language', async () =>
        {
            const wrapper = createContactFormWrapper();

            expect(fetchSpy).not.toHaveBeenCalled();

            const formWrapper = wrapper.get('form');

            expect(formWrapper.find('input[name=lang]').exists()).toBe(true);
        });

        it('displays toast message on form submit', async () =>
        {
            const wrapper = createContactFormWrapper();

            expect(wrapper.findComponent(Toast).exists()).toBe(false);

            const formWrapper = wrapper.get('form');

            await makeFormSubmittable(formWrapper);

            await formWrapper.trigger('submit');

            expect(wrapper.findComponent(Toast).exists()).toBe(true);
        });

        it('resets form after successful submit', async () =>
        {
            const defaultFetch = window.fetch;

            const wrapper = createContactFormWrapper();

            const formWrapper = wrapper.get('form');

            const nameFieldWrapper = formWrapper.get<HTMLInputElement>('input[name=name]');

            await nameFieldWrapper.setValue('Aaa');

            window.fetch = () =>
            {
                throw new Error();
            };

            await formWrapper.trigger('submit');

            expect(nameFieldWrapper.element.value).toBe('Aaa');

            await makeFormSubmittable(formWrapper);

            window.fetch = defaultFetch;

            await formWrapper.trigger('submit');

            expect(nameFieldWrapper.element.value).toBe('');
        });
    });
});
