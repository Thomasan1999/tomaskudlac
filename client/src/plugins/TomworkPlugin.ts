import Tomwork from './Tomwork';

/** @description Installs the Tomwork class as a plugin. */
export default class
{
    static install(Vue)
    {
        Vue.prototype.$Tomwork = Tomwork;
    }
}
