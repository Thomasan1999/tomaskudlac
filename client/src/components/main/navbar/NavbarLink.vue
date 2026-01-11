<script lang="ts" setup>
    import mainSections from '@/components/main/mainSections';
    import { computed } from 'vue';
    import ExternalLink from '@/components/ExternalLink.vue';
    import { NavbarLinkProps } from '@/components/main/navbar/types';
    import { FontWeight } from '@/types/components';

    const { fontWeight = FontWeight.NORMAL, replace = false, routerLink = false, to } = defineProps<NavbarLinkProps>();
    const emit = defineEmits<{ (event: 'click'): void }>();

    const onClick = ($event: MouseEvent): void => {
        if (!routerLink) {
            return;
        }

        $event.preventDefault();
        emit('click');
    };

    const dynamicProps = computed(() => {
        return {
            [routerLink ? 'to' : 'href']: toUrl.value,
            ...(replace && { replace }),
        };
    });

    const toUrl = computed(() => mainSections[to]?.url ?? to);
</script>

<template>
    <Component
        :is="routerLink ? 'router-link' : ExternalLink"
        data-testid="navbar-link"
        class="h-navbar-height flex items-center justify-center transition-colors"
        :class="[
            active ? 'bg-navbar-link-active pointer-events-none' : 'hover:bg-primary-light',
            fontWeight === FontWeight.NORMAL ? 'font-normal' : 'font-light',
        ]"
        :title="title"
        v-bind="dynamicProps"
        @click="onClick"
    >
        <slot>{{ text ?? title }}</slot>
    </Component>
</template>
