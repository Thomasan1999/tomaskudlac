<template>
    <form action="/contact-form/send-mail" class="contact-form" method="post" @submit.prevent="submitOn">
        <div
            v-for="(element, elementName) in elements"
            class="contact-form-element inline-block-container"
            :class="{[`error-form-element`]: element.errorShow}"
            :key="elementName"
             ref="elements"
        >
            <label
                class="contact-form-element-label"
                :for="element.htmlId"
            >{{`${text[elementName]}:${element.required ? `*` : ``}`}}</label>
            <input
                v-if="element.tag === `input`"
                class="contact-form-element-input"
                :style="{color: element.color}"
                :id="element.htmlId"
                :autocomplete="element.autocomplete"
                :minlength="element.length.min"
                :maxlength="element.length.max"
                :type="element.input"
                :value="element.value"
                @blur="elementBlurOn(element)"
                @focus="elementFocusOn(element)"
                @input="inputOn($event, element)"
            >
            <textarea
                v-else-if="element.tag === `textarea`"
                class="contact-form-element-textarea"
                :style="{color: element.color}"
                :id="element.htmlId"
                :value="element.value"
                @blur="elementBlurOn(element)"
                @focus="elementFocusOn(element)"
                @input="inputOn($event, element)"
            ></textarea>
        </div>
        <p class="contact-required-fields-legend">{{`* - ${text.requiredFields}`}}</p>
        <button class="contact-form-submit-button" type="submit">{{text.submit}}</button>
    </form>
</template>

