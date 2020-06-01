import NumericRange from 'numeric-range';

/** @description Installs the NumericRange library as a plugin. */
export default class
{
    static install(Vue)
    {
        Vue.prototype.$Range = NumericRange;
    }
}
