<script lang="ts" setup>
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
    import { faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
    import { faSmile } from '@fortawesome/free-regular-svg-icons';
    import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
    import app from '@/app';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { NavbarSocialNetworkProps } from '@/components/main/navbar/types';

    if (!app.component('font-awesome-icon')) {
        app.component('font-awesome-icon', FontAwesomeIcon);
        library.add(faFacebookF, faGithub, faLinkedinIn, faEnvelope, faSmile, faTimes);
    }

    defineProps<NavbarSocialNetworkProps>();
</script>

<template>
    <NavbarLink
        data-testid="navbar-social-network"
        position="right"
        :title="title"
        :to="to"
    >
        <FontAwesomeIcon
            class="px-2.5"
            :icon="icon"
        />
    </NavbarLink>
</template>
