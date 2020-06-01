import VueHttp from './VueHttp';

/** @description Installs the VueHttp class as a plugin. */
export default class
{
    static install(Vue)
    {
        Vue.prototype.$http = VueHttp;
    }
}
