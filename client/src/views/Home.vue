<template>
    <div class="home" @click="clickOn">
        <scrollbar-container @scroll="sectionCurrentGet" ref="scrollbarContainer">
            <div>
                <header-section @nav-click="scrollToSection" @nav-icon-click="$store.commit(`set`, {props: {navSlidedDown: !$store.state.navSlidedDown}})"/>
                <section class="section-home background-image" ref="home">
                    <div class="curtain-container">
                        <div class="curtain"></div>
                        <home-text/>
                    </div>
                </section>
                <section class="section-main" ref="portfolio">
                    <h2 v-html="text.portfolio.title"></h2>
                    <div class="project-container">
                        <project v-for="project in projects" :key="project" :name="project"/>
                    </div>
                </section>
                <section class="about-myself section-main" ref="aboutMyself">
                    <h2 v-html="text.aboutMyself.title"></h2>
                    <picture>
                        <source type="image/webp" srcset="../modules/about-myself/assets/myself.webp">
                        <source type="image/jpeg" srcset="../modules/about-myself/assets/myself.jpg">
                        <img :alt="text.aboutMyself.myselfAlt" @load="loadedImages += 1" src="../modules/about-myself/assets/myself.jpg">
                    </picture>
                    <div class="column-container">
                        <about-myself-column v-for="aboutMyselfColumn in aboutMyselfColumns" :key="aboutMyselfColumn" :name="aboutMyselfColumn"/>
                    </div>
                </section>
                <section class="section-main" ref="contact">
                    <h2 v-html="new $String(text.contact.title).htmlParse()"></h2>
                    <p class="contact-text" v-html="new $String(text.contact.text).htmlParse()"></p>
                    <contact-form/>
                    <cookies-info v-if="$store.state.lang === `sk` && cookiesShow" @close="cookiesShow = false"/>
                </section>
                <footer-section @click="(val) => cookiesShow = val" :cookies-show="cookiesShow"/>
            </div>
            <alert-container/>
        </scrollbar-container>
    </div>
</template>

