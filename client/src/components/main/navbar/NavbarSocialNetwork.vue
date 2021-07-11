<template lang="pug">
navbar-link(position="right" :title="title" :to="to")
    font-awesome-icon.navbar-social-network(:icon="icon")
</template>

<script lang="ts">
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
}

library.add(faFacebookF, faGithub, faLinkedinIn, faEnvelope, faSmile, faTimes);

export default {
    name: 'NavbarSocialNetwork',
    components: {
        NavbarLink
    },
    props: {
        icon: {
            required: true,
            type: Array
        },
        title: {
            required: true,
            type: String
        },
        to: {
            required: true,
            type: String
        }
    },
    setup()
    {
    }
};
</script>

<style lang="scss" scoped>
.navbar-social-network
{
    padding-left: 10px;
    padding-right: 10px;
}
</style>
