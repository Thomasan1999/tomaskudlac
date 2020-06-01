import dayjs        from 'dayjs';
import router       from '@/router';

export default {
    /** @description Updates the age in case of an increment. */
    async ageUpdate({commit, dispatch, state}): Promise<void>
    {
        /** @description The current timestamp. */
        const now: dayjs.Dayjs = dayjs();

        setTimeout(() =>
        {
            dispatch(`ageUpdate`).catch((err) =>
            {
                console.error(err);
            });
        },  dayjs(state.birthDate).year(now.year()).valueOf() - now.valueOf());
        commit(`set`, {props: {age: state.ageGet()}});
    },
    /** @description Sets the image format by the browser support. */
    async imageFormatSet({commit}): Promise<void | ImageBitmap>
    {
        if (!self.createImageBitmap)
        {
            commit(`set`, {props: {imageFormat: `jpg`}});
            return;
        }

        /** @description Blob which tests whether the WebP format is supported. */
        const blob: void | ImageBitmapSource = await fetch(`data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=`).then((r) =>
        {
            return r.blob();
        }).catch(() =>
        {
        });
        return createImageBitmap(blob as ImageBitmapSource).catch(() =>
        {
            commit(`set`, {props: {imageFormat: `jpg`}});
        });
    },
    /** @description Updates the active language of the website. */
    async langUpdate({commit}): Promise<void>
    {
        commit(`set`, {props: {lang: router.currentRoute.name}});
    }
};