<script lang="ts">
    // eslint-disable-next-line
    import Vue                from 'vue';
    import {Component, Watch} from 'vue-property-decorator';
    import {mixins}           from 'vue-class-component';
    import AboutMyselfColumn  from '@/modules/about-myself/components/AboutMyselfColumn.vue';
    import AlertContainer     from '@/modules/alert/components/AlertContainer.vue';
    import ContactForm        from '@/modules/contact/components/ContactForm.vue';
    import CookiesInfo        from '@/modules/footer/components/CookiesInfo.vue';
    import FooterSection      from '@/modules/footer/components/FooterSection.vue';
    import HeaderSection      from '@/modules/home/components/HeaderSection.vue';
    import HomeText           from '@/modules/home/components/HomeText.vue';
    import Project            from '@/modules/portfolio/components/Project.vue';
    import ScrollbarContainer from '@/modules/scrollbar/components/ScrollbarContainer.vue';
    import text               from '@/locales';
    import MainMixin          from '@/mixins/Main';

    @Component({
        components: {
            AboutMyselfColumn,
            AlertContainer,
            ContactForm,
            CookiesInfo,
            FooterSection,
            HeaderSection,
            HomeText,
            Project,
            ScrollbarContainer
        },
        name: `Home`
    })
    export default class Home extends mixins(MainMixin)
    {
        public readonly $refs!: Vue['$refs'] & {
            scrollbarContainer: Vue
        };

        public clickOn($event: MouseEvent): void
        {
            if (this.cookiesShow && !($event.target as HTMLElement).closest(`.cookies-info, .cookies`))
            {
                this.cookiesShow = false;
            }
        }

        public jumpByHash(): void
        {
            if (!this.activeSection.$el)
            {
                return;
            }

            this.$refs.scrollbarContainer.$el.scrollTop = this.activeSection.$el.offsetTop - this.$store.getters.navHeight;
        }

        public resizeOn(): void
        {
            this.$store.commit(`set`, {props: {windowHeight: window.innerHeight, windowWidth: window.innerWidth}});
        }

        public scrollToSection(name: string): void
        {
            this.$refs.scrollbarContainer.$el.scrollTo({
                behavior: `smooth`,
                top: (this.$refs[name] as HTMLElement).offsetTop - this.$store.getters.navHeight
            });
        }

        public sectionCurrentGet(scrollTop: number): void
        {
            const {commit, state} = this.$store;

            const sectionMainCurrent: string = [...state.sections].reverse().find((sectionMainName) =>
            {
                const $el: HTMLElement = this.$refs[sectionMainName] as HTMLElement;

                return $el && (scrollTop > ($el.offsetTop - (window.innerHeight / 2)));
            }) || ``;

            if (state.navItemActive !== sectionMainCurrent)
            {
                commit(`set`, {props: {navItemActive: sectionMainCurrent}});
            }
        }

        public readonly aboutMyselfColumns: string[] = [`whereAmINow`, `freeTimeActivities`, `usefulActivities`];
        public cookiesShow: boolean = false;
        public loadedImages: number = 0;
        public readonly projects: string[] = [`fifamaniaci`, `simonQ`, `villaromaine`, `havranPub`];

        public get activeSection(): SectionMain
        {
            const sectionMainName: SectionMainName = this.$store.state.navItemActive;

            return {$el: this.$refs[sectionMainName] as HTMLElement, href: new this.$String((this.text[sectionMainName] as TextSection).title).urlTo() as string};
        }

        public get hash(): string
        {
            return this.activeSection.href;
        }

        public get text(): typeof text.sk
        {
            return this.texts;
        }

        public created()
        {
            const hash: string = (this.$route.hash.match(/[^?]+/) || [``])[0];

            if (hash !== this.$route.hash)
            {
                this.$router.push({
                    hash,
                    params: {}
                }).catch((err) =>
                {
                    console.error(err);
                });
            }

            const sections: Section[] = this.$store.state.sections.map((sectionName: string) =>
            {
                return {href: new this.$String((this.texts[sectionName] as TextSection).title).urlTo() as string, name: sectionName};
            });

            const sectionCurrent: Section | undefined = sections.find((section) =>
            {
                return section.href === hash.replace(/^#/, ``);
            });

            if (sectionCurrent)
            {
                this.$store.commit(`set`, {props: {navItemActive: sectionCurrent.name}});
            }

            window.addEventListener(`resize`, this.resizeOn);
        }

        @Watch(`hash`)
        public hashChangeOn()
        {
            window.location.hash = this.hash;
        }

        @Watch(`loadedImages`)
        public loadedImagesChangeOn()
        {
            this.jumpByHash();
        }

        public mounted()
        {
            this.jumpByHash();
        }

        public destroyed()
        {
            window.removeEventListener(`resize`, this.resizeOn);
        }
    }
</script>

<style lang="stylus">
    .home
        height 100vh

    .section-main
        box-sizing border-box
        padding-vertical 60px

        @media (max-width 1023px)
            padding-vertical 40px

        @media (max-width 767px)
            padding-vertical 30px

    .section-home
        height 100vh

        &::before
            background-image url("../modules/home/assets/background-home.jpg");
            content ''
            display block
            filter blur(3px)
            height 100%
            left 0
            position absolute
            top 0
            width 100%

            @supports (background-image url("../modules/home/assets/background-home.webp"))
                background-image url("../modules/home/assets/background-home.webp");

        .curtain-container
            align-items center
            box-sizing border-box
            display flex
            font-size 0
            height 100%
            padding-top 60px
            position relative

            .curtain
                background-color rgba(14, 33, 175, .55)

            @media (max-width 1023px)
                height 100vh
                margin-top 0

    .home-text
        z 1

    .about-myself
        img
            border-radius 50%
            max-width 384px
            width calc(100% - 30px)


        .column-container
            display flex
            justify-content center

            @media (max-width 1023px)
                flex-wrap wrap

    .contact-text
        font-color #ffffff
        font-family 'Montserrat', sans-serif
        max-width 1100px

        a
            transition .25s

            &:hover
                font-color $anchor_hover

    .project-container
        display grid
        grid-template-columns 50% 50%
        padding 25px 0

        @media (max-width 1023px)
            grid-template-columns 100%
</style>
