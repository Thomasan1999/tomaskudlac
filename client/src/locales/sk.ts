export default {
    cookies: {
        closeButtonTitle: 'Zavrieť',
        paragraphs: [
            {
                title: 'Súbory cookie',
                text: 'S cieľom získať štatistiky ohľadom používania tejto webovej stránky ukladáme na vašom zariadení malé dátové súbory, tzv. cookie. Je to bežná prax väčšiny veľkých webových stránok.',
            },
            {
                title: 'Čo je súbor cookie?',
                text: 'Súbor cookie je malý textový súbor, ktorý webová lokalita ukladá vo vašom počítači alebo mobilnom zariadení pri jej prehliadaní. Vďaka tomuto súboru si webová lokalita na určitý čas uchováva informácie o vašich krokoch a preferenciách (ako sú prihlasovacie meno, jazyk, veľkosť písma a iné nastavenia zobrazovania), takže ich pri ďalšej návšteve stránky alebo prehliadaní jej jednotlivých podstránok nemusíte opätovne uvádzať.',
            },
            {
                title: 'Ako používame súbory cookie?',
                text: 'Súbory cookie používame pre vytvorenie štatistík ohľadom spôsobu používania tejto webovej stránky a následné využitie týchto štatistík pre zvýšenie pohodlia pri jej používaní a na dočasné uchovávanie informácií o prihlásenom používateľovi.',
            },
            {
                title: 'Ako kontrolovať súbory cookie?',
                text: 'Súbory cookie môžete kontrolovať alebo zmazať podľa uváženia. Môžete vymazať všetky súbory cookie uložené vo svojom počítači a väčšinu prehliadačov môžete nastaviť tak, aby ste im znemožnili ich ukladanie.',
            },
            {
                title: 'Ako odmietnuť používanie súborov cookie?',
                text: 'Používanie súborov cookie je možné nastaviť pomocou vášho internetového prehliadača. Väčšina prehliadačov súbory cookie automaticky prijíma už v úvodnom nastavení.',
            },
        ],
    },
    footer: {
        copyrightLinkTitle: 'Zobraziť informácie o tom, čo sú cookies',
        copyrightLinkText: 'cookies',
        copyrightText: '© 2017 - 2026 Všetky práva vyhradené. Táto stránka používa',
    },
    navbar: {
        hide: 'Skryť menu',
        otherLangCode: 'EN',
        otherLangHref: '/en/',
        otherLangLinkTitle: 'Prepnúť do angličtiny',
        show: 'Otvoriť menu',
    },
    sections: {
        aboutMyself: {
            columns: [
                {
                    title: 'Kde som teraz',
                    text: `Mám *{{age}} rokov* a pracujem na *živnosť* (freelance). Mojou pracovnou náplňou je *web development* 
                    (vývoj webových stránok a aplikácií). Momentálne pracujem na front-ende projektu vyvíjanom vo *Vue.js* 
                    a *TypeScript*-e. S technológiami som spokojný a chcel by som ich používať aj do budúcna.`,
                },
                {
                    title: 'Voľnočasové záľuby',
                    text: `Medzi moje záľuby patria *počítačové hry* (veľmi nečakané na IT-čkara), *plávanie* (cez leto),
                    *bicyklovanie* (raz za rok), *história* (baví ma sledovať, ako ľudia robia stále to isté, len za 
                    iných podmienok) a *zamýšľanie sa nad životom*.`,
                },
                {
                    title: 'Užitočné záľuby',
                    text: `Ovládam *{{programmingLanguages}}*. Rád sa učím novým technológiám a skúmám, ako sa vyvíjajú. 
                    Pomáha mi to byť v obraze a využiť každú novú príležitosť na to byť lepší vývojár.`,
                },
            ] as { title: string; text: string }[],
            photoAlt: 'Tomáš Kudláč - Fotografia',
            title: 'O mne',
        },
        contact: {
            briefText: `Máte záujem o vývoj webovej stránky alebo aplikácie? Alebo máte projekt, v ktorom by sa 
            vám zišla pomocná ruka? Neváhajte ma kontaktovať cez telefónne číslo {{phoneNumber}} alebo cez nasledovný
             formulár:`,
            form: {
                apiMessages: {
                    'Form data is invalid': 'Údaje vo formulári sú zadané v nesprávnom formáte.',
                    success: 'Vaša správa bola odoslaná.',
                    'Unable to send the email': 'Správu nebolo možné odoslať, skúste to prosím neskôr.',
                },
                email: 'Email',
                errors: {
                    empty: 'Pole je prázdne',
                    invalidFormat: 'Text je v nesprávnom formáte',
                },
                message: 'Správa',
                name: 'Meno',
                phone: 'Telefón',
                required: 'Pole je povinné',
                requiredLegend: '* - povinné polia',
                submitLabel: 'Odoslať',
                submitTitleDisabled: 'Nie je možné odoslať formulár, pokiaľ sú v ňom chyby',
                submitTitle: 'Odoslať formulár',
            },
            phoneTitle: 'Zavolať na telefónne číslo',
            title: 'Kontakt',
        },
        home: {
            developer: 'developera',
            title: 'Domov',
            welcome: 'Vitajte na stránke',
        },
        projects: {
            backEndLabel: 'Back-end',
            designLabel: 'Dizajn',
            frontEndLabel: 'Front-end',
            projects: {
                fifaManiaci: {
                    backEndDesc: '100%',
                    designDesc: 'základ',
                    frontEndDesc: '100%',
                    href: 'https://fifamaniaci.tomaskudlac.sk',
                    title: 'FIFA maniaci',
                },
                havranPub: {
                    backEndDesc: '100%',
                    designDesc: 'dolaďovačky',
                    frontEndDesc: 'prerábka postavená na predošlej verzii',
                    href: 'https://www.havran-pub.sk',
                    title: 'Havran-pub',
                },
                simonQ: {
                    backEndDesc: '100%',
                    designDesc: 'responzivita a dolaďovačky',
                    frontEndDesc: '100%',
                    href: 'http://simon-q.sk',
                    title: 'Šimon-q',
                },
                villaRomaine: {
                    backEndDesc: '100%',
                    designDesc: 'dolaďovačky',
                    frontEndDesc: '100%',
                    href: 'http://villaromaine.sk',
                    title: 'Villa Romaine',
                },
            },
            showProject: 'Zobraziť projekt',
            title: 'Projekty',
            whatIveDone: 'Čo som urobil',
        },
    },
    toasts: {
        closeButtonTitle: 'Zavrieť',
    },
};
