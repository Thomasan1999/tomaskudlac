<script lang="ts" setup>
    import useStore from '@/store';
    import { computed } from 'vue';
    import LocalesTextParser from '@/components/locales-text-parser/LocalesTextParser.vue';

    const store = useStore();

    const locales = computed(() => store.locales.sections.contact);

    const briefText = computed(() => locales.value.briefText);
    const phoneTitle = computed(() => locales.value.phoneTitle);
</script>

<template>
    <LocalesTextParser
        class="max-w-[68.75rem]"
        data-testid="brief-text"
        tag="div"
        :text="briefText"
    >
        <template #phoneNumber>
            <a
                data-testid="phone-number-link"
                class="underline transition-colors hover:text-text-highlight"
                href="tel:+421949353783"
                :title="phoneTitle"
                >+421 949 353 783</a
            >
        </template>
    </LocalesTextParser>
</template>
