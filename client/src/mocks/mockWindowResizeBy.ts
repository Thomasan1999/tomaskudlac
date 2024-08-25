export default function mockWindowResizeBy(): void {
    window.resizeBy = function (x, y) {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: x });
        Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: y });
        window.dispatchEvent(new Event('resize'));
    };
}
