<script lang="ts" setup>
    import { computed } from 'vue';
    import useStore from '@/store';
    import skLocales from '@/locales/sk';
    import CloseIcon from '@/components/main/CloseIcon.vue';

    defineEmits<{ (event: 'close'): void }>();

    const store = useStore();

    const locales = computed(() => (store.locales as typeof skLocales).cookies);
</script>

<template>
    <Teleport to="#modal-container">
        <div
            data-testid="cookies-modal"
            class="absolute top-0 left-0 z-1 flex h-[calc(100*var(--vh))] w-screen items-center justify-center"
        >
            <div
                class="absolute top-0 left-0 z-0 size-full bg-black/[.55]"
                data-testid="overlay"
                @click="$emit('close')"
            />
            <div
                class="max-h-screen-without-edge max-w-screen-without-edge bg-overlay px-screen-edge relative box-border w-232 overflow-auto py-12 text-center lg:px-12"
            >
                <button
                    class="group absolute top-0 right-0 flex size-12 items-center justify-center font-thin"
                    data-testid="close-button"
                    :title="locales.closeButtonTitle"
                    @click="$emit('close')"
                >
                    <CloseIcon class="group-hover:fill-text-highlight h-4" />
                </button>

                <div class="flex flex-col gap-6">
                    <div
                        v-for="paragraph in locales.paragraphs"
                        class="flex flex-col gap-2.5"
                    >
                        <h3 class="font-bold">{{ paragraph.title }}</h3>
                        <p class="cookies-modal-paragraph-text">{{ paragraph.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>
