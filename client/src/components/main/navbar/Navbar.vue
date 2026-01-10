<script lang="ts" setup>
    import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
    import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
    import useStore from '@/store';
    import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
    import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';
    import { NavbarProps, NavbarSocialNetworkProps } from '@/components/main/navbar/types';
    import NavbarPart from '@/components/main/navbar/NavbarPart.vue';

    defineProps<NavbarProps>();
    const emit = defineEmits<{
        (event: 'languageToggle'): void;
        (event: 'linkClick', sectionName: string): void;
    }>();

    const store = useStore();

    const onLinkClick = (sectionName: string) => {
        opened.value = false;
        emit('linkClick', sectionName);
    };

    const onResize = () => {
        setHeight();
    };

    const setHeight = () => {
        maxHeight.value = `${root.value!.scrollHeight}px`;
    };

    const maxHeight = ref('');

    const opened = ref(false);

    const root = useTemplateRef('root');

    const socialNetworks: NavbarSocialNetworkProps[] = [
        {
            icon: ['fab', 'facebook-f'],
            title: 'Facebook',
            to: 'https://facebook.com/TomasKudlac99',
        },
        {
            icon: ['fas', 'envelope'],
            title: 'Email',
            to: 'mailto:ahoj@tomaskudlac.sk',
        },
        {
            icon: ['fab', 'linkedin-in'],
            title: 'LinkedIn',
            to: 'https://linkedin.com/in/kudlac/',
        },
        {
            icon: ['fab', 'github'],
            title: 'GitHub',
            to: 'https://github.com/Thomasan1999',
        },
    ];

    const locales = computed(() => store.locales.navbar);

    const touchscreen = computed(() => store.isTouchscreen);

    onMounted(() => {
        setHeight();
        window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize);
    });
</script>

<template>
    <nav
        ref="root"
        class="navbar"
        :class="{ opened }"
        :style="`--navbar-max-height: ${maxHeight}`"
    >
        <NavbarPart
            class="left-0"
            outer
        >
            <NavbarLink
                class="navbar-left-link px-screen-edge"
                data-testid="logo"
                routerLink
                replace
                title="Tomáš Kudláč"
                to="home"
                @click="$emit('linkClick', 'home')"
            />
        </NavbarPart>
        <NavbarPart class="self-center max-lg:order-1 max-lg:h-auto max-lg:w-full max-lg:flex-col">
            <NavbarLink
                v-for="[name, section] in sections"
                :key="name"
                class="navbar-middle-link"
                :active="name === activeSection"
                data-testid="section-link"
                routerLink
                replace
                :title="section.title"
                :to="name"
                @click="onLinkClick(name)"
            />
        </NavbarPart>
        <NavbarPart
            class="right-0 flex gap-5 max-lg:contents"
            outer
        >
            <div class="flex items-center">
                <NavbarLink
                    class="w-12 font-light"
                    data-testid="navbar-other-lang"
                    routerLink
                    :text="locales.otherLangCode"
                    :title="locales.otherLangLinkTitle"
                    :to="locales.otherLangHref"
                    @click="$emit('languageToggle')"
                />
                <NavbarIcon
                    v-if="touchscreen"
                    :mode="opened ? 'cross' : 'bars'"
                    @click="opened = !opened"
                />
            </div>
            <div class="flex h-navbar-height max-lg:order-2 max-lg:w-full max-lg:items-center max-lg:justify-center">
                <NavbarSocialNetwork
                    v-for="socialNetwork in socialNetworks"
                    v-bind="socialNetwork"
                />
            </div>
        </NavbarPart>
    </nav>
</template>

<style lang="scss" scoped>
    .navbar {
        --navbar-transition-duration: 0.8s;

        background-color: var(--primary-color);
        box-shadow: 0 5px 18px 0 rgb(0 0 0 / 33%);
        display: flex;
        flex-wrap: wrap;
        font-size: var(--navbar-font-size);
        height: var(--navbar-height);
        justify-content: center;
        left: 0;
        overflow: hidden;
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 2;

        @media (max-width: 1023px) {
            flex-wrap: wrap;
            justify-content: space-between;
            transition: height var(--navbar-transition-duration);
        }

        &.opened {
            @media (max-width: 1023px) {
                height: var(--navbar-max-height);
            }
        }
    }

    .navbar-left-link {
        --navbar-link-padding-horizontal: 30px;
    }

    .navbar-middle-link {
        --navbar-link-padding-horizontal: 60px;

        @media (max-width: 1250px) {
            --navbar-link-padding-horizontal: 30px;
        }

        @media (max-width: 1023px) {
            width: 100%;
        }
    }
</style>
