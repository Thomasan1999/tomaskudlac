import Rand from './Rand';

export default class
{
    static install(Vue)
    {
        Vue.prototype.$Rand = Rand;
    }
}
