<template>
<NavbarLink position="right" :title="title" :to="to">
    <FontAwesomeIcon class="navbar-social-network" :icon="icon"/>
</NavbarLink>
</template>

<script lang="ts" setup>
import {library} from '@fortawesome/fontawesome-svg-core';
import {faEnvelope, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faGithub, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {faSmile} from '@fortawesome/free-regular-svg-icons';
import NavbarLink from '@/components/main/navbar/NavbarLink.vue';
import app from '@/app';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

if (!app.component('font-awesome-icon'))
{
    app.component('font-awesome-icon', FontAwesomeIcon);
    library.add(faFacebookF, faGithub, faLinkedinIn, faEnvelope, faSmile, faTimes);
}

defineProps<{icon: [string, string], title: string, to: string}>();
</script>

<style lang="scss" scoped>
.navbar-social-network
{
    padding-left: 10px;
    padding-right: 10px;
}
</style>
