import dayjs from 'dayjs';

export default class
{
    static install(Vue)
    {
        Vue.prototype.$dayjs = dayjs;
    }
}
