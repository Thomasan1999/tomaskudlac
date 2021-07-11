import {computed, ref} from 'vue';
import {DeepReadonly} from 'ts-essentials';
import skLocales from '@/locales/sk';
import enLocales from '@/locales/en';
import age from '@/store/age';
import stringifyProgrammingLanguages from './stringifyProgrammingLanguages';
import {ImageFormat, ProgrammingLanguage, SiteLanguage} from '@/store/types';

class Store
{
    readonly age = age;
    readonly imageFormat = ref<ImageFormat>('webp');
    readonly isTouchscreen = computed(() =>
    {
        return this.windowWidth.value < 1024;
    });
    readonly language = ref('sk' as SiteLanguage);
    readonly locales = ref<typeof skLocales | typeof enLocales>(null as any);
    readonly navbarHeight = ref(60);
    readonly programmingLanguages: DeepReadonly<ProgrammingLanguage[]> = [
        {
            children: [
                {
                    home: true,
                    name: 'vueJs',
                    title: 'Vue.js'
                },
                {
                    home: true,
                    name: 'typescript',
                    title: 'TypeScript'
                },
                {
                    home: true,
                    name: 'nodeJs',
                    title: 'Node.js'
                }
            ],
            home: true,
            name: 'js',
            title: 'JS'
        },
        {
            an: true,
            home: true,
            name: 'html',
            title: 'HTML'
        },
        {
            children: [
                {
                    name: 'stylus',
                    title: 'Stylus'
                },
                {
                    name: 'scss',
                    title: 'SCSS'
                },
                {
                    name: 'less',
                    title: 'Less'
                }
            ],
            home: true,
            name: 'css',
            title: 'CSS'
        },
        {
            children: [
                {
                    home: true,
                    name: 'postgreSql',
                    title: 'PostgreSQL'
                }
            ],
            name: 'sql',
            title: 'SQL'
        },
        {
            children: [
                {
                    home: true,
                    name: 'mongoDb',
                    title: 'MongoDB'
                }
            ],
            name: 'noSql',
            title: 'NoSQL'
        },
        {
            home: true,
            name: 'php',
            title: 'PHP'
        }
    ];
    readonly programmingLanguagesString = computed(() =>
    {
        return stringifyProgrammingLanguages(this.programmingLanguages);
    });
    readonly windowHeight = ref(window.innerHeight);
    readonly windowWidth = ref(window.innerWidth);
}

const store = new Store();

export default store;
