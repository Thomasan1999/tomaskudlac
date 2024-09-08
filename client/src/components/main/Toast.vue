<template>
    <Teleport to="#modal-container">
        <Transition
            name="fade"
            @after-leave="$emit('close')"
        >
            <div
                v-if="opened"
                class="toast"
                :class="[`type-${type}`]"
                data-testid="toast"
                :style="`--relative-margin-top: ${relativeMarginTop}`"
            >
                <div class="toast-message">{{ message }}</div>
                <button
                    class="toast-close-button"
                    data-testid="closeButton"
                    :title="locales.closeButtonTitle"
                    @click="opened = false"
                >
                    <CloseIcon class="toast-close-button-icon" />
                </button>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
    import useStore from '@/store';
    import { computed, onMounted, ref } from 'vue';
    import CloseIcon from '@/components/main/CloseIcon.vue';
    import { ToastProps } from '@/components/main/types';

    defineProps<ToastProps>();
    defineEmits<{ (event: 'close'): void }>();

    const getRelativeMarginTop = (): string => {
        const toasts = Array.from(document.querySelectorAll<HTMLDivElement>('.toast'));

        const lastToast = toasts.at(-1);

        if (!lastToast) {
            return '';
        }

        return `${lastToast.offsetTop + lastToast.offsetHeight + 20}px`;
    };

    const store = useStore();

    const baseLifetime = ref(10000);

    const opened = ref(false);

    const relativeMarginTop = ref('');

    const lifetime = computed(() => (store.isTouchscreen ? baseLifetime.value / 2 : baseLifetime.value));

    const locales = computed(() => store.locales.toasts);

    onMounted(() => {
        opened.value = true;
        relativeMarginTop.value = getRelativeMarginTop();

        setTimeout(() => {
            opened.value = false;
        }, lifetime.value);
    });
</script>

<style lang="scss" scoped>
    .toast {
        --default-margin-top: calc(var(--content-padding-horizontal) + var(--navbar-height));

        box-sizing: border-box;
        max-width: 360px;
        padding: 10px 30px;
        position: absolute;
        right: calc(-100vw + var(--content-padding-horizontal) + var(--scrollbar-width));
        text-align: left;
        top: var(--relative-margin-top, var(--default-margin-top));
        width: calc(100vw - var(--content-padding-horizontal) * 2);
        z-index: 1;

        &.type-success {
            background-color: var(--primary-green);
        }

        &.type-fail {
            background-color: var(--primary-red);
        }
    }

    .toast-close-button {
        line-height: 0;
        padding: 9px;
        position: absolute;
        right: 0;
        top: 0;

        &:hover {
            .toast-close-button-icon {
                fill: #dda373;
            }
        }
    }

    .toast-close-button-icon {
        height: 12px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity var(--base-transition-duration) ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
