import { addManifestAndDescriptionToDocumentHead, buildCreateWrapper, emitComponentEvent } from '@/utils/test';
import * as vueUtils from 'vue';

vi.mock('vue', async (importOriginal) => ({
    ...((await importOriginal()) as object),
}));

const createWrapper = buildCreateWrapper({ template: '<div/>' });
const wrapper = createWrapper();

describe('test', () => {
    describe('addManifestAndDescriptionToDocumentHead()', () => {
        beforeEach(() => {
            document.head.innerHTML = '';
        });

        it('adds manifest link and description meta when missing', () => {
            expect(document.head.querySelector('link[rel="manifest"]')).toBeFalsy();
            expect(document.head.querySelector('meta[name="description"]')).toBeFalsy();

            addManifestAndDescriptionToDocumentHead();

            expect(document.head.querySelector('link[rel="manifest"]')).toBeTruthy();
            expect(document.head.querySelector('meta[name="description"]')).toBeTruthy();
        });
    });

    describe('emitComponentEvent()', () => {
        it('emits event', () => {
            expect(wrapper.emitted('lorem')).toBe(undefined);

            emitComponentEvent(wrapper, 'lorem');

            expect(wrapper.emitted('lorem')).toHaveLength(1);

            emitComponentEvent(wrapper, 'lorem');

            expect(wrapper.emitted('lorem')).toHaveLength(2);

            emitComponentEvent(wrapper, 'ipsum');

            expect(wrapper.emitted('ipsum')).toHaveLength(1);
        });

        it('calls nextTick', () => {
            const nextTickSpy = vi.spyOn(vueUtils, 'nextTick');

            expect(nextTickSpy).not.toHaveBeenCalled();

            emitComponentEvent(wrapper, '');

            expect(nextTickSpy).toHaveBeenCalledTimes(1);

            emitComponentEvent(wrapper, '');

            expect(nextTickSpy).toHaveBeenCalledTimes(2);
        });
    });
});
