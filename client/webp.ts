import sharp from 'sharp';

sharp(`src/modules/about-myself/assets/myself.jpg`)
    .webp({quality: 100})
    .toFile(`src/modules/about-myself/assets/myself.webp`)
    .catch((err) =>
    {
        console.error(err);
    });
