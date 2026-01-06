<script lang="ts" setup>
    import { computed, defineAsyncComponent, ref } from 'vue';
    import useStore from '@/store';
    import FooterCopyrightLink from '@/components/main/footer/FooterCopyrightLink.vue';

    const CookiesModal = defineAsyncComponent({ loader: () => import('./CookiesModal.vue') });

    const store = useStore();

    const showCookies = ref(false);

    const locales = computed(() => store.locales.footer);
</script>

<template>
    <section
        data-testid="footer-component"
        class="bg-primary font-medium leading-10"
    >
        <footer>
            <div class="text-content">
                <p>
                    {{ locales.copyrightText }}
                    {{ ' ' }}
                    <FooterCopyrightLink
                        class="cursor-pointer underline transition-colors hover:text-text-highlight"
                        :title="locales.copyrightLinkTitle"
                        :text="`${locales.copyrightLinkText}.`"
                        @showCookies="showCookies = true"
                    />
                </p>
            </div>
        </footer>
        <CookiesModal
            v-if="showCookies"
            @close="showCookies = false"
        />
    </section>
</template>
