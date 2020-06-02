<template>
    <section class="header">
        <header>
            <nav class="inline-block-container" :style="{height: `${$store.getters.navHeight}px`}">
                <a class="link logo" :href="`/#${new $String(texts.home.title).urlTo()}`" @click.prevent="$emit(`nav-click`, `home`)">Tomáš Kudláč</a>
                <div class="nav-item-container">
                    <a v-for="navItem in navItems" :key="navItem" class="nav-item link" :class="{active: $store.state.navItemActive === navItem}"
                       :href="`#${new $String(texts[navItem].title).urlTo()}`"
                       v-html="texts[navItem].title" @click.prevent="$emit(`nav-click`, navItem)"></a>
                </div>
                <router-link :to="$store.getters.langOtherProps.href" class="link language" v-html="$store.getters.langOtherProps.nameUpper"
                             @click.native="$store.dispatch(`langUpdate`)"/>
                <div class="inline-block-container social-network-container">
                    <a v-for="socialNetwork in socialNetworks" :key="socialNetwork.title" target="_blank" rel="noopener noreferrer" :href="socialNetwork.href"
                       class="social-network link" :title="socialNetwork.title">
                        <font-awesome-icon :icon="socialNetwork.icon"/>
                    </a>
                </div>
                <div class="bar-icon" v-if="$store.getters.touchscreen" :class="{bars: !slidedDown, cross: slidedDown}" @click="navIconClickOn">
                    <svg v-for="index in [1, 2, 3]" :key="index" :class="`rect-${index}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 4">
                        <rect height="4" width="25" rx="3" ry="3"></rect>
                    </svg>
                </div>
            </nav>
        </header>
    </section>
</template>

<script lang="ts">
    import {Component}     from 'vue-property-decorator';
    import {mixins}        from 'vue-class-component';
    import MainMixin       from '@/mixins/Main';
    // eslint-disable-next-line no-unused-vars
    import {SocialNetwork} from '@/modules/home/types/components.d';

    /** @description The component containing the header of the website located at the top of the website. */
    @Component({
        name: `HeaderSection`
    })
    export default class HeaderSection extends mixins(MainMixin)
    {
        /** @description Listener of the click event targeted on a nav-bar icon. */
        public navIconClickOn(): void
        {
            this.slidedDown = !this.slidedDown;
            this.$emit(`nav-icon-click`);
        }

        /** @description List of all nav-bar links which point to sections of the website. */
        public readonly navItems: SectionMainName[] = [...this.$store.state.sections];
        /** @description Determines whether the nav-bar is slided down, sliding down works only if the viewport is narrower than 1024px. */
        public slidedDown: boolean = false;
        /** @description List of all social network links located in the header. */
        public readonly socialNetworks: SocialNetwork[] = [
            {
                href: `https://facebook.com/TomasKudlac99`, icon: [`fab`, `facebook-f`], title: `Facebook`
            },
            {
                href: `mailto:ahoj@tomaskudlac.sk`, icon: [`fas`, `envelope`], title: `Email`
            },
            {
                href: `https://linkedin.com/in/kudlac/`, icon: [`fab`, `linkedin-in`], title: `Linkedin`
            },
            {
                href: `https://twitter.com/tomas_kudlac`, icon: [`fab`, `twitter`], title: `Twitter`
            }
        ];
    }
</script>

<style lang="stylus" scoped>
    nav
        background-color $primary_color
        box-shadow 0 5px 18px 0 rgba(0, 0, 0, 0.33)
        font-color #ffffff
        left 0
        overflow hidden
        position fixed
        top 0
        transition .8s
        width calc(100vw - 17px)
        z 2

        @media (max-width 1023px)
            width 100vw

    .link
        font-size 20px
        font-weight 300
        line-height 3
        transition all .25s

        &.active
            pointer-events none

        &:hover
            @media (min-width 900px)
                background-color $primary_color_light

    .nav-item-container
        display inline-flex
        justify-content center

        @media (max-width 1023px)
            flex-wrap wrap
            padding-top 65px
            width 100%

    .logo
        font-color #ffffff
        font-family 'Inconsolata', monospace
        font-weight 700
        height 60px
        left 0
        padding-horizontal 30px
        position absolute
        top 0
        transition none
        z 3

        @media (max-width 1023px)
            height 25px
            line-height 25px
            padding-horizontal 15px
            top 20px

    .social-network-container
        position absolute
        right 10px

        .link
            padding 0 10px

        @media (max-width 1023px)
            position static
            right auto

    .language
        padding 0 10px
        position absolute
        right 176px

        @media (max-width 1023px)
            padding 0
            right 66.25px
            top 2.5px

    .bar-icon
        cursor pointer
        height 25px
        margin auto
        position absolute
        right 15px
        top 20px
        width (1.25 * 25) px
        z 3

        svg
            height 20%
            left 0
            position absolute

        rect
            fill #ffffff
            transform-origin 50% 50%

        &.cross
            svg
                top 40%
                transition top .4s 0s, transform .4s .4s

            .rect-1
                transform rotate(-45deg)

            .rect-2
                transform rotate(-45deg)

            .rect-3
                transform rotate(45deg)

        &.bars
            svg
                transform rotate(0deg)
                transition top .4s .4s, transform .4s 0s

            .rect-1
                top 0

            .rect-2
                top 40%

            .rect-3
                top 80%

        @media (max-width 1023px)
            display block

    .nav-item
        font-family 'Inconsolata', monospace
        font-weight 700
        padding 0 60px

        &.active
            background-color #2c2c2c

        @media (max-width 1229px)
            padding 0 30px

        @media (max-width 1023px)
            width 100%
</style>
