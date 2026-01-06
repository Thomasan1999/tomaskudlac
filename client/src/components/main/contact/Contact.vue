<script lang="ts" setup>
    import MainSection from '@/components/main/MainSection.vue';
    import ContactForm from '@/components/main/contact/form/ContactForm.vue';
    import ContactBriefText from '@/components/main/contact/ContactBriefText.vue';
</script>

<template>
    <MainSection
        data-testid="contact"
        class="py-main-row-gap"
        heading
        name="contact"
    >
        <div class="text-content">
            <ContactBriefText />
            <ContactForm />
        </div>
    </MainSection>
</template>
