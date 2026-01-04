<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import useStore from '@/store';
    import { computed } from 'vue';
    import ContactForm from '@/components/main/contact/form/ContactForm.vue';

    const store = useStore();

    const locales = computed(() => store.locales.sections.contact);

    const briefText = computed(() => {
        const phoneTitle = locales.value.phoneTitle;

        return locales.value.briefText.replace(
            /{{phoneNumber}}/,
            `<a class="phone-number-link" href="tel:+421949353783" title="${phoneTitle}">+421 949 353 783</a>`,
        );
    });
</script>

<template>
    <MainSection
        data-testid="contact"
        class="py-main-row-gap"
        heading
        name="contact"
    >
        <div class="text-content">
            <div
                class="contact-brief-text"
                data-testid="brief-text"
                v-html="briefText"
            />
            <ContactForm />
        </div>
    </MainSection>
</template>

<style lang="scss" scoped>
    .contact-brief-text {
        max-width: 1100px;

        :deep(.phone-number-link) {
            text-decoration: underline;
            transition: color var(--base-transition-duration);

            &:hover {
                color: var(--text-highlight-color);
            }
        }
    }
</style>
