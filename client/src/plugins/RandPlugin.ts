import Rand from './Rand';

/** @description Installs the Rand class as a plugin. */
export default class
{
    static install(Vue)
    {
        Vue.prototype.$Rand = Rand;
    }
}
