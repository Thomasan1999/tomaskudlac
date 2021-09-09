import MainSectionObject from '@/components/main/MainSectionObject';
import {reactive} from 'vue';

const mainSections: Record<string, MainSectionObject> = reactive({
    aboutMyself: new MainSectionObject({
        heading: true,
        name: 'aboutMyself',
        order: 2
    }),
    contact: new MainSectionObject({
        heading: true,
        name: 'contact',
        order: 3
    }),
    home: new MainSectionObject({
        name: 'home',
        order: 0
    }),
    projects: new MainSectionObject({
        heading: true,
        name: 'projects',
        order: 1
    })
});

export default mainSections;
