import {Pinia} from 'pinia';
import mockInitStore from '@/mocks/mockInitStore';
import {mount, MountingOptions, VueWrapper} from '@vue/test-utils';
import ContactFormField from '@/components/main/contact/ContactFormField.vue';
import ContactFormFieldError from '@/components/main/contact/ContactFormFieldError.vue';

describe('ContactFormField', () =>
{
    let pinia: Pinia;

    beforeAll(async () =>
    {
        pinia = await mockInitStore();
    });

    function createContactFormFieldWrapper(
        props: MountingOptions<any>['props'] = {},
        shouldStub: boolean = true
    ): VueWrapper
    {
        const defaultProps = {
            label: '',
            modelValue: '',
            name: '',
            touched: false,
            valid: true
        };

        return mount(ContactFormField, {
            global: {
                plugins: [pinia],
                ...(shouldStub && {stubs: ['ContactFormFieldError']})
            },
            props: {
                ...defaultProps,
                ...props
            }
        });
    }

    describe('HTML attributes', () =>
    {
        it('renders label text', async () =>
        {
            let label = 'Field label';

            const wrapper = createContactFormFieldWrapper({label});

            const labelElement = wrapper.get('[data-testid="label"]');

            expect(labelElement.text()).toContain(label);

            label = 'Something different';

            await wrapper.setProps({label});

            expect(labelElement.text()).toContain(label);
        });

        it('renders HTML element used in \'element\' property', async () =>
        {
            let element = 'input';

            const wrapper = createContactFormFieldWrapper({element});

            expect(wrapper.find(element).exists()).toBe(true);
            expect(wrapper.find('textarea').exists()).toBe(false);

            element = 'textarea';

            await wrapper.setProps({element});

            expect(wrapper.find(element).exists()).toBe(true);
            expect(wrapper.find('input').exists()).toBe(false);
        });

        it('uses \'modelValue\' property as input value', () =>
        {
            const modelValue = 'Some model value';

            const wrapper = createContactFormFieldWrapper({element: 'input', modelValue});

            const inputElement = wrapper.get('input');

            expect(inputElement.element.value).toBe(modelValue);
        });

        async function checkInputAttribute<AttributeType, HtmlAttributeType = AttributeType>(
            attributeName: string,
            attributeValues: AttributeType[],
            htmlAttributeName: string = attributeName,
            htmlAttributeValues: HtmlAttributeType[] = attributeValues as any
        ): Promise<void>
        {
            const wrapper = createContactFormFieldWrapper({element: 'input'});

            const inputElement = wrapper.get('input');

            for await (const attributeValue of htmlAttributeValues)
            {
                await wrapper.setProps({[attributeName]: attributeValue});

                expect(inputElement.element[htmlAttributeName]).toBe(attributeValue);
            }
        }

        it('uses \'maxlength\' property', async () =>
        {
            await checkInputAttribute<number>('maxlength', [32, 256], 'maxLength');
        });

        it('uses \'minlength\' property', async () =>
        {
            await checkInputAttribute<number>('minlength', [6, 36], 'minLength');
        });

        it('uses \'name\' property', async () =>
        {
            await checkInputAttribute<string>('name', ['email', 'phone']);
        });

        it('uses \'required\' property', async () =>
        {
            await checkInputAttribute<boolean>('required', [true, false]);
        });

        it('uses \'type\' property', async () =>
        {
            await checkInputAttribute<string>('type', ['color', 'tel']);
        });
    });

    describe('error', () =>
    {
        it('uses different styles for wrapper element when error is shown', async () =>
        {
            const wrapper = createContactFormFieldWrapper(
                {required: true, touched: false, valid: false, value: ''}
            );

            const classNameWithoutError = wrapper.element.className;

            await wrapper.setProps({touched: true});

            expect(classNameWithoutError).toBeTruthy();
            expect(classNameWithoutError).not.toBe(wrapper.element.className);
        });

        it('shows error only if input is touched and value is invalid', async () =>
        {
            function expectErrorToBeShown(value: boolean): void
            {
                const errorComponent = wrapper.findComponent(ContactFormFieldError);

                expect(errorComponent.find('*').exists()).toBe(value);
            }

            const wrapper = createContactFormFieldWrapper(
                {required: true, touched: false, valid: true},
                false
            );

            expectErrorToBeShown(false);

            await wrapper.setProps({touched: true});

            expectErrorToBeShown(false);

            await wrapper.setProps({valid: false});

            expectErrorToBeShown(true);
        });
    });

    describe('events', () =>
    {
        it('emits \'blur\' event on input blur', async () =>
        {
            const wrapper = createContactFormFieldWrapper({element: 'input'});

            expect(wrapper.emitted().blur).toBeUndefined();

            await wrapper.get('input').trigger('blur');

            expect(wrapper.emitted().blur).toHaveLength(1);
        });

        it('emits \'update:modelValue\' on input', async () =>
        {
            const wrapper = createContactFormFieldWrapper({element: 'input', value: ''});

            expect(wrapper.emitted()['update:modelValue']).toBeUndefined();

            await wrapper.get('input').setValue('Input value');

            expect(wrapper.get('input').element.value).toBe('Input value');
            expect(wrapper.emitted()['update:modelValue']).toHaveLength(1);
        });

        it('emits \'validSet\' on model value change', async () =>
        {
            const wrapper = createContactFormFieldWrapper({element: 'input', value: ''});

            expect(wrapper.emitted().validSet).toBeUndefined();

            await wrapper.setProps({modelValue: 'Input value'});

            expect(wrapper.emitted().validSet).toHaveLength(1);
        });
    });
});
