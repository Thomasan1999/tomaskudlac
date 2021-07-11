(async () =>
{
    if (!('scrollBehavior' in document.documentElement.style))
    {
        await import('scroll-behavior-polyfill');
    }
})();
