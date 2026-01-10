<script lang="ts" setup>
    import mainSections from '@/components/main/mainSections';
    import { computed } from 'vue';
    import ExternalLink from '@/components/ExternalLink.vue';
    import { NavbarLinkProps } from '@/components/main/navbar/types';

    const { replace = false, routerLink = false, to } = defineProps<NavbarLinkProps>();
    const emit = defineEmits<{ (event: 'click'): void }>();

    const onClick = ($event: MouseEvent) => {
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
        class="flex h-navbar-height items-center justify-center px-navbar-link-padding-horizontal font-title font-normal transition-colors"
        :class="active ? 'cursor-default bg-navbar-link-active' : 'hover:bg-primary-light'"
        :title="title"
        v-bind="dynamicProps"
        @click="onClick"
    >
        <slot>{{ text ?? title }}</slot>
    </Component>
</template>
