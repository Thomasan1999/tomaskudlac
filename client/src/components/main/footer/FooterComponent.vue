<template>
    <section class="footer-component">
        <footer class="footer">
            <div class="text-content">
                <p class="footer-text">
                    {{ locales.copyrightText }}
                    {{ ' ' }}
                    <ExternalLink
                        v-if="language === 'en'"
                        class="footer-copyright-link"
                        data-testid="copyrightLink"
                        href="http://www.whatarecookies.com"
                        :title="locales.copyrightLinkTitle"
                    >{{ locales.copyrightLinkText }}.
                    </ExternalLink>
                    <span
                        v-else
                        class="footer-copyright-link"
                        data-testid="copyrightLink"
                        :title="locales.copyrightLinkTitle"
                        @click="showCookies = true"
                    >{{ locales.copyrightLinkText }}.</span>
                </p>
            </div>
        </footer>
        <CookiesModal v-if="showCookies" @close="showCookies = false"/>
    </section>
</template>

<script lang="ts" setup>
    import {computed, defineAsyncComponent, ref} from 'vue';
    import useStore from '@/store';
    import ExternalLink from '@/components/ExternalLink.vue';

    const CookiesModal = defineAsyncComponent({loader: () => import('./CookiesModal.vue')});

    const store = useStore();

    const showCookies = ref(false);

    const language = computed(() => store.language);

    const locales = computed(() => store.locales.footer);
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
