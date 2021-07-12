<template lang="pug">
nav.navbar(:class="{opened}" ref="root" :style="`--navbar-max-height: ${maxHeight}`")
    div.navbar-part.navbar-left-part.navbar-outer-part
        navbar-link.navbar-left-link.navbar-logo(
            :router-link="true"
            :replace="true"
            title="Tomáš Kudláč"
            to="home"
            @click="$emit('linkClick', 'home')"
        )
    div.navbar-part.navbar-middle-part
        navbar-link.navbar-middle-link(
            v-for="[name, section] in sections"
            :active="name === activeSection"
            :router-link="true"
            :replace="true"
            :title="section.title"
            :to="name"
            @click="onLinkClick(name)"
        )
    div.navbar-part.navbar-right-part.navbar-outer-part
        div.navbar-other-lang-container
            navbar-link.navbar-other-lang(
                :router-link="true"
                :text="locales.otherLangCode"
                :title="locales.otherLangLinkTitle"
                :to="locales.otherLangHref"
                @click="$emit('languageToggle')"
            )
            navbar-icon(v-if="touchscreen" :mode="opened ? 'cross' : 'bars'" @click="opened = !opened")
        div.navbar-social-network-container
            navbar-social-network(v-for="socialNetwork in socialNetworks" v-bind="socialNetwork")
</template>

<script lang="ts">
import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import store from '@/store';
import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';

export default {
    name: 'Navbar',
    components: {
        NavbarIcon,
        NavbarLink,
        NavbarSocialNetwork
    },
    emits: ['languageToggle', 'linkClick'],
    props: {
        activeSection: {
            required: true,
            type: String
        },
        sections: {
            required: true,
            type: Array
        }
    },
    setup(props, {emit})
    {
        const onLinkClick = (sectionName: string) =>
        {
            opened.value = false
            emit('linkClick', sectionName)
        }

        const onResize = () =>
        {
            setHeight();
        };

        const setHeight = () =>
        {
            maxHeight.value = `${root.value!.scrollHeight}px`;
        };

        const maxHeight = ref('');

        const opened = ref(false);

        const root = ref<HTMLDivElement | null>(null);

        const socialNetworks = [
            {
                icon: ['fab', 'facebook-f'],
                title: 'Facebook',
                to: 'https://facebook.com/TomasKudlac99'
            },
            {
                icon: ['fas', 'envelope'],
                title: 'Email',
                to: 'mailto:ahoj@tomaskudlac.sk'
            },
            {
                icon: ['fab', 'linkedin-in'],
                title: 'LinkedIn',
                to: 'https://linkedin.com/in/kudlac/'
            },
            {
                icon: ['fab', 'github'],
                title: 'GitHub',
                to: 'https://github.com/Thomasan1999'
            }
        ];

        const locales = computed(() =>
        {
            return store.locales.navbar;
        });

        const touchscreen = computed(() =>
        {
            return store.isTouchscreen;
        });

        onMounted(() =>
        {
            setHeight();
            window.addEventListener('resize', onResize);
        });

        onBeforeUnmount(() =>
        {
            window.removeEventListener('resize', onResize);
        });

        return {
            locales,
            maxHeight,
            onLinkClick,
            opened,
            root,
            sections: props.sections as any[],
            socialNetworks,
            touchscreen
        };
    }
};
</script>

<style lang="scss" scoped>
.navbar
{
    --navbar-transition-duration: .8s;
    --navbar-link-active-color: #2c2c2c;
    --navbar-outer-padding-horizontal: var(--content-padding-horizontal);

    background-color: var(--primary-color);
    box-shadow: 0 5px 18px 0 rgb(0 0 0 / 33%);
    display: flex;
    flex-wrap: wrap;
    font-size: var(--navbar-font-size);
    height: var(--navbar-height);
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    width: calc(100vw - var(--scrollbar-width));
    z-index: 2;

    @media (max-width: 1023px)
    {
        flex-wrap: wrap;
        justify-content: space-between;
        transition: height var(--navbar-transition-duration);
    }

    &.opened
    {
        @media (max-width: 1023px)
        {
            height: var(--navbar-max-height);
        }
    }
}

.navbar-logo
{
    padding-left: var(--navbar-outer-padding-horizontal);
    padding-right: var(--navbar-outer-padding-horizontal);
}

.navbar-part
{
    align-items: center;
    display: flex;
    height: var(--navbar-height);
}

.navbar-outer-part
{
    position: absolute;
    top: 0;

    @media (max-width: 1023px)
    {
        position: relative;
    }
}

.navbar-left-part
{
    left: 0;
}

.navbar-left-link
{
    --navbar-link-padding-horizontal: 30px;
}

.navbar-middle-part
{
    align-self: center;

    @media (max-width: 1023px)
    {
        flex-direction: column;
        height: auto;
        order: 1;
        width: 100%;
    }
}

.navbar-middle-link
{
    --navbar-link-padding-horizontal: 60px;

    @media (max-width: 1250px)
    {
        --navbar-link-padding-horizontal: 30px;
    }

    @media (max-width: 1023px)
    {
        width: 100%;
    }
}

.navbar-right-part
{
    display: flex;
    gap: 20px;
    right: 0;

    @media (max-width: 1023px)
    {
        display: contents;
    }
}

.navbar-other-lang-container
{
    align-items: center;
    display: flex;
}

.navbar-other-lang
{
    font-family: 'Raleway', sans-serif;
    font-weight: 300;
    width: 50px;
}

.navbar-social-network-container
{
    display: flex;
    height: var(--navbar-height);

    @media (max-width: 1023px)
    {
        align-items: center;
        justify-content: center;
        order: 2;
        width: 100%;
    }
}
</style>
