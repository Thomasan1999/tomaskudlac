import {AboutMyselfColumnLocales} from '@/modules/about-myself/types/locales.d';

/** @description Locales of the About myself section. */
export default {
    /** @description The Free time activities column. */
    'freeTimeActivities': {
        'title': 'Voľnočasové záľuby',
        'text': 'Medzi moje záľuby patria <b>počítačové hry</b> (veľmi nečakané na IT-čkara), cez leto <b>plávanie, bicyklovanie</b> (raz za rok),'
            + ' <b>filozofovanie</b> o všeličom možnom (radšej sa zamýšľať nad rôznymi zaujímavými témami ako mať polhodinový rozhovor o počasí). Som <b>ambivert</b> (medzi'
            + ' introvertom a extrovertom), čiže rád trávim čas s ľuďmi, ale potrebujem nejaký čas aj sám pre seba.'
    } as AboutMyselfColumnLocales,
    /** @description The alt attribute of the image containing myself. */
    'myselfAlt': 'Fotka - Tomáš Kudláč',
    /** @description Title of the section. */
    'title': 'O mne',
    /** @description The Useful activities column. */
    'usefulActivities': {
        'title': 'Užitočné záľuby',
        'text': 'Kódujem v <b>${programmingLanguages}.</b> Čo sa týka rôznych frameworkov a knižníc, pokiaľ viem danú vec urobiť jednoducho a rýchlo sám, snažím sa im vyhnúť, ale ak mi vedia výrazne pomôcť, nemám problém ich použiť.'
    } as AboutMyselfColumnLocales,
    /** @description The Where am I now column. */
    'whereAmINow': {
        'title': 'Kde som teraz',
        'text': 'Mám <b>${age} rokov</b> a som <b>freelancer</b> (živnostník). Mojou pracovnou náplňou je'
            + ' <b>web development.</b> Väčšinu svojho času venujem projektu <b>FIFA maniaci</b>. Popritom vytváram webstránky pre rôznych klientov.'
    } as AboutMyselfColumnLocales
};
