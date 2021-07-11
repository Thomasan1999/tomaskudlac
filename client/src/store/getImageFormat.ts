import {ImageFormat} from '@/store/types';

export default async function getImageFormat(): Promise<ImageFormat>
{
    return new Promise((resolve) =>
    {
        const webP = new Image();
        webP.onload = webP.onerror = function ()
        {
            resolve(webP.height === 2 ? 'webp' : 'jpg');
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}
