import Rand from '@/utils/Rand';

describe('Rand', () => {
    describe('.float()', () => {
        it('returns random number between min and max', () => {
            for (let i = 0; i < 100; i++) {
                let value = Rand.float({ min: 0, max: 10 });

                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(10);
            }
        });

        it('returns min if min and max are same', () => {
            for (let i = 0; i < 100; i++) {
                let value = Rand.float({ min: 0, max: 0 });

                expect(value).toBe(0);
            }
        });

        it('returns positive number or zero if min not defined', () => {
            for (let i = 0; i < 100; i++) {
                let value = Rand.int({ max: 10 });

                expect(value).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe('.int()', () => {
        it('returns random number between min and max', () => {
            for (let i = 0; i < 100; i++) {
                let value = Rand.int({ min: 0, max: 10 });

                expect(value).toBeGreaterThanOrEqual(0);
                expect(value).toBeLessThanOrEqual(10);
            }
        });

        it('returns min if min and max are same', () => {
            for (let i = 0; i < 100; i++) {
                let value = Rand.int({ min: 0, max: 0 });

                expect(value).toBe(0);
            }
        });

        it('returns integer', () => {
            for (let i = 0; i < 100; i++) {
                let value = Rand.int({ min: 0, max: 10 });

                expect(Number.isInteger(value)).toBe(true);
            }
        });

        it('returns positive number or zero if min not defined', () => {
            for (let i = 0; i < 100; i++) {
                let value = Rand.int({ max: 10 });

                expect(value).toBeGreaterThanOrEqual(0);
            }
        });
    });
});
