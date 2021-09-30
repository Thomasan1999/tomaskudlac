<template lang="pug">
section.footer-component
    footer.footer
        div.text-content
            p.footer-text
                | {{locales.copyrightText}}
                | {{' '}}
                external-link.footer-copyright-link(
                    v-if="language === 'en'"
                    data-testid="copyrightLink"
                    href="http://www.whatarecookies.com"
                    :title="locales.copyrightLinkTitle"
                ) {{locales.copyrightLinkText}}.
                span.footer-copyright-link(
                    v-else
                    data-testid="copyrightLink"
                    :title="locales.copyrightLinkTitle"
                    @click="showCookies = true"
                ) {{locales.copyrightLinkText}}.
    cookies-modal(v-if="showCookies" @close="showCookies = false")
</template>

<script lang="ts">
import {computed, defineAsyncComponent, ref} from 'vue';
import useStore from '@/store';
import ExternalLink from '@/components/ExternalLink.vue';

export default {
    name: 'Footer',
    components: {
        CookiesModal: defineAsyncComponent({loader: () => import('./CookiesModal.vue')}),
        ExternalLink
    },
    setup()
    {
        const store = useStore();

        const showCookies = ref(false);

        const language = computed(() => store.language);

        const locales = computed(() => store.locales.footer);

        return {
            language,
            locales,
            showCookies
        };
    }
};
</script>

<style lang="scss" scoped>
.footer-component
{
    --footer-height: 40px;

    background-color: var(--primary-color);
    line-height: var(--footer-height);
}

.footer, .footer-text
{
    font-weight: 500;
    line-height: var(--footer-height);
}

.footer-copyright-link
{
    cursor: pointer;
    text-decoration: underline;
    transition: color var(--base-transition-duration);

    &:hover
    {
        color: var(--text-highlight-color)
    }
}
</style>
