import NumericRange from 'numeric-range';

export default class
{
    static install(Vue)
    {
        Vue.prototype.$Range = NumericRange;
    }
}
