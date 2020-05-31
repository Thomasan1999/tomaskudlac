import * as sharp from 'sharp';

sharp(`src/assets/background-home-2.jpg`).webp({quality: 60}).resize(1920, Math.floor(1920 / 1.5)).toFile(`src/assets/background-home-2.webp`).catch((err) =>
{
    console.error(err);
});
