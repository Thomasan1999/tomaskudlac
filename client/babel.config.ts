module.exports = {
    plugins: [
        ...(process.env.NODE_ENV === `production` ? [`transform-remove-console`] : [])
    ],
    presets: [
        [`@vue/app`,
            {
                targets: {
                    browsers: [`> 1%`, `not ie > 0`, `not op_mini all`]
                }
            }
        ]
    ]
};
