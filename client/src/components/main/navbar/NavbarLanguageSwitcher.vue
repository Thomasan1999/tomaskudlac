<script setup lang="ts">
    import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
    import { FontWeight } from '@/types/components';
    import { computed } from 'vue';
    import useStore from '@/store';
    import { SiteLanguage } from '@/store/types';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const store = useStore();

    const langCodes: Record<SiteLanguage, string> = {
        [SiteLanguage.CZ]: 'CZ',
        [SiteLanguage.EN]: 'EN',
        [SiteLanguage.SK]: 'SK',
    };

    const locales = computed(() => store.locales.navbar);
</script>

<template>
    <NavbarLink
        v-for="language in SiteLanguage"
        class="w-12"
        :active="route.name === language"
        :data-testid="`navbar-lang-${language}`"
        :fontWeight="FontWeight.LIGHT"
        routerLink
        :text="langCodes[language]"
        :title="locales.otherLangs[language]"
        :to="{ name: language }"
    />
</template>
