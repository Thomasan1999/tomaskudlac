<script lang="ts" setup>
    import useStore from '@/store';
    import { computed, onMounted, ref } from 'vue';
    import { ToastProps } from '@/components/main/types';
    import ToastCloseButton from '@/components/toast/ToastCloseButton.vue';
    import { ToastType } from '@/store/types';

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

    onMounted(() => {
        opened.value = true;
        relativeMarginTop.value = getRelativeMarginTop();

        setTimeout(() => {
            opened.value = false;
        }, lifetime.value);
    });
</script>

<template>
    <Teleport to="#modal-container">
        <Transition
            enterActiveClass="transition-opacity"
            leaveActiveClass="transition-opacity"
            enterFromClass="opacity-0"
            leaveToClass="opacity-0"
            @after-leave="$emit('close')"
        >
            <div
                v-if="opened"
                class="toast w-screen-without-edge right-toast-container-right top-toast-container-top absolute z-1 box-border max-w-90 px-7.5 py-2.5 text-left"
                :class="type === ToastType.SUCCESS ? 'bg-primary-green' : 'bg-primary-red'"
                data-testid="toast"
                :style="`--relative-margin-top: ${relativeMarginTop}`"
            >
                <div class="toast-message">{{ message }}</div>
                <ToastCloseButton @click="opened = false" />
            </div>
        </Transition>
    </Teleport>
</template>

<style>
    @import '@/app.css';

    @theme inline {
        --spacing-toast-container-right: calc(-100vw + var(--content-padding-horizontal) + var(--scrollbar-width));
        --spacing-toast-container-top: var(
            --relative-margin-top,
            calc(var(--content-padding-horizontal) + var(--spacing-navbar-height))
        );
    }
</style>
