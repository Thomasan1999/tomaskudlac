<script setup lang="ts">
    import ExternalLink from '@/components/ExternalLink.vue';
    import { computed } from 'vue';
    import useStore from '@/store';
    import { SiteLanguage } from '@/store/types';

    defineProps<{
        text: string;
    }>();

    defineEmits<{
        showCookies: [];
    }>();

    const store = useStore();

    const language = computed(() => store.language);
</script>

<template>
    <ExternalLink
        v-if="language === SiteLanguage.EN"
        data-testid="copyright-link"
        href="http://www.whatarecookies.com"
        v-bind="$attrs"
    >
        {{ text }}
    </ExternalLink>
    <span
        v-else
        data-testid="copyright-link"
        v-bind="$attrs"
        @click="$emit('showCookies')"
    >
        {{ text }}
    </span>
</template>
