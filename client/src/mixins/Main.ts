import {Component} from 'vue-property-decorator';
import Vue  from 'vue';
import text from '@/locales';

/** @description The global mixin. */
@Component
export default class MainMixin extends Vue
{
    /** @description All locales of the active language. */
    public get texts(): typeof text.sk
    {
        return this.$store.getters.texts as typeof text.sk;
    }
}
