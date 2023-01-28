/* eslint-disable max-len */
export default {
    footer: {
        copyrightLinkTitle: 'Show explanation of what web cookies are',
        copyrightLinkText: 'cookies',
        copyrightText: '© 2017 - 2023 All rights reserved. This site uses'
    },
    navbar: {
        hide: 'Hide navigation bar',
        otherLangCode: 'SK',
        otherLangHref: '/',
        otherLangLinkTitle: 'Switch to Slovak',
        show: 'Show navigation bar'
    },
    sections: {
        aboutMyself: {
            columns: [
                {
                    title: 'Where am I now',
                    text: `I'm *{{age}} years old* and I'm *self-employed* (freelancer). I work as a *web developer*. 
                    At the moment, I work on front-end of a project developed in *Vue.js* and *TypeScript*. I'm 
                    satisfied with the chosen technologies and I would like to use them in the future.`
                },
                {
                    title: 'Free time activities',
                    text: `My hobbies are *computer games* (surprising for someone in IT), *swimming* (in summer), 
                    *cycling* (once a year), *history* (I like to observe how people are left unchanged in various
                    circumstances) and *thinking about life*.`
                },
                {
                    title: 'Useful activities',
                    text: `I know *{{programmingLanguages}}*. I like to learn new technologies and watch how do they 
                    turn out. It helps me to keep track with them and use every new opportunity to be a better developer.`
                }
            ] as {title: string, text: string}[],
            photoAlt: 'Tomáš Kudláč - Photo',
            title: 'About myself'
        },
        contact: {
            briefText: `Are you interested in having your website or web application developed? Or do you have a project, 
            which you would like me to help you with? Don't hesitate to contact me via my phone number {{phoneNumber}} 
            or the following form:`,
            form: {
                apiMessages: {
                    'Form data is invalid': 'The form data is in invalid format.',
                    'success': 'Your message was sent.',
                    'Unable to send the email': 'Message was not sent, please try again later.'
                },
                email: 'Email',
                errors: {
                    empty: 'The field is empty',
                    invalidFormat: 'The text is in an invalid format'
                },
                message: 'Message',
                name: 'Name',
                phone: 'Phone',
                required: 'The field is required.',
                requiredLegend: '* - required fields',
                submitLabel: 'Submit',
                submitTitle: 'Submit the form',
                submitTitleDisabled: 'It is not possible to submit the form, if there are errors in it'
            },
            phoneTitle: 'Call the phone number',
            title: 'Contact'
        },
        home: {
            developer: 'developer',
            title: 'Home',
            welcome: 'Welcome to the site of a'
        },
        projects: {
            backEndLabel: 'Back-end',
            designLabel: 'Design',
            frontEndLabel: 'Front-end',
            projects: {
                fifaManiaci: {
                    backEndDesc: '100%',
                    designDesc: 'basics',
                    frontEndDesc: '100%',
                    href: 'https://fifamaniaci.tomaskudlac.sk',
                    title: 'FIFA maniaci'
                },
                havranPub: {
                    backEndDesc: '100%',
                    designDesc: 'finetuning',
                    frontEndDesc: 'redesign built upon the previous version',
                    href: 'https://www.havran-pub.sk',
                    title: 'Havran-pub'
                },
                simonQ: {
                    backEndDesc: '100%',
                    designDesc: 'responsiveness a finetuning',
                    frontEndDesc: '100%',
                    href: 'http://simon-q.sk',
                    title: 'Šimon-q'
                },
                villaRomaine: {
                    backEndDesc: '100%',
                    designDesc: 'finetuning',
                    frontEndDesc: '100%',
                    href: 'http://villaromaine.sk',
                    title: 'Villa Romaine'
                }
            },
            showProject: 'Show the project of',
            title: 'Projects',
            whatIveDone: 'What I\'ve done'
        }
    },
    toasts: {
        closeButtonTitle: 'Close'
    }
};
