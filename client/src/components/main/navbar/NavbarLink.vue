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
            [routerLink ? 'to' : 'href']: toUrl,
            ...(replace && { replace }),
        };
    });

    const toUrl = computed(() => mainSections[to]?.url ?? to);
</script>

<template>
    <Component
        :is="routerLink ? 'router-link' : ExternalLink"
        class="navbar-link"
        :class="[$attrs.class, { active }]"
        :title="title"
        v-bind="dynamicProps"
        @click="onClick"
    >
        <slot>{{ text ?? title }}</slot>
    </Component>
</template>

<style lang="scss" scoped>
    .navbar-link {
        align-items: center;
        display: flex;
        font-family: var(--title-font-family);
        font-weight: 400;
        justify-content: center;
        height: var(--navbar-height);
        padding-left: var(--navbar-link-padding-horizontal, 0);
        padding-right: var(--navbar-link-padding-horizontal, 0);
        transition: background-color var(--base-transition-duration);

        &:hover {
            background-color: var(--primary-color-light);
        }

        &.active {
            background-color: var(--navbar-link-active-color);
            cursor: default;
        }
    }
</style>
