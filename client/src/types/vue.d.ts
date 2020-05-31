import dayjs                                                                                                                             from 'dayjs';
import NumericRange                                                                                                                      from 'numeric-range';
import VueString                                                                                                                         from '@/plugins/VueString';
import VueHttp                                                                                                                           from '@/plugins/VueHttp';
import Tomwork                                                                                                                           from '@/plugins/Tomwork';
import Rand                                                                                                                              from '@/plugins/Rand';

declare module 'vue/types/vue'
{
    interface Vue
    {
        $dayjs(date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string): dayjs.Dayjs;
        $http: typeof VueHttp;
        $Rand: typeof Rand
        $Range: new (min: number, max: number) => NumericRange
        $String: new (str: string) => VueString;
        $Tomwork: typeof Tomwork
    }
}
