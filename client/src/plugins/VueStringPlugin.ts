import VueString from './VueString';

/** @description Installs the VueString class as a plugin. */
export default class
{
    static install(Vue)
    {
        Vue.prototype.$String = VueString;
    }
}
