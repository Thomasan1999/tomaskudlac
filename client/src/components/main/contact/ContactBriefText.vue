<script lang="ts" setup>
    import useStore from '@/store';
    import { computed } from 'vue';
    import LocalesTextParser from '@/components/locales-text-parser/LocalesTextParser.vue';

    const store = useStore();

    const phoneNumber = '+420705958382';
    const formattedPhoneNumber = phoneNumber.replace(/^(\+\d{3})(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3 $4');

    const locales = computed(() => store.locales.sections.contact);

    const briefText = computed(() => locales.value.briefText);
    const phoneTitle = computed(() => locales.value.phoneTitle);
</script>

<template>
    <LocalesTextParser
        class="max-w-275"
        data-testid="brief-text"
        tag="div"
        :text="briefText"
    >
        <template #phoneNumber>
            <a
                data-testid="phone-number-link"
                class="hover:text-text-highlight underline transition-colors"
                :href="`tel:${phoneNumber}`"
                :title="phoneTitle"
                >{{ formattedPhoneNumber }}</a
            >
        </template>
    </LocalesTextParser>
</template>
