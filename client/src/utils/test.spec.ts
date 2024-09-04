import { buildCreateWrapper, emitComponentEvent } from '@/utils/test';
import * as vueUtils from 'vue';

vi.mock('vue', async (importOriginal) => ({
    ...((await importOriginal()) as object),
}));

const createWrapper = buildCreateWrapper({ template: '<div/>' });
const wrapper = createWrapper();

describe('test', () => {
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
