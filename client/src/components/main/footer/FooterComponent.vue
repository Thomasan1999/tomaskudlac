<script lang="ts" setup>
    import { computed, defineAsyncComponent, ref } from 'vue';
    import useStore from '@/store';
    import FooterCopyrightLink from '@/components/main/footer/FooterCopyrightLink.vue';

    const CookiesModal = defineAsyncComponent({ loader: () => import('./CookiesModal.vue') });

    const store = useStore();

    const showCookies = ref(false);

    const locales = computed(() => store.locales.footer);

    /**
     * Absent in English, where the footer links out to an external explanation instead. Gating the modal on it also
     * closes it if the language is switched while it is open.
     */
    const cookiesLocales = computed(() => store.locales.cookies);
</script>

<template>
    <section
        data-testid="footer-component"
        class="bg-primary leading-10 font-medium"
    >
        <footer>
            <div class="text-content">
                <p>
                    {{ locales.copyrightText }}
                    {{ ' ' }}
                    <FooterCopyrightLink
                        class="hover:text-text-highlight cursor-pointer underline transition-colors"
                        :title="locales.copyrightLinkTitle"
                        :text="`${locales.copyrightLinkText}.`"
                        @showCookies="showCookies = true"
                    />
                </p>
            </div>
        </footer>
        <CookiesModal
            v-if="showCookies && cookiesLocales"
            @close="showCookies = false"
        />
    </section>
</template>
