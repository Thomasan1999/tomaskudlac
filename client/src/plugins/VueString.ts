import NumericRange from 'numeric-range';
import router       from '../router';
import store from '../store';
import texts from '../locales';
// import VueDate   from '../plugins/VueDate';
// import VueNumber from '../plugins/VueNumber';

export default class VueString extends String
{
    constructor(val: string = ``)
    {
        super(val);
    }

    /*
     capitalize()
     {
     return this.toString() ? new VueString(`${this[0].toUpperCase()}${this.slice(1)}`) : this;
     }

     caseCamelSplit()
     {
     return this.toString() ? this.split(/(?=[A-Z])/).map((word) =>
     {
     return new VueString(word);
     }) : [];
     }
     */

    caseCamelTo(): VueString
    {
        return this.toString() ? new VueString(this.replace(/([_|-]\w)/g, (word) =>
        {
            return word[1].toUpperCase();
        })) : this;
    }

    caseTrainTo(): VueString
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

    decapitalize(): VueString
    {
        return this.toString() ? new VueString(`${this[0].toLowerCase()}${this.slice(1)}`) : this;
    }

    diacriticsRemove(): VueString
    {
        return new VueString(this.normalize(`NFD`).replace(/[\u0300-\u036f]/g, ''));
    }

    htmlParse(variables: { [s: string]: any } = {}): VueString
    {
        const replaceMap = {
            [`<b>`]: `<strong>`,
            [`</b>`]: `</strong>`,
            [`\n`]: `<br>`
        };

        return new VueString(this.replace(/\${[^}]*}/g, (expressionRaw) =>
        {
            const variableName = expressionRaw.replace(/^\${/, ``).replace(/}$/, ``);/* .replace(/env\.([A-Z]|_)+/, (variable) =>
         {
         return process.env[`VUE_APP_FM_${variable.split(`.`)[1]}`];
         }).replace(/(storeState|storeGetters)\.([a-zA-Z]|_|\.)+/, (expressionRaw) =>
         {
         return expressionRaw.split(`.`).reduce((a, variableProp) =>
         {
         return a[variableProp];
         }, store);
         }); */

            const [variableType] = (variableName.match(/^\w+(?=\|)/) || [] as RegExpMatchArray);

            const result: string | undefined = (() =>
            {
                switch (variableType)
                {
                    /*  case `currency`:
                     {
                     const [, variableOtherName] = variableName.split(`|`);

                     return new VueNumber(typeof variables[variableOtherName] === `undefined` ? variableOtherName : variables[variableOtherName]).currencyFormat;
                     }
                     case `date`:
                     {
                     const [, format, date] = variableName.split(`|`);

                     const dateExpr = variables[date] || date;

                     return Number.isNaN(Date.parse(dateExpr)) ? `` : new VueDate(dateExpr).format(format);
                     } */
                    case `dictionary`:
                    {
                        const [, wordKey, type, variableOtherName] = variableName.split(`|`);
                        const word = store.getters.texts.dictionary[wordKey];

                        switch (type)
                        {
                            case `number`:
                            {
                                const pluralIf = new NumericRange(2, 4).includes(variables[variableOtherName]) ? word.a.pl : word.g.pl;
                                return variables[variableOtherName] === 1 ? word.a.sg : pluralIf;
                            }
                            default:
                                return;
                        }
                    }
                    case `href`:
                    {
                        const [, type, route, localization, flags] = variableName.split(`|`);

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

                        const href = (() =>
                        {
                            if (type === `internal` && route)
                            {
                                return `/${router.currentRoute.params.appType}/${new VueString(texts[store.state.lang][route].title).urlTo()}`;
                            }

                            return route;
                        })();

                        // const target = type === `external` || flags?.split(`,`).includes(`_blank`) ? `target="_blank"` : ``;
                        const target = type === `external` || (flags && flags.split(`,`).includes(`_blank`) ? `target="_blank"` : ``);
                        return `<a href="${prefix}${href}" rel="noopener noreferrer" ${target}>${localization || route}</a>`;
                    }
                    case `number`:
                    {
                        const [, value] = variableName.split(`|`);

                        return new Intl.NumberFormat(`sk-SK`).format(Number(value));
                    }
                    default:
                    {
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

    regexEscape(): VueString
    {
        return new VueString(this.replace(/([-[\]{}()*+?.\\^$|#,])/g, `\\$1`));
    }

    replaceArray(find: string[] = [], replace: string[] = []): VueString
    {
        return new VueString(find.reduce((a: string, regexRaw: string, index: number) =>
        {
            return a.replace(new RegExp(new VueString(regexRaw).regexEscape().toString(), `g`), replace[index]);
        }, this.toString()));
    }

    urlTo(vueStringReturn: boolean = false): VueString | string
    {
        const url = this.diacriticsRemove().caseTrainTo().decapitalize();
        return vueStringReturn ? url : url.toString();
    }
}
