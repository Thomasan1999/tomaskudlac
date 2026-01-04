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
                primary: '#191970',
                'primary-light': '#2828b3',
            },
            fontFamily: {
                contact: 'Montserrat, sans-serif',
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
            spacing: {
                label: '6rem',
                'main-row-gap': '3.125rem',
            },
        },
    },
    plugins: [],
};

export default config;
