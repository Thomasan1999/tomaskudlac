import { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            animation: {
                blinking: 'blinking 1.06s infinite step-end',
            },
            colors: {
                'error-bg': '#3e2d2d',
                'error-text': '#cc0000',
                'home-curtain': 'rgba(14, 33, 175, 0.55)',
                'navbar-link-active': '#2c2c2c',
                overlay: '#222222',
                primary: '#191970',
                'primary-light': '#2828b3',
                'text-highlight': '#cc7832',
            },
            fontFamily: {
                contact: 'Montserrat, sans-serif',
                title: 'Raleway, sans-serif',
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
                label: '6rem',
                'main-row-gap': '3.125rem',
                'navbar-height': '3.75rem',
                'navbar-link-padding-horizontal': 'var(--navbar-link-padding-horizontal, 0)',
                // TODO: use normal CSS once Tailwind migrated to v4
                'screen-edge': 'var(--content-padding-horizontal)',
            },
            transitionDuration: {
                DEFAULT: '0.25s',
            },
        },
    },
    plugins: [],
};

export default config;
