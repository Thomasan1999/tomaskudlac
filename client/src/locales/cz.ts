import { SiteLanguage } from '@/store/types';

export default {
    cookies: {
        closeButtonTitle: 'Zavřít',
        paragraphs: [
            {
                title: 'Soubory cookie',
                text: 'Za účelem získání statistik o používání této webové stránky ukládáme na vašem zařízení malé datové soubory, tzv. cookie. Jedná se o běžnou praxi většiny velkých webových stránek.',
            },
            {
                title: 'Co je soubor cookie?',
                text: 'Soubor cookie je malý textový soubor, který webová stránka ukládá do vašeho počítače nebo mobilního zařízení při jejím prohlížení. Díky tomuto souboru si webová stránka po určitou dobu uchovává informace o vašich krocích a preferencích (například přihlašovací jméno, jazyk, velikost písma a další nastavení zobrazení), takže je při další návštěvě stránky nebo procházení jejích jednotlivých podstránek nemusíte znovu zadávat.',
            },
            {
                title: 'Jak používáme soubory cookie?',
                text: 'Soubory cookie používáme k vytváření statistik o způsobu používání této webové stránky a k následnému využití těchto statistik ke zvýšení komfortu při jejím používání a k dočasnému uchovávání informací o přihlášeném uživateli.',
            },
            {
                title: 'Jak kontrolovat soubory cookie?',
                text: 'Soubory cookie můžete kontrolovat nebo mazat podle svého uvážení. Můžete odstranit všechny soubory cookie uložené ve svém počítači a většinu prohlížečů lze nastavit tak, aby znemožňovaly jejich ukládání.',
            },
            {
                title: 'Jak odmítnout používání souborů cookie?',
                text: 'Používání souborů cookie lze nastavit pomocí vašeho internetového prohlížeče. Většina prohlížečů soubory cookie automaticky přijímá již v základním nastavení.',
            },
        ],
    },
    footer: {
        copyrightLinkTitle: 'Zobrazit informace o tom, co jsou cookies',
        copyrightLinkText: 'cookies',
        copyrightText: '© 2017 - 2026 Všechna práva vyhrazena. Tato stránka používá',
    },
    navbar: {
        hide: 'Skrýt menu',
        otherLangs: {
            [SiteLanguage.EN]: 'Přepnout do angličtiny',
            [SiteLanguage.SK]: 'Přepnout do slovenštiny',
        },
        show: 'Otevřít menu',
    },
    sections: {
        aboutMyself: {
            columns: [
                {
                    title: 'Kde jsem teď',
                    text: `Je mi *{{age}} let* a pracuji na *živnost* (freelance). Mou pracovní náplní je *web development*
                    (vývoj webových stránek a aplikací). Momentálně pracuji na front-endu projektu vyvíjeného ve *Vue.js* 
                    a *TypeScript*-u. S technologiemi jsem spokojený a chtěl bych je používat i do budoucna.`,
                },
                {
                    title: 'Volnočasové záliby',
                    text: `Medzi mé záliby patří *počítačové hry* (velmi nečekané u IT-čkaře), *plavání* (v létě), 
                    *cyklistika* (jednou za rok), *historie* (baví mě sledovat, jak lidé dělají pořád to samé, jen za 
                    jiných podmínek) a *zamýšlení se nad životem*.`,
                },
                {
                    title: 'Užitečné záliby',
                    text: `Ovládám *{{programmingLanguages}}*. Rád se učím novým technologiím a zkoumám, jak se vyvíjejí.
                    Pomáhá mi to být v obraze a využít každou novou příležitost k tomu být lepším vývojářem.`,
                },
            ] as { title: string; text: string }[],
            photoAlt: 'Tomáš Kudláč - Fotografie',
            title: 'O mně',
        },
        contact: {
            briefText: `Máte zájem o vývoj webové stránky nebo aplikace? Nebo máte projekt, u kterého by se vám hodila 
            pomocná ruka? Neváhejte mě kontaktovat na telefonním čísle {{phoneNumber}} nebo prostřednictvím následujícího
             formuláře:`,
            form: {
                apiMessages: {
                    'Form data is invalid': 'Údaje ve formuláři jsou zadány v nesprávném formátu.',
                    success: 'Vaše zpráva byla odeslána.',
                    'Unable to send the email': 'Zprávu se nepodařilo odeslat. Zkuste to prosím později',
                },
                email: 'Email',
                errors: {
                    empty: 'Pole je prázdné',
                    invalidFormat: 'Text je v nesprávném formátu',
                },
                message: 'Zpráva',
                name: 'Jméno',
                phone: 'Telefon',
                required: 'Pole je povinné',
                requiredLegend: '* - povinná pole',
                submitLabel: 'Odeslat',
                submitTitleDisabled: 'Formulář nelze odeslat, pokud obsahuje chyby.',
                submitTitle: 'Odeslat formulář',
            },
            phoneTitle: 'Zavolat na telefonní číslo',
            title: 'Kontakt',
        },
        home: {
            developer: 'developera',
            title: 'Úvod',
            welcome: 'Vítejte na stránce',
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
                    frontEndDesc: 'předělání postaveno na předchozí verzi',
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
            showProject: 'Zobrazit projekt',
            title: 'Projekty',
            whatIveDone: 'Co jsem udělal',
        },
    },
    toasts: {
        closeButtonTitle: 'Zavřít',
    },
};
