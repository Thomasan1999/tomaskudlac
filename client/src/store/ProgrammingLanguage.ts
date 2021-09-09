import {DeepPartial, DeepReadonly} from 'ts-essentials';

/**
 * Data of a programming language which are used in home section in dynamic text and in about myself text in the
 * list of languages.
 * */
export class ProgrammingLanguage
{
    /**
     * Determines whether the language is preceded by 'an' indefinite article in home section in the English version.
     * */
    readonly an: boolean;
    /**
     * All languages which are a sub-languages of this language for example SCSS is a sub-language of CSS or TypeScript
     * is a sub-language of JavaScript because both compile to their parent languages and are considered extensions of
     * their parents.
     * */
    readonly children: DeepReadonly<ProgrammingLanguage[]> = [];
    /** Determines whether the language might appear in the home section text. */
    readonly home: boolean;
    /** The name of the language. This property determines how the language is displayed in texts. */
    readonly title: string;

    constructor(args: DeepPartial<ProgrammingLanguage>)
    {
        this.an = args.an ?? false;
        this.home = args.home ?? false;

        if (args.children)
        {
            this.children = args.children.map((value) => new ProgrammingLanguage(value!));
        }

        this.title = args.title!;
    }

    /**
     * Returns a string representation of a programming language and its children, might be found in about myself
     * text and meta description.
     * */
    toString(): string
    {
        if (!this.children.length)
        {
            return this.title;
        }

        const childrenString = this.children
            .map((language) => language.toString())
            .join(', ');

        return `${this.title} (${childrenString})`;
    }
}
