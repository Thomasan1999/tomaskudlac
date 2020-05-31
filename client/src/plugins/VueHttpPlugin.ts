import VueHttp from './VueHttp';

export default class
{
    static install(Vue)
    {
        Vue.prototype.$http = VueHttp;
    }
}
