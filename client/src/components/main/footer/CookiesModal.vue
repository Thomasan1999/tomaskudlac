<template lang="pug">
teleport(to="#modal-container")
    div.cookies-modal
        div.cookies-modal-overlay(@click="$emit('close')")
        div.cookies-modal-content
            button.cookies-modal-close-button(:title="locales.closeButtonTitle" @click="$emit('close')")
                close-icon.cookies-modal-close-button-icon
            div.cookies-modal-paragraph-container
                div.cookies-modal-paragraph(v-for="paragraph in locales.paragraphs")
                    h3.cookies-modal-paragraph-heading {{paragraph.title}}
                    p.cookies-modal-paragraph-text {{paragraph.text}}
</template>

<script lang="ts">
import {computed} from 'vue';
import store from '@/store';
import skLocales from '@/locales/sk';
import CloseIcon from '@/components/main/CloseIcon.vue';

export default {
    name: 'CookiesModal',
    components: {
        CloseIcon
    },
    emits: ['close'],
    setup()
    {
        const locales = computed(() =>
        {
            return (store.locales.value as typeof skLocales).cookies;
        });

        return {
            locales
        };
    }
};
</script>

<style lang="scss" scoped>
.cookies-modal
{
    align-items: center;
    display: flex;
    height: calc(100 * var(--vh));
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: 100vw;
    z-index: 1;
}

.cookies-modal-overlay
{
    background-color: rgba(0, 0, 0, .55);
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 0;
}

.cookies-modal-content
{
    background-color: #222222;
    box-sizing: border-box;
    max-height: calc(100% - var(--content-padding-horizontal) * 2);
    max-width: calc(100% - var(--content-padding-horizontal) * 2);
    overflow: auto;
    padding: 50px;
    position: relative;
    text-align: center;
    width: 1000px;

    @media (max-width: 1029px)
    {
        padding-left: var(--content-padding-horizontal);
        padding-right: var(--content-padding-horizontal);
    }
}

.cookies-modal-close-button
{
    align-items: center;
    display: flex;
    font-weight: 100;
    height: 50px;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;

    &:hover
    {
        .cookies-modal-close-button-icon
        {
            fill: var(--text-highlight-color);
        }
    }
}

.cookies-modal-close-button-icon
{
    height: 16px;
}

.cookies-modal-text
{
    position: relative;
}

.cookies-modal-paragraph-container
{
    display: flex;
    flex-direction: column;
    gap: 25px;
}

.cookies-modal-paragraph
{
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cookies-modal-paragraph-heading
{
    font-weight: 700;
}
</style>
