/**
 * @description A class providing methods to return a psuedorandomized number. Randomization is executed by the
 * Math.random method.
 * */
export default class Rand
{
    /**
     * @description Returns a pseudorandom real number between two real numbers.
     * @param args Arguments of the method.
     * @param [args.min] The minimal possible value of the randomized number, defaults to 0.
     * @param [args.max] The maximal possible value of the randomized number, defaults to the largest number that can be
     * represented in JS (Number.MAX_VALUE).
     * @returns Pseudorandom float number.
     * */
    public static float({min = 0, max = Number.MAX_VALUE}: {min?: number, max?: number} = {}): number
    {
        return (Math.random() * (max - min)) + min;
    }

    /**
     * @description Returns a pseudorandom integer number (not bigint).
     * @param args Arguments of the method.
     * @param [args.min] The minimal value of the randomized number (can be float), defaults to 0.
     * @param [args.max] The maximal value of the randomized number (can be float), defaults to the largest integer that
     * can be represented in JS (Number.MAX_SAFE_INTEGER).
     * @returns Pseudorandom integer number.
     * */
    public static int({min = 0, max = Number.MAX_SAFE_INTEGER}: {min?: number, max?: number} = {}): number
    {
        return Math.floor((Math.random() * (max - min + 1))) + min;
    }
}
