import {MutationTree} from 'vuex';
import storeState     from '@/store/state';

const mutations = {
    set(state, {props}: {props: {[s: string]: any}}): void
    {
        Object.entries(props).forEach(([prop, value]) =>
        {
            const propParts = prop.split(`.`);
            const target = propParts.slice(0, -1).reduce((a, propPart) =>
            {
                return a[propPart];
            }, state);

            target[propParts[propParts.length - 1]] = value;
        });
    }
} as MutationTree<typeof storeState>;

export default mutations;
