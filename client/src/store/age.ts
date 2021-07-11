import {ref} from 'vue';
import dayjs from 'dayjs';

/** @description Birth date of Tomáš Kudláč. */
const birthDate: string = '1999-06-30T08:30:00+02:00';

let age = ref(null as any as number);

function getAge(): number
{
    /** @description The current timestamp. */
    const now: dayjs.Dayjs = dayjs();
    return now.diff(birthDate, `y`);
}

function updateAge(): void
{
    /** @description The current timestamp. */
    const now: dayjs.Dayjs = dayjs();

    age.value = getAge();

    const nextBirthday = dayjs(birthDate).year(now.year() + 1);

    const timeUntilNextBirthday = nextBirthday.diff(now);

    setTimeout(() =>
    {
        updateAge();
    }, timeUntilNextBirthday);
}

updateAge();

export default age;
