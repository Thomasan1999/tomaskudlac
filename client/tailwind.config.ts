import { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            animation: {
                blinking: 'blinking 1.06s infinite step-end',
            },
            boxShadow: {
                navbar: '0 5px 18px 0 rgb(0 0 0 / 33%)',
            },
            colors: {
                'blue-curtain': 'rgba(14, 33, 175, 0.55)',
                'error-bg': '#3e2d2d',
                'error-text': '#cc0000',
                'navbar-link-active': '#2c2c2c',
                overlay: '#222222',
                primary: '#191970',
                'primary-green': '#1e9f31',
                'primary-light': '#2828b3',
                'primary-red': '#da0b24',
                'text-highlight': '#cc7832',
            },
            fontFamily: {
                contact: 'Montserrat, sans-serif',
                DEFAULT: 'Raleway, sans-serif',
            },
            keyframes: {
                blinking: {
                    '0%': {
                        opacity: '1',
                    },
                    '50%': {
                        opacity: '0',
                    },
                },
            },
            maxHeight: {
                'screen-without-edge': 'calc(100vh - var(--content-padding-horizontal) * 2)',
            },
            maxWidth: {
                'screen-without-edge': 'calc(100vw - var(--content-padding-horizontal) * 2)',
            },
            spacing: {
                'contact-form-data-padding-vertical': '.5rem',
                'hover-height': 'var(--hover-height)',
                label: '6rem',
                'main-row-gap': '3.125rem',
                'navbar-height': '3.75rem',
                'navbar-link-padding-horizontal': 'var(--navbar-link-padding-horizontal, 0)',
                // TODO: use normal CSS once Tailwind migrated to v4
                'screen-edge': 'var(--content-padding-horizontal)',
                'toast-container-right': 'calc(-100vw + var(--content-padding-horizontal) + var(--scrollbar-width))',
                'toast-container-top':
                    'var(--relative-margin-top, calc(var(--content-padding-horizontal) + var(--navbar-height)))',
            },
            transitionDuration: {
                DEFAULT: '0.25s',
                navbar: '0.25s',
            },
        },
    },
    plugins: [],
};

export default config;
