<template lang="pug">
main-section.contact(
    :heading="true"
    name="contact"
)
    div.text-content
        div.contact-brief-text(v-html="briefText")
        contact-form
</template>

<script lang="ts">
import MainSection from '@/components/main/MainSection.vue';
import store from '@/store';
import {computed} from 'vue';
import ContactForm from '@/components/main/contact/ContactForm.vue';

export default {
    name: 'Contact',
    components: {
        ContactForm,
        MainSection
    },
    setup()
    {
        const locales = computed(() => store.locales.sections.contact);

        const briefText = computed(() =>
        {
            const phoneTitle = locales.value.phoneTitle;

            return locales.value.briefText
                .replace(
                    /{{phoneNumber}}/,
                    `<a class="phone-number-link" href="tel:+421949353783" title="${phoneTitle}">+421 949 353 783</a>`
                );
        });

        return {
            briefText,
            locales
        };
    }
};
</script>

<style lang="scss" scoped>
.contact
{
    padding-bottom: var(--main-row-gap);
    padding-top: var(--main-row-gap);
}

.contact-brief-text
{
    max-width: 1100px;

    :deep(.phone-number-link)
    {
        text-decoration: underline;
        transition: color var(--base-transition-duration);

        &:hover
        {
            color: var(--text-highlight-color);
        }
    }
}
</style>
