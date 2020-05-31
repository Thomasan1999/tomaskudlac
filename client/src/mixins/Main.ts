import {Component} from 'vue-property-decorator';
import Vue  from 'vue';
import text from '@/locales';

@Component
export default class MainMixin extends Vue
{
    get texts(): typeof text.sk
    {
        return this.$store.getters.texts as typeof text.sk;
    }
}
