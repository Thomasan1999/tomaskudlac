import store from '@/store/index';
import getImageFormat from '@/store/getImageFormat';
import {ImageFormat} from '@/store/types';

export default async function initImageFormat(): Promise<void>
{
    let imageFormat = localStorage.getItem('imageFormat') as ImageFormat | null;

    if (!imageFormat)
    {
        imageFormat = await getImageFormat();
        localStorage.setItem('imageFormat', imageFormat);
    }

    store.imageFormat = imageFormat;
}
