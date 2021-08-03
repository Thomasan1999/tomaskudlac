<template lang="pug">
router-view(v-if="initialized" :style="`--vh: ${windowHeight / 100}px`")
</template>

<script lang="ts">
import store from '@/store';
import {computed, ref} from 'vue';

export default {
    name: 'App',
    setup()
    {
        const initialized = ref(false);

        store.init().then(() =>
        {
            initialized.value = true;
        });

        const windowHeight = computed(() => store.windowHeight);

        return {
            initialized,
            windowHeight
        };
    }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway:300,400,500,700|Montserrat&display=swap');
@import 'reset';

#app
{
    --base-line-height: 1.6;

    --base-transition-duration: .25s;

    --content-padding-horizontal: 30px;

    --primary-background-color: #1c1c1c;
    --primary-color: #191970;
    --primary-color-light: #2828b3;
    --primary-red: #da0b24;
    --primary-green: #1e9f31;
    --primary-text-color: #ffffff;
    --selection-color: #0e6beb;
    --text-highlight-color: #cc7832;

    --section-name-font-family: var(--title-font-family);
    --title-font-family: Raleway, sans-serif;

    --mobile-max-width: 767px;
    --touchscreen-max-width: 1023px;

    --scrollbar-thumb-color: #444444;
    --scrollbar-thumb-hover-color: #666666;
    --scrollbar-thumb-active-color: #959595;
    --scrollbar-color: #eeeeee;
    --scrollbar-width: 17px;

    --about-myself-column-title-font-size: 30px;
    --big-text-font-size: 20px;
    --main-section-name-font-size: 50px;
    --navbar-font-size: 20px;
    --project-title-font-size: 45px;
    --text-font-size: 16px;

    background-color: var(--primary-background-color);
    color: var(--primary-text-color);
    font-family: 'Raleway', sans-serif;
    font-size: var(--text-font-size);
    line-height: var(--base-line-height);
    scrollbar-color: var(--scrollbar-thumb-color) var(--scrollbar-color);
    text-align: center;

    @media (max-width: 1023px)
    {
        --content-padding-horizontal: 15px;
        --scrollbar-width: 0px;
    }

    @media (max-width: 549px)
    {
        --about-myself-column-title-font-size: 25px;
        --big-text-font-size: 16px;
        --main-section-name-font-size: 45px;
        --project-title-font-size: 35px;
        --text-font-size: 14px;
    }
}

#modal-container
{
    height: 0;
    left: 0;
    position: fixed;
    top: 0;
    width: 0;
    z-index: 100;
}

::-webkit-scrollbar
{
    background: var(--scrollbar-color);
}

::-webkit-scrollbar-thumb
{
    background: var(--scrollbar-thumb-color);

    &:hover
    {
        background: var(--scrollbar-thumb-hover-color);
    }

    &:active
    {
        background: var(--scrollbar-thumb-active-color);
    }
}

::selection, mark
{
    background-color: var(--selection-color);
    color: currentColor;
}

.has-curtain
{
    position: relative;

    &:before
    {
        content: '';
        display: block;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 0;
    }
}

.cover-background
{
    background-size: cover;
    background-repeat: no-repeat;
}

.text-content
{
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-left: var(--content-padding-horizontal);
    padding-right: var(--content-padding-horizontal);
    row-gap: var(--main-row-gap);
}

a
{
    color: currentColor;
    text-decoration: none;
}

button
{
    appearance: none;
    background-color: transparent;
    border: 0;
    color: currentColor;
    cursor: pointer;
    font: inherit;
    padding: 0;

    &:focus
    {
        outline: none;
    }
}

h1, h2, h3
{
    font-family: var(--title-font-family);
    font-weight: 400;
}

strong
{
    color: var(--text-highlight-color);
    font-weight: 600;
}
</style>
