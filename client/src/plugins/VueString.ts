import router       from '../router';
import store        from '../store';
import texts        from '../locales';

/**
 * @description Adds helper methods to the String prototype. To perform string operations, the string value has to be extracted from the instance of this class, similar to
 * creating a string with new String().
 *  */
export default class VueString extends String
{
    /**
     * @description Creates an instance of the class.
     * @param val The string value of the instance, unlike regular String constructor, if undefined, defaults to an empty string.
     * */
    constructor(val: string = ``)
    {
        super(val);
    }

    /**
     * @description Converts the string value to camel case.
     * @returns A VueString instance containing the string value the method is performed on in camel case.
     * */
    public caseCamelTo(): VueString
    {
        return this.toString() ? new VueString(this.replace(/([_|-]\w)/g, (word) =>
        {
            return word[1].toUpperCase();
        })) : this;
    }

    /**
     * @description Converts the string value to train case.
     * @returns A VueString instance containing the string value the method is performed on in train case.
     * */
    public caseTrainTo(): VueString
    {
        return this.toString() ? new VueString(`${this[0].toLowerCase()}${this.slice(1).replace(/([A-Z][a-z])|([a-z][A-Z]$)/g, (match) =>
        {
            if (match[0].toLowerCase() === match[0])
            {
                return `${match[0]}-${match[1].toLowerCase()}`;
            }

            return `-${match[0].toLowerCase()}${match[1] || ``}`;
        })}`.toLowerCase().replace(/ /g, `-`).replace(/--/g, `-`)) : this;
    }

    /**
     * @description Converts the first character of the string value to lowercase.
     * @returns A VueString instance containing the string value the method is performed on with lowercase first character.
     * */
    public decapitalize(): VueString
    {
        return this.toString() ? new VueString(`${this[0].toLowerCase()}${this.slice(1)}`) : this;
    }

    /**
     * @description Removes all diacritics from the string value and converts the characters to their non-diacritic counterparts, e.g. á is converted to a, ö to o, etc.
     * @returns A VueString instance containing the string value the method is performed on without any diacritics.
     * */
    public diacriticsRemove(): VueString
    {
        return new VueString(this.normalize(`NFD`).replace(/[\u0300-\u036f]/g, ''));
    }

    /**
     * @description Parses the template language used in the application and returns a string to be displayed on the page.
     * @param variables Values to replace the placeholders in the template string, variables should correlate with the types used in the template string, otherwise,
     * unexpected behavior might occur, defaults to an empty object.
     * @returns A VueString instance containing a parsed string value the method is performed on.
     * */
    public htmlParse(variables: { [s: string]: any } = {}): VueString
    {
        /** @description Map of all values to be replaced by other values. */
        const replaceMap = {
            [`<b>`]: `<strong>`,
            [`</b>`]: `</strong>`,
            [`\n`]: `<br>`
        };

        return new VueString(this.replace(/\${[^}]*}/g, (expressionRaw) =>
        {
            /** @description String of a placeholder between the curly brackets.  */
            const variableName: string = expressionRaw.replace(/^\${/, ``).replace(/}$/, ``);

            /** @description Type of the value, which will replace the placeholder. */
            const [variableType] = (variableName.match(/^\w+(?=\|)/) || [] as RegExpMatchArray);

            /** @description The value which will replace the placeholder. */
            const result: string | undefined = (() =>
            {
                switch (variableType)
                {
                    case `href`:
                    {
                        /**
                         * @const type Type of the href value.
                         * @const route The URL address the href points to.
                         * @const locale The value which will be displayed in the link.
                         * @const flags Flags which add extra information to how should the link be created.
                         * */
                        const [, type, route, locale, flags] = variableName.split(`|`);

                        /** @description Prefix of the href value based on the type of the placeholder. */
                        const prefix = (() =>
                        {
                            switch (type)
                            {
                                case `mail`:
                                    return `mailto:`;
                                case `tel`:
                                    return `tel:`;
                                default:
                                    return ``;
                            }
                        })();

                        /** @description The part of the href string following the prefix. */
                        const href = (() =>
                        {
                            if (type === `internal` && route)
                            {
                                return `/${router.currentRoute.params.appType}/${new VueString(texts[store.state.lang][route].title).urlTo()}`;
                            }

                            return route;
                        })();

                        /** @description The target attribute of the Anchor tag.  */
                        const target = type === `external` || (flags && flags.split(`,`).includes(`_blank`) ? `target="_blank"` : ``);
                        return `<a href="${prefix}${href}" rel="noopener noreferrer" ${target}>${locale || route}</a>`;
                    }
                    default:
                    {
                        /** @description Variable to be parsed. */
                        const variable = variables[variableName];

                        if (typeof variable === `number`)
                        {
                            return new Intl.NumberFormat(`sk-SK`).format(variable);
                        }

                        return variable;
                    }
                }
            })();

            if (typeof result === `undefined` && `\${${variableName}}` === expressionRaw)
            {
                return expressionRaw;
            }

            return result || variableName;
        })).replaceArray(Object.keys(replaceMap), Object.values(replaceMap));
    }

    /**
     * @description Escapes any regex special characters found in the string value.
     * @returns A VueString instance containing a regex-escaped string value the method is performed on.
     * */
    public regexEscape(): VueString
    {
        return new VueString(this.replace(/([-[\]{}()*+?.\\^$|#,])/g, `\\$1`));
    }

    /**
     * @description Replaces multiple values at once.
     * @param find Values to be replaced.
     * @param replace Values to replace by.
     * @returns A VueString instance containing the string value the method is performed on with the replaced values.
     * */
    public replaceArray(find: string[], replace: string[]): VueString
    {
        return new VueString(find.reduce((a: string, regexRaw: string, index: number) =>
        {
            return a.replace(new RegExp(new VueString(regexRaw).regexEscape().toString(), `g`), replace[index]);
        }, this.toString()));
    }

    /**
     * @description Transforms the string in to a URL-safe format.
     * @param [vueStringReturn] Determines whether a VueString instance will be returned.
     * @returns A VueString instance or string containing the string value the method is performed on in URL-safe format.
     * */
    public urlTo(vueStringReturn: boolean = false): VueString | string
    {
        const url = this.diacriticsRemove().caseTrainTo().decapitalize();
        return vueStringReturn ? url : url.toString();
    }
}
