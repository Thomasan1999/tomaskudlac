import { kebabCase, upperFirst } from 'lodash';
import { Merge } from 'ts-essentials';
import useStore from '@/store';

type ConstructorOptionalParams = Partial<Pick<MainSectionObject, 'heading'>>;

type ConstructorRequiredParams = Pick<MainSectionObject, 'name' | 'order'>;

type ConstructorType = Merge<ConstructorOptionalParams, ConstructorRequiredParams>;

export default class MainSectionObject {
    readonly heading: boolean;
    readonly name: string;
    readonly order: number;

    constructor({ heading = false, name, order }: ConstructorType) {
        this.heading = heading;
        this.name = name;
        this.order = order;
    }

    get componentName(): string {
        return upperFirst(this.name);
    }

    get id(): string {
        return kebabCase(this.title);
    }

    get title(): string {
        const store = useStore();

        return store.locales.sections[this.name].title;
    }

    get url(): string {
        return `#${this.id}`;
    }
}
