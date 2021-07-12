import {reactive} from 'vue';
import {DeepReadonly} from 'ts-essentials';
import skLocales from '@/locales/sk';
import enLocales from '@/locales/en';
import age from '@/store/age';
import stringifyProgrammingLanguages from './stringifyProgrammingLanguages';
import {ImageFormat, ProgrammingLanguage, SiteLanguage} from '@/store/types';

class Store
{
    age = age;
    imageFormat: ImageFormat ='webp';
    get isTouchscreen()
    {
        return this.windowWidth < 1024;
    }
    language: SiteLanguage = 'sk';
    locales: typeof skLocales | typeof enLocales = null as any;
    navbarHeight = 60;
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
    get programmingLanguagesString()
    {
        return stringifyProgrammingLanguages(this.programmingLanguages);
    }
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
}

const store = reactive(new Store());

export default store;
