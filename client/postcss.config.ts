// eslint-disable-next-line import/no-extraneous-dependencies
import * as Autoprefixer from 'autoprefixer';

module.exports = {
    plugins: {
        autoprefixer: {/*
            browsers: [`> 1%`, `not ie > 0`, `not op_mini all`]
        */} as Autoprefixer.Options
    }
};
