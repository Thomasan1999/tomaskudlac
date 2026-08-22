import { createPinia, Pinia, setActivePinia } from 'pinia';
import useStore from '@/store';
import sk from '@/locales/sk';

export default async function mockInitStore(): Promise<Pinia> {
    const pinia = createPinia();

    setActivePinia(pinia);

    const store = useStore();

    await store.init();

    store.locales = sk;

    return pinia;
}
