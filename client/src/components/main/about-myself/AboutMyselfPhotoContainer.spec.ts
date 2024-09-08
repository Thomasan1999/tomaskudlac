import mockInitStore from '@/mocks/mockInitStore';
import { getTestingSelector, buildCreateWrapper, buildSetProps } from '@/utils/test';
import AboutMyselfPhotoContainer from '@/components/main/about-myself/AboutMyselfPhotoContainer.vue';
import type { AboutMyselfPhotoContainerProps } from '@/components/main/about-myself/types';

const JPG_SRC_SELECTOR = getTestingSelector('jpg-src');
const PHOTO_SELECTOR = getTestingSelector('photo');
const WEBP_SRC_SELECTOR = getTestingSelector('webp-src');

describe('AboutMyselfPhotoContainer', () => {
    const createWrapper = buildCreateWrapper<AboutMyselfPhotoContainerProps>(AboutMyselfPhotoContainer, {
        alt: '',
        jpgSrc: '',
        webpSrc: '',
    });
    const setProps = buildSetProps<AboutMyselfPhotoContainerProps>();

    beforeAll(async () => {
        await mockInitStore();
    });

    it('uses JPG source', async () => {
        const wrapper = createWrapper({ jpgSrc: 'lorem.jpg' });

        const jpgSrcElement = wrapper.find<HTMLSourceElement>(JPG_SRC_SELECTOR);

        expect(jpgSrcElement.exists()).toBe(true);
        expect(jpgSrcElement.attributes('srcset')).toBe('lorem.jpg');

        await setProps(wrapper, { jpgSrc: 'ipsum.jpg' });

        expect(jpgSrcElement.attributes('srcset')).toBe('ipsum.jpg');
    });

    it('uses WebP source', async () => {
        const wrapper = createWrapper({ webpSrc: 'dolor.webp' });

        const webpSrcElement = wrapper.find<HTMLSourceElement>(WEBP_SRC_SELECTOR);

        expect(webpSrcElement.exists()).toBe(true);
        expect(webpSrcElement.attributes('srcset')).toBe('dolor.webp');

        await setProps(wrapper, { webpSrc: 'sit.webp' });

        expect(webpSrcElement.attributes('srcset')).toBe('sit.webp');
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

        await setProps(wrapper, { alt: 'Anything else' });

        expect(photoElement.attributes('alt')).toBe('Anything else');
    });
});
