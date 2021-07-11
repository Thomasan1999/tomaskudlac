import {DeepReadonly} from 'ts-essentials';
import {ProgrammingLanguage} from '@/store/types';

export default function getProgrammingLanguagesTitle(programmingLanguages: DeepReadonly<ProgrammingLanguage[]>)
{
    return programmingLanguages.map(getProgrammingLanguageTitle).join(', ');
}

function getProgrammingLanguageTitle(programmingLanguage: ProgrammingLanguage): string
{
    if (!programmingLanguage.children)
    {
        return programmingLanguage.title;
    }

    const childrenString = getProgrammingLanguagesTitle(programmingLanguage.children);

    return `${programmingLanguage.title} (${childrenString})`;
}
