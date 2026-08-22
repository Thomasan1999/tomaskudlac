import mockInitStore from '@/mocks/mockInitStore';
import { getTestingSelector, buildCreateWrapper } from '@/utils/test';
import AboutMyselfPhotoContainer from '@/components/main/about-myself/AboutMyselfPhotoContainer.vue';

const PHOTO_SELECTOR = getTestingSelector('photo');

const createWrapper = buildCreateWrapper(AboutMyselfPhotoContainer, {
    alt: '',
    src: '',
});

describe('AboutMyselfPhotoContainer', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('uses the given source', async () => {
        const wrapper = createWrapper({ src: 'lorem.webp' });

        const photoElement = wrapper.find(PHOTO_SELECTOR);

        expect(photoElement.attributes('src')).toBe('lorem.webp');

        await wrapper.setProps({ src: 'ipsum.webp' });

        expect(photoElement.attributes('src')).toBe('ipsum.webp');
    });

    it('renders photo of Tomáš Kudláč', () => {
        const wrapper = createWrapper();

        const photoElement = wrapper.find(PHOTO_SELECTOR);

        expect(photoElement.exists()).toBe(true);
    });

    it('uses alt attribute', async () => {
        const wrapper = createWrapper({ alt: 'Some alt' });

        const photoElement = wrapper.find(PHOTO_SELECTOR);

        expect(photoElement.attributes('alt')).toBe('Some alt');

        await wrapper.setProps({ alt: 'Anything else' });

        expect(photoElement.attributes('alt')).toBe('Anything else');
    });

    // The photo sits well below the fold, so it must not compete with the hero for bandwidth.
    it('loads lazily', () => {
        expect(createWrapper().find(PHOTO_SELECTOR).attributes('loading')).toBe('lazy');
    });
});
