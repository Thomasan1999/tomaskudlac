import dayjs        from 'dayjs';
import router       from '@/router';

export default {
    async ageUpdate({commit, dispatch, state}): Promise<void>
    {
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
    async imageFormatSet({commit}): Promise<void | ImageBitmap>
    {
        if (!self.createImageBitmap)
        {
            commit(`set`, {props: {imageFormat: `jpg`}});
            return;
        }

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
    async langUpdate({commit}): Promise<void>
    {
        commit(`set`, {props: {lang: router.currentRoute.name}});
    }
};
