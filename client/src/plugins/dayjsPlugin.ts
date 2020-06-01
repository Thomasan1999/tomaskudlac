import dayjs from 'dayjs';

/** @description Installs the Day.js library as a plugin. */
export default class
{
    static install(Vue)
    {
        Vue.prototype.$dayjs = dayjs;
    }
}
