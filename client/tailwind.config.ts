import { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'error-bg': '#3e2d2d',
                'error-text': '#cc0000',
                primary: '#191970',
                'primary-light': '#2828b3',
            },
            fontFamily: {
                contact: 'Montserrat, sans-serif',
            },
            spacing: {
                label: '6rem',
            },
        },
    },
    plugins: [],
};

export default config;
