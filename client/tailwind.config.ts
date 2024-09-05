import { Config } from 'tailwindcss';

const config: Config = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#191970',
                'primary-light': '#2828b3',
            },
            spacing: {
                label: '6rem',
            },
        },
    },
    plugins: [],
};

export default config;
