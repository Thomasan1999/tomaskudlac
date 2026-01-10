import ExternalLink from '@/components/ExternalLink.vue';
import { buildCreateWrapper } from '@/utils/test';

const createWrapper = buildCreateWrapper(ExternalLink, undefined, { shallow: true });

describe('ExternalLink', () => {
    it('renders default slot', () => {
        const text = 'Text';

        const className = 'slot-content';

        const link = createWrapper(undefined, { slots: { default: `<span class="${className}">${text}</span>` } });

        expect(link.find(`.${className}`).exists()).toBe(true);
        expect(link.find(`.${className}`).text()).toBe(text);
    });

    it('includes anchor tag', () => {
        const link = createWrapper();

        expect(link.find<HTMLAnchorElement>('a').exists()).toBe(true);
    });

    it('includes href attribute', () => {
        const href = 'https://tomaskudlac.sk';

        const link = createWrapper(undefined, { attrs: { href } });

        expect(link.find<HTMLAnchorElement>('a').attributes().href).toBe(href);
    });
});
