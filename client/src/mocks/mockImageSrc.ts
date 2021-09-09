/** Prevent image creation hanging when initializing store */
export default function mockImageSrc(): void
{
    Object.defineProperty(window.Image.prototype, 'src', {
        set(this)
        {
            this.onload?.();
        }
    });
}