<script lang="ts">
    import {mixins}                                              from 'vue-class-component';
    import {Component}                                           from 'vue-property-decorator';
    import text                                                  from '@/locales';
    import MainMixin                                             from '@/mixins/Main';
    import {FormElement, FormElementErrorType, FormDefaultsType} from '@/modules/contact/types/components.d';

    /** @description The component containing the contact form. */
    @Component({
        name: `ContactForm`
    })
    export default class ContactForm extends mixins(MainMixin)
    {
        /** @description Shows an alert. */
        public alertShow(alertType: string): void
        {
            this.$root.$emit(`alert-show`, alertType);
        }

        /**
         * @description Listens to the blur event of a form element.
         * @param element The form element which was the target of the event.
         * */
        public elementBlurOn(element: FormElement): void
        {
            element.inputting = false;
            this.elementErrorTypeUpdate(element);
        }

        /**
         * @description Updates properties of a form element which are based on other properties.
         * @param element The form element to modify.
         * */
        public elementComputedPropertiesUpdate(element: FormElement): void
        {
            this.elementFormDataUpdate(element);
            element.validLength = this.elementValueLengthIsValid(element);
            element.valid = this.validityGet(element);
            this.elementErrorTypeUpdate(element);
        }

        /**
         * @description Initializes all form elements and assigns them initial values of their properties based on their
         * types and data passed to the method.
         * @param elements Form elements to initialize.
         * @returns Form elements ready to be used in a form.
         * */
        public elementsInit(elements: { [s: string]: Partial<FormElement> }): { [s: string]: FormElement }
        {
            /** @description The object containing all possible default values of all form element properties. */
            const defaults: DeepReadonlyObject<{
                autocomplete: FormDefaultsType<string>,
                errorShow: FormDefaultsType<boolean>,
                errorType: FormDefaultsType<string>,
                input: FormDefaultsType<string>,
                inputting: FormDefaultsType<boolean>,
                length: FormDefaultsType<{ min: number, max: number }>,
                required: FormDefaultsType<boolean>,
                tag: FormDefaultsType<string>,
                type: FormDefaultsType<string>,
                valid: FormDefaultsType<boolean>,
                validLength: FormDefaultsType<boolean>,
                validateRegex: FormDefaultsType<RegExp>,
                value: { boolean: string, default: string, [s: string]: string }
            }> = {
                autocomplete: {
                    default: `off`,
                    email: `email`,
                    name: `name`,
                    tel: `tel`
                },
                errorShow: false,
                errorType: ``,
                input: {
                    default: ``,
                    email: `email`,
                    name: `text`,
                    tel: `tel`
                },
                inputting: false,
                length: {
                    default: {min: 0, max: 64},
                    message: {min: 0, max: 1024}
                },
                required: true,
                tag: {default: `input`, message: `textarea`},
                type: `any`,
                valid: true,
                validLength: true,
                validateRegex: {
                    default: /(.*)/,
                    email: /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    name: /^(\d|[\u0041-\u005a]|[\u00c0-\u024f]| )+$/i,
                    tel: /^(?:[+\d].*\d|\d)$/
                },
                value: {boolean: `false`, default: ``}
            };

            const componentName: string = this.$options.name!;

            Object.entries(elements).forEach(([elementName, element]) =>
            {
                const idNonParsed = `${componentName}-element-${elementName}`;

                const htmlId = new this.$String(idNonParsed).toTrainCase().toString();

                this.$set(element, `htmlId`, htmlId);

                this.$set(element, `name`, elementName);

                Object.entries(defaults).filter(([prop, defaultValue]: [string, any]) =>
                {
                    return !/^\${(.*)}$/.test(defaultValue) && typeof element[prop] === `undefined`;
                }).forEach(([prop, defaultValue]) =>
                {
                    const defaultValueDictionaryIs: boolean = typeof defaultValue === `object` && !(defaultValue instanceof RegExp);

                    if (!defaultValueDictionaryIs)
                    {
                        this.$set(element, prop, defaultValue);
                        return;
                    }

                    const elementTypeHasDefault: boolean = Object.keys(defaultValue).includes(element.type!);

                    this.$set(
                        element,
                        prop,
                        elementTypeHasDefault
                            ? defaultValue[element.type!]
                            : (defaultValue as Record<string, any>).default
                    );
                });

                this.elementFormDataUpdate(element as FormElement);

                const getterDefaults = Object.entries(defaults).filter(([, defaultValue]: [string, any]) =>
                {
                    return /^\${(.*)}$/.test(defaultValue);
                });

                getterDefaults.forEach(([prop, defaultValue]: [string, any]) =>
                {
                    let newValue: any = defaultValue;

                    if (prop === `valid`)
                    {
                        if (element.required)
                        {
                            newValue = this.validityGet(element as FormElement);
                        }
                        else
                        {
                            newValue = true;
                        }
                    }

                    this.$set(element, prop, newValue);
                });
            });

            return elements as Record<string, FormElement>;
        }

        /**
         * @description Determines whether and which error type should be displayed next to a form element.
         * @param element The form element to get the error type from.
         * @returns Error type, if empty error message is not displayed.
         * */
        public elementErrorTypeGet({inputting, required, valid, value}: FormElement): FormElementErrorType
        {
            if ((!value && !required) || inputting)
            {
                return ``;
            }

            if (!value)
            {
                return `empty`;
            }

            if (!valid)
            {
                return `invalid`;
            }

            return ``;
        }

        /**
         * @description Assigns an error type to a form element.
         * @param element The form element to assign the error type to.
         * */
        public elementErrorTypeUpdate(element: FormElement): void
        {
            element.errorType = this.elementErrorTypeGet(element);
            element.errorShow = Boolean(element.errorType);
        }

        /**
         * @description Listens to the focus event of a form element.
         * @param element The form element which was the target of the event.
         * */
        public elementFocusOn(element: FormElement): void
        {
            /** @description Prevents auto-inputting of some browsers. */
            if (element.color !== `transparent`)
            {
                return;
            }

            element.value = ``;
            element.color = ``;
        }

        /**
         * @description Updates the form data related to a form element.
         * @param element The form element to get the data from.
         * */
        public elementFormDataUpdate(element: FormElement): void
        {
            if (element.tag === `span`)
            {
                return;
            }

            this.formData[element.name] = element.value || null;
        }

        /** Blurs all form elements. */
        public formBlur(): void
        {
            Object.values(this.elements).forEach((element) =>
            {
                this.elementBlurOn(element);
            });
        }

        /** Creates a FormData object and fills it with the form data. */
        public formDataGet(): FormData
        {
            /**
             * @description The object to assign the form data to. It will store the data in a format which is easier
             * to parse by the server.
             * */
            const formData: FormData = new FormData();

            /** @description Assigns the form data to the object. */
            Object.entries(this.formData).filter(([, formFieldValue]: [string, any]) =>
            {
                return formFieldValue !== null;
            }).map(([formFieldName, formFieldValue]: [string, any]) =>
            {
                return formData.append(formFieldName, formFieldValue);
            });

            return formData;
        }

        /**
         * @description Submits the form to the server.
         * */
        public formSubmit(): void
        {
            this.formBlur();

            if (!this.valid)
            {
                return;
            }

            const formData = this.formDataGet();

            /** @description Sends the form data to the server. */
            this.$http.post(`/${this.url}`, formData).then(() =>
            {
                this.alertShow(`success`);
            }).catch((res) =>
            {
                if (res.status >= 500)
                {
                    this.alertShow(`serverError`);
                    return;
                }

                this.alertShow(`invalid`);
            });
        }

        /**
         * @description Listens to the blur event of a form element.
         * @param $event The data related to the event.
         * @param element The form element which was the target of the event.
         * */
        public inputOn($event: KeyboardEvent, element: FormElement): void
        {
            element.inputting = true;
            element.value = ($event.target as HTMLInputElement).value;
            this.elementComputedPropertiesUpdate(element);
        }

        /**
         * @description Determines whether the length of the form element value is valid.
         * @param element The form element to get the validity of its value length from..
         * @returns Whether the length of the form element value is valid.
         * */
        public elementValueLengthIsValid({length, value}: FormElement): boolean
        {
            return new this.$Range(length.min, length.max).includes(value.length);
        }

        /**
         * @description Listens to the submit event of the form.
         * */
        public submitOn(): void
        {
            const elementsValues = Object.values(this.elements);

            const someElementIsEmpty: boolean = elementsValues.filter((element) =>
            {
                return element.required;
            }).some((element: FormElement) =>
            {
                return !element.value;
            });

            if (someElementIsEmpty)
            {
                this.$root.$emit(`alert-show`, `empty`);
                return;
            }

            const someElementValueIsInvalid: boolean = elementsValues.some((element) =>
            {
                return !element.valid;
            });

            if (someElementValueIsInvalid)
            {
                this.$root.$emit(`alert-show`, `invalid`);
                return;
            }

            this.formData.lang = this.$store.state.lang;
            this.elementComputedPropertiesUpdate(this.extraElements.lang);
            this.formSubmit();
        }

        /**
         * @description Determines whether the form element value is valid.
         * @param element The form element to get the validity of the value from..
         * @returns Whether the form element value is valid.
         * */
        public validityGet({required, validateRegex, validLength, value}: FormElement): boolean
        {
            return (validateRegex.test(value) || (!value && !required)) && validLength;
        }

        /** @description The object containing all basic form elements. */
        public elements!: Record<string, FormElement>;

        /** @description The object containing all extra form elements which are not modifiable directly by the user. */
        public extraElements!: Record<string, FormElement>;

        public data()
        {
            return {
                elements: undefined,
                elementsExtra: undefined
            };
        }

        /** @description The object containing all the form data which will be sent to the server in case of submit. */
        public formData: { lang?: Lang, [s: string]: any } = {};

        /** @description The URL which will be called in case of a form submit. */
        public readonly url: string = `contact-form/send-mail`;

        /** @description The object containing all form elements. */
        public get allElements(): { [s: string]: FormElement }
        {
            return {
                ...this.elements, ...this.extraElements
            } as { [s: string]: FormElement };
        }

        /** @description Locales of the component. */
        public get text(): typeof text.sk.contact.form
        {
            return this.texts.contact.form;
        }

        /** @description Determines whether the form is valid. */
        public get valid(): boolean
        {
            const requiredElements = Object.values(this.allElements).filter((element) =>
            {
                return element.required;
            });

            return !requiredElements.some((element) =>
            {
                return !element.valid;
            });
        }

        public created()
        {
            this.elements = this.elementsInit({
                name: {
                    required: false,
                    type: `name`
                },
                email: {
                    required: true,
                    type: `email`
                },
                tel: {
                    required: false,
                    type: `tel`
                },
                message: {
                    required: true,
                    type: `message`
                }
            });
            this.extraElements = this.elementsInit({
                lang: {
                    value: this.$store.state.lang
                }
            });
        }
    }
