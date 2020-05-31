<template>
    <form action="/contact-form/send-mail" class="contact-form" method="post" @submit.prevent="submitOn">
        <div v-for="(element, elementName) in elements" class="element inline-block-container" :class="{[`error-form-element`]: element.errorShow}" :key="elementName"
             ref="elements">
            <label :for="element.htmlName" v-html="new $String(`${text[elementName]}:${element.required ? `*` : ``}`).htmlParse()"></label>
            <input v-if="element.tag === `input`" :style="{color: element.color}" :id="element.htmlName" :autocomplete="element.autocomplete" :minlength="element.length.min"
                   :maxlength="element.length.max"
                   :type="element.input" :value="element.value" @blur="blurOn(element)" @focus="focusOn(element)" @input="inputOn($event, element)">
            <textarea v-else-if="element.tag === `textarea`" :style="{color: element.color}" :id="element.htmlName" :value="element.value" @blur="blurOn(element)"
                      @focus="focusOn(element)" @input="inputOn($event, element)"></textarea>
        </div>
        <p class="contact-required-fields-legend" v-html="new $String(`* - ${text.requiredFields}`).htmlParse()"></p>
        <button type="submit" v-html="new $String(text.submit).htmlParse()"></button>
    </form>
</template>

<script lang="ts">
    import {mixins}    from 'vue-class-component';
    import {Component} from 'vue-property-decorator';
    import text      from '@/locales';
    import MainMixin from '@/mixins/Main';

    type FormElementErrorType = 'empty' | 'invalid' | '';

    type FormElement = {
        color: string,
        errorShow: boolean,
        errorType: FormElementErrorType,
        readonly htmlName: string,
        inputting: boolean,
        readonly length: { min: number, max: number },
        readonly name: string,
        readonly required: boolean,
        readonly tag: 'input' | 'textarea' | 'span',
        readonly type: string,
        valid: boolean,
        readonly validateRegex: RegExp,
        validLength: boolean,
        value: string
    }

    type FormElements = 'email' | 'message' | 'name' | 'tel';
    type FormDefaults = 'default' | FormElements;

    @Component({
        name: `ContactForm`
    })
    export default class ContactForm extends mixins(MainMixin)
    {
        public blurOn(element: FormElement): void
        {
            element.inputting = false;
            this.errorTypeUpdate(element);
        }

        public computedPropertiesUpdate(element: FormElement): void
        {
            this.formDataUpdate(element);
            element.validLength = this.lengthValidityGet(element);
            element.valid = this.validityGet(element);
            this.errorTypeUpdate(element);
        }

        public elementsInit(elements: { [s: string]: Partial<FormElement> }): { [s: string]: FormElement }
        {
            type FormType<T> = { [s in FormDefaults]?: T } | T;

            const defaults: DeepReadonlyObject<{
                autocomplete: FormType<string>,
                errorShow: FormType<boolean>,
                errorType: FormType<string>,
                input: FormType<string>,
                inputting: FormType<boolean>,
                length: FormType<{ min: number, max: number }>,
                required: FormType<boolean>,
                tag: FormType<string>,
                type: FormType<string>,
                valid: FormType<boolean>,
                validLength: FormType<boolean>,
                validateRegex: FormType<RegExp>,
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

            Object.entries(elements).forEach(([elementName, element]) =>
            {
                this.$set(element, `htmlName`, new this.$String(`${(this.$options.name as string).replace(`FormElement`, ``)}-${elementName}`).caseTrainTo().toString());
                this.$set(element, `name`, (elementName.match(/(\w+)$/) || [])[0]);

                Object.entries(defaults).filter(([prop, defaultValue]: [string, any]) =>
                {
                    return !/^\${(.*)}$/.test(defaultValue) && typeof element[prop] === `undefined`;
                }).forEach(([prop, defaultValue]) =>
                {
                    if (typeof defaultValue === `object` && !(defaultValue instanceof RegExp))
                    {
                        this.$set(element, prop, Object.keys(defaultValue).includes(element.type as string) ? defaultValue[element.type as string]
                            : (defaultValue as { default: any }).default);
                        return;
                    }

                    this.$set(element, prop, defaultValue);
                });

                this.formDataUpdate(element as FormElement);

                Object.entries(defaults).filter(([, defaultValue]: [string, any]) =>
                {
                    return /^\${(.*)}$/.test(defaultValue);
                }).forEach(([prop, defaultValue]: [string, any]) =>
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

            return elements as { [s: string]: FormElement };
        }

        public errorTypeGet({inputting, required, valid, value}: FormElement): FormElementErrorType
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

        public errorTypeUpdate(element: FormElement)
        {
            element.errorType = this.errorTypeGet(element);
            element.errorShow = Boolean(element.errorType);
        }

        public focusOn(element: FormElement): void
        {
            if (element.color !== `transparent`)
            {
                return;
            }

            element.value = ``;
            element.color = ``;
        }

        public formDataUpdate(element: FormElement): void
        {
            if (element.tag === `span`)
            {
                return;
            }

            this.formData[element.name] = element.value || null;
        }

        public formSubmit(): void
        {
            if (!this.valid)
            {
                return;
            }

            Object.keys(this.elements).forEach((name: string) =>
            {
                this.elements[name].inputting = false;
            });

            const formData: FormData = new FormData();

            Object.entries(this.formData).filter(([, formFieldValue]: [string, any]) =>
            {
                return formFieldValue !== null;
            }).map(([formFieldName, formFieldValue]: [string, any]) =>
            {
                return formData.append(formFieldName, formFieldValue);
            });

            this.$http.post(`/${this.url}`, formData).then(() =>
            {
                this.$root.$emit(`alert-show`, `success`);
            }).catch((res) =>
            {
                if (res.status >= 500)
                {
                    this.$root.$emit(`alert-show`, `serverError`);
                    return;
                }

                this.$root.$emit(`alert-show`, `invalid`);
            });
        }

        public inputOn($event: KeyboardEvent, element: FormElement): void
        {
            element.inputting = true;
            element.value = ($event.target as HTMLInputElement).value;
            this.computedPropertiesUpdate(element);
        }

        public lengthValidityGet({length, value}: FormElement): boolean
        {
            return new this.$Range(length.min, length.max).includes(value.length);
        }

        public submitOn(): void
        {
            if (Object.values(this.elements).filter((element) =>
            {
                return element.required;
            }).some((element: FormElement) =>
            {
                return !element.value;
            }))
            {
                this.$root.$emit(`alert-show`, `empty`);
                return;
            }

            if (Object.values(this.elements).some((element) =>
            {
                return !element.valid;
            }))
            {
                this.$root.$emit(`alert-show`, `invalid`);
                return;
            }

            this.formData.lang = this.$store.state.lang;
            this.computedPropertiesUpdate(this.elementsExtra.lang);
            this.formSubmit();
        }

        public validityGet({required, validateRegex, validLength, value}: FormElement): boolean
        {
            return (validateRegex.test(value) || (!value && !required)) && validLength;
        }

        public elements!: { [s: string]: FormElement };

        public elementsExtra!: { [s: string]: FormElement };

        public data()
        {
            return {
                elements: undefined,
                elementsExtra: undefined
            };
        }

        public formData: { lang?: Lang, [s: string]: any } = {};
        public readonly url: string = `contact-form/send-mail`;

        public get elementsAll(): { [s: string]: FormElement }
        {
            return {
                ...this.elements, ...this.elementsExtra
            } as { [s: string]: FormElement };
        }

        public get text(): typeof text.sk.contact.form
        {
            return this.texts.contact.form;
        }

        public get valid(): boolean
        {
            return !Object.values(this.elementsAll).filter((element) =>
            {
                return element.required;
            }).some((element) =>
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
            this.elementsExtra = this.elementsInit({
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
        margin-right $label_width
        max-width 700px
        width 100%

        @media (max-width 767px)
            margin-right 0

    button
        background-color $primary_color
        border-color $primary_color
        font-color #ffffff
        font-size 20px
        height 50px
        margin-left $label_width
        max-width 200px
        text-transform uppercase
        transition .25s
        width 100%

        &:hover
            background-color $primary_color_light
            border-color $primary_color_light

        @media (max-width 767px)
            margin-left 0

    .element
        display inline-block
        font-size 16px
        margin-vertical 10px
        width 100%

        *
            font-family 'Montserrat', sans-serif

    label
        padding-top 7.5px
        width $label_width

        @media (max-width 767px)
            padding-bottom 5px

    input
        height 40px

    input, textarea
        appearance none
        background-color #2d2d2d
        border 1px #c
        box-shadow none
        box-sizing border-box
        font-color #ffffff
        font-size 16px
        line-height 40px
        max-width (700px - $label_width)
        outline 0
        overflow auto
        padding-left 15px
        resize false
        width "calc(100vw - %s)" % $label_width

        @media (max-width 767px)
            width calc(100% - 30px)

    textarea
        height 192px
        line-height 24px
        padding-top 8px

    .error-form-element
        *
            font-color #cc0000

        input, textarea
            background-color #3e2d2d !important
            border 1px #cc0000
            box-sizing border-box


    .contact-required-fields-legend
        font-family 'Montserrat', sans-serif
        margin-left ($label_width / 2)
        margin-top 10px
        width 100%

        @media (max-width 767px)
            margin-left 0
</style>
