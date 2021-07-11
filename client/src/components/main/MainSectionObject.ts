import {kebabCase, upperFirst} from 'lodash';
import {Merge} from 'ts-essentials';
import store from '@/store';

type MainSectionObjectConstructor = Merge<Partial<Pick<MainSectionObject, 'heading'>>, Pick<MainSectionObject, 'name' | 'order'>>

export default class MainSectionObject
{
    readonly heading: boolean;
    readonly name: string;
    readonly order: number;

    constructor({heading = false, name, order}: MainSectionObjectConstructor)
    {
        this.heading = heading;
        this.name = name;
        this.order = order;
    }

    get componentName(): string
    {
        return upperFirst(this.name);
    }

    get id(): string
    {
        return kebabCase(this.title);
    }

    get title(): string
    {
        return store.locales.value.sections[this.name].title;
    }

    get url(): string
    {
        return `#${this.id}`;
    }
}
