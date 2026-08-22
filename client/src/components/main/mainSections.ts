import MainSectionObject from '@/components/main/MainSectionObject';
import { MainSectionName } from '@/locales/types';

/**
 * Immutable section configuration. Not `reactive` - the only dynamic member is `title`, which reads the store and so
 * is already reactive through it.
 */
const mainSections: Record<MainSectionName, MainSectionObject> = {
    aboutMyself: new MainSectionObject({
        heading: true,
        name: 'aboutMyself',
        order: 2,
    }),
    contact: new MainSectionObject({
        heading: true,
        name: 'contact',
        order: 3,
    }),
    home: new MainSectionObject({
        name: 'home',
        order: 0,
    }),
    projects: new MainSectionObject({
        heading: true,
        name: 'projects',
        order: 1,
    }),
};

export default mainSections;
