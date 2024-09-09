import mockInitStore from '@/mocks/mockInitStore';
import ContactFormField from '@/components/main/contact/form/ContactFormField.vue';
import ContactFormFieldError from '@/components/main/contact/form/ContactFormFieldError.vue';
import { ContactFormFieldElement, ContactFormFieldProps } from '@/components/main/contact/form/types';
import ContactFormLabelText from '@/components/main/contact/form/ContactFormLabelText.vue';
import { buildCreateWrapper, buildSetProps } from '@/utils/test';
import { ComponentPropsWithModelValue } from '@/utils/types';

describe('ContactFormField', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    const createContactFormFieldWrapper = buildCreateWrapper(
        ContactFormField,
        {
            label: '',
            modelValue: '',
            name: '',
            touched: false,
            valid: true,
        },
        {
            global: {
                stubs: { ContactFormFieldError: true },
            },
        },
    );
    const setProps = buildSetProps<ComponentPropsWithModelValue<ContactFormFieldProps, string>>();

    describe('HTML attributes', () => {
        it('renders label text', async () => {
            const wrapper = createContactFormFieldWrapper();

            expect(wrapper.findComponent(ContactFormLabelText).exists()).toBe(true);
        });

        it("renders HTML element used in 'element' property", async () => {
            let element = ContactFormFieldElement.INPUT;

            const wrapper = createContactFormFieldWrapper({ element });

            expect(wrapper.find(element).exists()).toBe(true);
            expect(wrapper.find('textarea').exists()).toBe(false);

            element = ContactFormFieldElement.TEXTAREA;

            await setProps(wrapper, { element });

            expect(wrapper.find(element).exists()).toBe(true);
            expect(wrapper.find('input').exists()).toBe(false);
        });

        it("uses 'modelValue' property as input value", () => {
            const modelValue = 'Some model value';

            const wrapper = createContactFormFieldWrapper({ element: ContactFormFieldElement.INPUT, modelValue });

            const inputElement = wrapper.get('input');

            expect(inputElement.element.value).toBe(modelValue);
        });

        async function checkInputAttribute<AttributeType>(
            attributeName: string,
            attributeValues: AttributeType[],
            htmlAttributeName: string = attributeName,
            htmlAttributeValues: AttributeType[] = attributeValues,
        ): Promise<void> {
            const wrapper = createContactFormFieldWrapper({ element: ContactFormFieldElement.INPUT });

            const inputElement = wrapper.get('input');

            for await (const attributeValue of htmlAttributeValues) {
                await setProps(wrapper, { [attributeName]: attributeValue });

                expect(inputElement.element[htmlAttributeName]).toBe(attributeValue);
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

    describe('error', () => {
        it('uses different styles for wrapper element when error is shown', async () => {
            const wrapper = createContactFormFieldWrapper({
                modelValue: '',
                required: true,
                touched: false,
                valid: false,
            });

            const classNameWithoutError = wrapper.element.className;

            await setProps(wrapper, { touched: true });

            expect(classNameWithoutError).toBeTruthy();
            expect(classNameWithoutError).not.toBe(wrapper.element.className);
        });

        it('shows error only if input is touched and value is invalid', async () => {
            function expectErrorToBeShown(value: boolean): void {
                const errorComponent = wrapper.findComponent(ContactFormFieldError);

                expect(errorComponent.find('*').exists()).toBe(value);
            }

            const wrapper = createContactFormFieldWrapper(
                { required: true, touched: false, valid: true },
                {
                    global: {
                        stubs: { ContactFormFieldError: false },
                    },
                },
            );

            expectErrorToBeShown(false);

            await setProps(wrapper, { touched: true });

            expectErrorToBeShown(false);

            await setProps(wrapper, { valid: false });

            expectErrorToBeShown(true);
        });
    });

    describe('events', () => {
        it("emits 'blur' event on input blur", async () => {
            const wrapper = createContactFormFieldWrapper({ element: ContactFormFieldElement.INPUT });

            expect(wrapper.emitted().blur).toBeUndefined();

            await wrapper.get('input').trigger('blur');

            expect(wrapper.emitted().blur).toHaveLength(1);
        });

        it("emits 'update:modelValue' on input", async () => {
            const wrapper = createContactFormFieldWrapper({ element: ContactFormFieldElement.INPUT, modelValue: '' });

            expect(wrapper.emitted()['update:modelValue']).toBeUndefined();

            await wrapper.get('input').setValue('Input value');

            expect(wrapper.get('input').element.value).toBe('Input value');
            expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
        });

        it("emits 'validSet' on model value change", async () => {
            const wrapper = createContactFormFieldWrapper({ element: ContactFormFieldElement.INPUT, modelValue: '' });

            expect(wrapper.emitted().validSet).toBeUndefined();

            await setProps(wrapper, { modelValue: 'Input value' });

            expect(wrapper.emitted().validSet).toHaveLength(1);
        });
    });
});
