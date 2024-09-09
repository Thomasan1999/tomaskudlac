<template>
    <nav
        class="navbar"
        :class="{ opened }"
        ref="root"
        :style="`--navbar-max-height: ${maxHeight}`"
    >
        <div class="navbar-part navbar-left-part navbar-outer-part">
            <NavbarLink
                class="navbar-left-link navbar-logo"
                data-testid="logo"
                routerLink
                replace
                title="Tomáš Kudláč"
                to="home"
                @click="$emit('linkClick', 'home')"
            />
        </div>
        <div class="navbar-part navbar-middle-part">
            <NavbarLink
                class="navbar-middle-link"
                v-for="[name, section] in sections"
                :key="name"
                :active="name === activeSection"
                data-testid="section-link"
                routerLink
                replace
                :title="section.title"
                :to="name"
                @click="onLinkClick(name)"
            />
        </div>
        <div class="navbar-part navbar-right-part navbar-outer-part">
            <div class="navbar-other-lang-container">
                <NavbarLink
                    class="navbar-other-lang"
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
            <div class="navbar-social-network-container">
                <NavbarSocialNetwork
                    v-for="socialNetwork in socialNetworks"
                    v-bind="socialNetwork"
                />
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
    import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
    import useStore from '@/store';
    import NavbarSocialNetwork from '@/components/main/navbar/NavbarSocialNetwork.vue';
    import NavbarIcon from '@/components/main/navbar/NavbarIcon.vue';
    import { NavbarProps, NavbarSocialNetworkProps } from '@/components/main/navbar/types';

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

    const root = ref<HTMLDivElement | null>(null);

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

<style lang="scss" scoped>
    .navbar {
        --navbar-transition-duration: 0.8s;
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

    .navbar-logo {
        padding-left: var(--navbar-outer-padding-horizontal);
        padding-right: var(--navbar-outer-padding-horizontal);
    }

    .navbar-part {
        align-items: center;
        display: flex;
        height: var(--navbar-height);
    }

    .navbar-outer-part {
        position: absolute;
        top: 0;

        @media (max-width: 1023px) {
            position: relative;
        }
    }

    .navbar-left-part {
        left: 0;
    }

    .navbar-left-link {
        --navbar-link-padding-horizontal: 30px;
    }

    .navbar-middle-part {
        align-self: center;

        @media (max-width: 1023px) {
            flex-direction: column;
            height: auto;
            order: 1;
            width: 100%;
        }
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

    .navbar-right-part {
        display: flex;
        gap: 20px;
        right: 0;

        @media (max-width: 1023px) {
            display: contents;
        }
    }

    .navbar-other-lang-container {
        align-items: center;
        display: flex;
    }

    .navbar-other-lang {
        font-family: 'Raleway', sans-serif;
        font-weight: 300;
        width: 50px;
    }

    .navbar-social-network-container {
        display: flex;
        height: var(--navbar-height);

        @media (max-width: 1023px) {
            align-items: center;
            justify-content: center;
            order: 2;
            width: 100%;
        }
    }
</style>
