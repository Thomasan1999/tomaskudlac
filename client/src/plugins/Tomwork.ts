/** @description A class containing helper methods. The name of the class is a portmanteau of the name Tomáš and framework. */
export default class Tomwork
{
    /**
     * @description Clones the object and all properties recursively. The class of the object is lost in the process.
     * @param obj The object to be cloned.
     * @returns Cloned object instance.
     * */
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

    /**
     * @description Determines whether an object is empty.
     * @param val The object which emptiness is determined.
     * @returns Boolean value determining whether the object is empty
     * */
    public static emptyIs(val: object): boolean
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
}
