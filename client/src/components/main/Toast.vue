<template lang="pug">
teleport(to="#modal-container")
    transition(name="fade" @after-leave="$emit('close')")
        div.toast(v-if="opened" :class="[`type-${type}`]")
            div.toast-message {{message}}
            button.toast-close-button(:title="locales.closeButtonTitle" @click="opened = false")
                close-icon.toast-close-button-icon
</template>

<script lang="ts">
import store from '@/store';
import {computed, onMounted, ref} from 'vue';
import CloseIcon from '@/components/main/CloseIcon.vue';

export default {
    name: 'Toast',
    components: {
        CloseIcon
    },
    emits: ['close'],
    props: {
        message: {
            required: true,
            type: String
        },
        type: {
            required: true,
            type: String
        }
    },
    setup()
    {
        const baseLifetime = ref(10000);

        const opened = ref(false);

        const lifetime = computed(() =>
        {
            return store.isTouchscreen ? baseLifetime.value / 2 : baseLifetime.value;
        })

        const locales = computed(() =>
        {
            return store.locales.toasts;
        });

        onMounted(() =>
        {
            opened.value = true;

            setTimeout(() =>
            {
                opened.value = false;
            }, lifetime.value);
        });

        return {
            locales,
            opened
        };
    }
};
</script>

<style lang="scss" scoped>
.toast
{
    box-sizing: border-box;
    max-width: 360px;
    padding: 10px 30px;
    position: absolute;
    right: calc(-100vw + var(--content-padding-horizontal) + var(--scrollbar-width));
    text-align: left;
    top: calc(var(--content-padding-horizontal) + var(--navbar-height));
    width: calc(100vw - var(--content-padding-horizontal) * 2);
    z-index: 1;

    &.type-success
    {
        background-color: var(--primary-green);
    }

    &.type-fail
    {
        background-color: var(--primary-red);
    }
}

.toast-close-button
{
    line-height: 0;
    padding: 9px;
    position: absolute;
    right: 0;
    top: 0;

    &:hover
    {
        .toast-close-button-icon
        {
            fill: #dda373;
        }
    }
}

.toast-close-button-icon
{
    height: 12px;
}

.fade-enter-active,
.fade-leave-active
{
    transition: opacity var(--base-transition-duration) ease;
}

.fade-enter-from,
.fade-leave-to
{
    opacity: 0;
}
</style>
