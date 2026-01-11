<script lang="ts" setup>
    import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
    import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue';
    import useStore from '@/store';
    import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
    import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';
    import { NavbarIconMode, NavbarProps, NavbarSocialNetworkProps } from '@/components/main/navbar/types';
    import NavbarPart from '@/components/main/navbar/NavbarPart.vue';
    import { FontWeight } from '@/types/components';

    defineProps<NavbarProps>();
    const emit = defineEmits<{
        (event: 'languageToggle'): void;
        (event: 'linkClick', sectionName: string): void;
    }>();

    const store = useStore();

    const onLinkClick = (sectionName: string): void => {
        opened.value = false;
        emit('linkClick', sectionName);
    };

    const onResize = (): void => {
        setHeight();
    };

    const setHeight = (): void => {
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

    const isOpenable = computed(() => store.maxXl);

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
        data-testid="navbar"
        class="h-navbar-height bg-primary shadow-navbar sticky top-0 left-0 z-2 flex w-full flex-wrap justify-center overflow-hidden text-xl max-xl:justify-between max-xl:transition-[height] max-xl:duration-[0.8s]"
        :style="opened && isOpenable ? { height: maxHeight } : ''"
    >
        <NavbarPart
            class="left-0"
            outer
        >
            <NavbarLink
                class="px-screen-edge"
                data-testid="logo"
                routerLink
                replace
                title="Tomáš Kudláč"
                to="home"
                @click="$emit('linkClick', 'home')"
            />
        </NavbarPart>
        <NavbarPart class="self-center max-xl:order-1 max-xl:h-auto max-xl:w-full max-xl:flex-col">
            <NavbarLink
                v-for="[name, section] in sections"
                :key="name"
                class="max-xl:px-screen-edge px-16 max-xl:w-full"
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
            class="right-0 flex gap-5 max-xl:contents"
            outer
        >
            <div class="flex items-center">
                <NavbarLink
                    class="w-12"
                    data-testid="navbar-other-lang"
                    :fontWeight="FontWeight.LIGHT"
                    routerLink
                    :text="locales.otherLangCode"
                    :title="locales.otherLangLinkTitle"
                    :to="locales.otherLangHref"
                    @click="$emit('languageToggle')"
                />
                <NavbarIcon
                    v-if="isOpenable"
                    :mode="opened ? NavbarIconMode.CROSS : NavbarIconMode.BARS"
                    @click="opened = !opened"
                />
            </div>
            <div class="h-navbar-height flex max-xl:order-2 max-xl:w-full max-xl:items-center max-xl:justify-center">
                <NavbarSocialNetwork
                    v-for="socialNetwork in socialNetworks"
                    v-bind="socialNetwork"
                />
            </div>
        </NavbarPart>
    </nav>
</template>
