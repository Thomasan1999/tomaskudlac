<template lang="pug">
component.navbar-link(
    :is="routerLink ? 'router-link' : 'external-link'"
    :class="[$attrs.class, {active}]"
    :title="title"
    v-bind="{[routerLink ? 'to' : 'href']: to}"
    @click="onClick"
)
    slot {{text ?? title}}
</template>

<script lang="ts">
import mainSections from '@/components/main/mainSections';
import {computed} from 'vue';
import ExternalLink from '@/components/ExternalLink.vue';

export default {
    name: 'NavbarLink',
    components: {
        ExternalLink
    },
    emits: ['click'],
    inheritAttrs: false,
    props: {
        active: {
            type: Boolean
        },
        routerLink: {
            default: false,
            type: Boolean
        },
        text: {
            type: String
        },
        title: {
            required: true,
            type: String
        },
        to: {
            required: true,
            type: String
        }
    },
    setup(props, {emit})
    {
        const onClick = ($event: MouseEvent) =>
        {
            if (!props.routerLink)
            {
                return;
            }

            $event.preventDefault();
            emit('click');
        };

        const to = computed(() =>
        {
            return mainSections[props.to]?.url ?? props.to;
        });

        return {
            onClick,
            to
        };
    }
};
</script>

<style lang="scss" scoped>
.navbar-link
{
    align-items: center;
    display: flex;
    font-family: var(--title-font-family);
    font-weight: 400;
    justify-content: center;
    height: var(--navbar-height);
    padding-left: var(--navbar-link-padding-horizontal, 0);
    padding-right: var(--navbar-link-padding-horizontal, 0);
    transition: background-color var(--base-transition-duration);

    &:hover
    {
        background-color: var(--primary-color-light);
    }

    &.active
    {
        background-color: var(--navbar-link-active-color);
        cursor: default;
    }
}
</style>
