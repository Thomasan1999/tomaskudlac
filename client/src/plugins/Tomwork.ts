export default class Tomwork
{
    public static emptyIs(val: any): boolean
    {
        if (val === null)
        {
            return true;
        }
        if (val instanceof Array)
        {
            return !val.length;
        }
        return !Object.keys(val).length;
    }

    public static clone<T>(obj: T): T
    {
        const clone = {};

        Object.keys(obj).forEach((i) =>
        {
            if (obj[i] !== null && typeof (obj[i]) === `object`)
            {
                clone[i] = Tomwork.clone(obj[i]);
            }
            else
            {
                clone[i] = obj[i];
            }
        });

        return clone as unknown as T;
    }
}