</script>
<style lang="stylus" scoped>
    .contact-form
        display inline-block
        margin-right var(--contact-form-label-width)
        max-width 700px
        width 100%

        @media (max-width 767px)
            margin-right 0

    .contact-form-submit-button
        background-color var(--primary-color)
        border-color var(--primary-color)
        font-color #ffffff
        font-size 20px
        height 50px
        margin-left var(--contact-form-label-width)
        max-width 200px
        text-transform uppercase
        transition .25s
        width 100%

        &:hover
            background-color var(--primary-color-light)
            border-color var(--primary-color-light)

        @media (max-width 767px)
            margin-left 0

    .contact-form-element
        display inline-block
        font-size 16px
        margin-vertical 10px
        width 100%

        *
            font-family 'Montserrat', sans-serif

    .contact-form-element-label
        padding-top 7.5px
        width var(--contact-form-label-width)

        @media (max-width 767px)
            padding-bottom 5px

    .contact-form-element-input
        height 40px

    .contact-form-element-input, .contact-form-element-textarea
        appearance none
        background-color #2d2d2d
        border 1px #c
        box-shadow none
        box-sizing border-box
        font-color #ffffff
        font-size 16px
        line-height 40px
        max-width calc(700px - var(--contact-form-label-width))
        outline 0
        overflow auto
        padding-left 15px
        resize false
        width calc(100vw - var(--contact-form-label-width))

        @media (max-width 767px)
            width calc(100% - 30px)

    .contact-form-element-textarea
        height 192px
        line-height 24px
        padding-top 8px

    .error-form-element
        *
            font-color #cc0000

        .contact-form-element-input, .contact-form-element-textarea
            background-color #3e2d2d !important
            border 1px #cc0000
            box-sizing border-box

    .contact-required-fields-legend
        font-family 'Montserrat', sans-serif
        margin-left calc(var(--contact-form-label-width) / 2)
        margin-top 10px
        width 100%

        @media (max-width 767px)
            margin-left 0
</style>
