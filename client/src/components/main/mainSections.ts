import MainSectionObject from '@/components/main/MainSectionObject';
import {reactive} from 'vue';

const mainSections: Record<string, MainSectionObject> = {
    aboutMyself: reactive(new MainSectionObject({
        heading: true,
        name: 'aboutMyself',
        order: 2,
    })),
    contact: reactive(new MainSectionObject({
        heading: true,
        name: 'contact',
        order: 3,
    })),
    home: reactive(new MainSectionObject({
        name: 'home',
        order: 0,
    })),
    projects: reactive(new MainSectionObject({
        heading: true,
        name: 'projects',
        order: 1
    }))
}

export default mainSections
