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
            class="absolute left-0 top-0 z-[1] flex h-[calc(100*var(--vh))] w-screen items-center justify-center"
        >
            <div
                class="absolute left-0 top-0 z-0 size-full bg-black/[.55]"
                data-testid="overlay"
                @click="$emit('close')"
            />
            <div
                class="relative box-border max-h-screen-without-edge w-[58rem] max-w-screen-without-edge overflow-auto bg-overlay px-screen-edge py-12 text-center lg:px-12"
            >
                <button
                    class="group absolute right-0 top-0 flex size-12 items-center justify-center font-thin"
                    data-testid="close-button"
                    :title="locales.closeButtonTitle"
                    @click="$emit('close')"
                >
                    <CloseIcon class="h-4 group-hover:fill-text-highlight" />
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
