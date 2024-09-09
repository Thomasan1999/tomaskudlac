import MainSectionObject from '@/components/main/MainSectionObject';
import mockInitStore from '@/mocks/mockInitStore';
import useStore from '@/store';
import sk from '@/locales/sk';

describe('MainSectionObject', () => {
    beforeAll(async () => {
        await mockInitStore();

        const store = useStore();

        store.locales = sk;
    });

    function createWrapper(args: Partial<ConstructorParameters<typeof MainSectionObject>[0]> = {}): MainSectionObject {
        const defaultArgs: ConstructorParameters<typeof MainSectionObject>[0] = {
            heading: false,
            name: 'home',
            order: 0,
        };

        return new MainSectionObject({ ...defaultArgs, ...args });
    }

    function expectObjectPropToAlterAnotherProp(
        firstArgs: Partial<ConstructorParameters<typeof MainSectionObject>[0]>,
        secondArgs: Partial<ConstructorParameters<typeof MainSectionObject>[0]>,
        firstPropName: keyof MainSectionObject,
        secondPropName: keyof MainSectionObject,
    ): void {
        const firstObject = createWrapper(firstArgs);

        const secondObject = createWrapper(secondArgs);

        expect(firstObject[firstPropName]).not.toBe(secondObject[firstPropName]);
        expect(firstObject[secondPropName]).not.toBe(secondObject[secondPropName]);
    }

    it("derives 'componentName' from 'name' property", () => {
        expectObjectPropToAlterAnotherProp({ name: 'home' }, { name: 'aboutMyself' }, 'name', 'componentName');
    });

    it("derives 'id' from 'name' property", () => {
        expectObjectPropToAlterAnotherProp({ name: 'home' }, { name: 'aboutMyself' }, 'name', 'title');
    });

    it("derives 'title' from 'name' property", () => {
        expectObjectPropToAlterAnotherProp({ name: 'home' }, { name: 'aboutMyself' }, 'name', 'title');
    });

    it("derives 'url' from 'name' property", () => {
        expectObjectPropToAlterAnotherProp({ name: 'home' }, { name: 'aboutMyself' }, 'name', 'url');
    });
});
