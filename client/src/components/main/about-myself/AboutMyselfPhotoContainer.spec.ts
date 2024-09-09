import mockInitStore from '@/mocks/mockInitStore';
import { getTestingSelector, buildCreateWrapper } from '@/utils/test';
import AboutMyselfPhotoContainer from '@/components/main/about-myself/AboutMyselfPhotoContainer.vue';

const JPG_SRC_SELECTOR = getTestingSelector('jpg-src');
const PHOTO_SELECTOR = getTestingSelector('photo');
const WEBP_SRC_SELECTOR = getTestingSelector('webp-src');

const createWrapper = buildCreateWrapper(AboutMyselfPhotoContainer, {
    alt: '',
    jpgSrc: '',
    webpSrc: '',
});

describe('AboutMyselfPhotoContainer', () => {
    beforeAll(async () => {
        await mockInitStore();
    });

    it('uses JPG source', async () => {
        const wrapper = createWrapper({ jpgSrc: 'lorem.jpg' });

        const jpgSrcElement = wrapper.find<HTMLSourceElement>(JPG_SRC_SELECTOR);

        expect(jpgSrcElement.exists()).toBe(true);
        expect(jpgSrcElement.attributes('srcset')).toBe('lorem.jpg');

        await wrapper.setProps({ jpgSrc: 'ipsum.jpg' });

        expect(jpgSrcElement.attributes('srcset')).toBe('ipsum.jpg');
    });

    it('uses WebP source', async () => {
        const wrapper = createWrapper({ webpSrc: 'dolor.webp' });

        const webpSrcElement = wrapper.find<HTMLSourceElement>(WEBP_SRC_SELECTOR);

        expect(webpSrcElement.exists()).toBe(true);
        expect(webpSrcElement.attributes('srcset')).toBe('dolor.webp');

        await wrapper.setProps({ webpSrc: 'sit.webp' });

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

        await wrapper.setProps({ alt: 'Anything else' });

        expect(photoElement.attributes('alt')).toBe('Anything else');
    });
});
