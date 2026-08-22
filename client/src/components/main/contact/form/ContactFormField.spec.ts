import mockInitStore from '@/mocks/mockInitStore';
import ContactFormField from '@/components/main/contact/form/ContactFormField.vue';
import ContactFormFieldError from '@/components/main/contact/form/ContactFormFieldError.vue';
import { ContactFormFieldElement } from '@/components/main/contact/form/types';
import ContactFormLabelText from '@/components/main/contact/form/ContactFormLabelText.vue';
import { buildCreateWrapper, getTestingSelector } from '@/utils/test';
import { nextTick } from 'vue';

const createWrapper = buildCreateWrapper(
    ContactFormField,
    {
        label: '',
        modelValue: '',
        name: 'name',
        touched: false,
        valid: true,
    },
    {
        global: {
            stubs: { ContactFormFieldError: true },
        },
    },
);

describe('ContactFormField', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    describe('HTML attributes', () => {
        it('renders label text', async () => {
            const wrapper = createWrapper();

            expect(wrapper.findComponent(ContactFormLabelText).exists()).toBe(true);
        });

        it("renders HTML element used in 'element' property", async () => {
            let element = ContactFormFieldElement.INPUT;

            const wrapper = createWrapper({ element });

            expect(wrapper.find(element).exists()).toBe(true);
            expect(wrapper.find('textarea').exists()).toBe(false);

            element = ContactFormFieldElement.TEXTAREA;

            await wrapper.setProps({ element });

            expect(wrapper.find(element).exists()).toBe(true);
            expect(wrapper.find('input').exists()).toBe(false);
        });

        it("uses 'modelValue' property as input value", () => {
            const modelValue = 'Some model value';

            const wrapper = createWrapper({ element: ContactFormFieldElement.INPUT, modelValue });

            const inputElement = wrapper.get('input');

            expect(inputElement.element.value).toBe(modelValue);
        });

        async function checkInputAttribute<AttributeType>(
            attributeName: string,
            attributeValues: AttributeType[],
            htmlAttributeName: string = attributeName,
            htmlAttributeValues: AttributeType[] = attributeValues,
        ): Promise<void> {
            const wrapper = createWrapper({ element: ContactFormFieldElement.INPUT });

            const inputElement = wrapper.get('input');

            for await (const attributeValue of htmlAttributeValues) {
                await wrapper.setProps({ [attributeName]: attributeValue });

                expect(inputElement.element[htmlAttributeName as keyof HTMLInputElement]).toBe(attributeValue);
            }
        }

        it("uses 'maxlength' property", async () => {
            await checkInputAttribute<number>('maxlength', [32, 256], 'maxLength');
        });

        it("uses 'minlength' property", async () => {
            await checkInputAttribute<number>('minlength', [6, 36], 'minLength');
        });

        it("uses 'name' property", async () => {
            await checkInputAttribute<string>('name', ['email', 'phone']);
        });

        it("uses 'required' property", async () => {
            await checkInputAttribute<boolean>('required', [true, false]);
        });

        it("uses 'type' property", async () => {
            await checkInputAttribute<string>('type', ['color', 'tel']);
        });
    });

    /**
     * A wrapping label does not associate anything on its own, and `aria-describedby` has no reflected DOM property,
     * so writing it in camelCase silently produced an `ariadescribedby` attribute that nothing reads. The ids also
     * have to carry the field name - taken from the prop, not from the global `name` that shadows it.
     */
    describe('accessible wiring', () => {
        it('gives the control an id derived from the field name', () => {
            const wrapper = createWrapper({ name: 'email' });

            expect(wrapper.get('input').attributes('id')).toBe('contact-form-email');
            expect(wrapper.get('label').attributes('for')).toBe('contact-form-email');
        });

        it('points the control at its error message once one is shown', async () => {
            const wrapper = createWrapper(
                { name: 'email', required: true, touched: true, valid: false },
                { global: { stubs: { ContactFormFieldError: false } } },
            );

            await nextTick();

            const errorId = wrapper.get(getTestingSelector('contact-form-field-error')).attributes('id');

            expect(errorId).toBe('contact-form-email-error');
            expect(wrapper.get('input').attributes('aria-describedby')).toBe(errorId);
            expect(wrapper.get('input').attributes('aria-invalid')).toBe('true');
        });
    });

    describe('error', () => {
        function expectErrorToBeShown(wrapper: ReturnType<typeof createWrapper>, value: boolean): void {
            const errorComponent = wrapper.findComponent(ContactFormFieldError);

            expect(errorComponent.find('*').exists()).toBe(value);
        }

        it('uses different styles for wrapper element when error is shown', async () => {
            const wrapper = createWrapper({
                modelValue: '',
                required: true,
                touched: false,
                valid: false,
            });

            const classNameWithoutError = wrapper.element.className;

            await wrapper.setProps({ touched: true });

            expect(classNameWithoutError).toBeTruthy();
            expect(classNameWithoutError).not.toBe(wrapper.element.className);
        });

        it('shows error only if input is touched and value is invalid', async () => {
            const wrapper = createWrapper(
                { required: true, touched: false, valid: true },
                {
                    global: {
                        stubs: { ContactFormFieldError: false },
                    },
                },
            );

            expectErrorToBeShown(wrapper, false);

            await wrapper.setProps({ touched: true });

            expectErrorToBeShown(wrapper, false);

            await wrapper.setProps({ valid: false });

            expectErrorToBeShown(wrapper, true);
        });

        it('does not show error if input is empty and not required', async () => {
            const wrapper = createWrapper(
                { modelValue: '', pattern: /\d+/g, required: false, touched: true, valid: false },
                {
                    global: {
                        stubs: { ContactFormFieldError: false },
                    },
                },
            );

            await wrapper.get('input').setValue('lorem ipsum');
            await wrapper.get('input').trigger('blur');

            expectErrorToBeShown(wrapper, true);

            await wrapper.get('input').setValue('');
            await wrapper.get('input').trigger('blur');

            expectErrorToBeShown(wrapper, false);
        });
    });

    describe('events', () => {
        it("emits 'blur' event on input blur", async () => {
            const wrapper = createWrapper({ element: ContactFormFieldElement.INPUT });

            expect(wrapper.emitted('blur')).toBeUndefined();

            await wrapper.get('input').trigger('blur');

            expect(wrapper.emitted('blur')).toHaveLength(1);
        });

        it("emits 'update:modelValue' on input", async () => {
            const wrapper = createWrapper({ element: ContactFormFieldElement.INPUT, modelValue: '' });

            expect(wrapper.emitted()['update:modelValue']).toBeUndefined();

            await wrapper.get('input').setValue('Input value');

            expect(wrapper.get('input').element.value).toBe('Input value');
            expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
        });

        it("emits 'validSet' on model value change", async () => {
            const wrapper = createWrapper({ element: ContactFormFieldElement.INPUT, modelValue: '' });

            expect(wrapper.emitted('validSet')).toBeUndefined();

            await wrapper.setProps({ modelValue: 'Input value' });

            expect(wrapper.emitted('validSet')).toHaveLength(1);
        });
    });
});
