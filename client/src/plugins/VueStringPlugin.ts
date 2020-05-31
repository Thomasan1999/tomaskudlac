import VueString from './VueString';

export default class
{
    static install(Vue)
    {
        Vue.prototype.$String = VueString;
    }
}
