<template lang="pug">
div.main(ref="root" :style="`--navbar-height: ${navbarHeight}px`")
    navbar(
        v-if="activeSection"
        :active-section="activeSection"
        :sections="sections"
        @linkClick="onLinkClick"
    )
    div.main-section-container
        component(
            v-for="([sectionName, sectionData]) in sections"
            :key="sectionName"
            :is="sectionData.componentName"
            :name="sectionName"
            :ref="(component) => sectionElements[sectionName] = component.$el"
        )
    footer-component
    div#modal-container
</template>

<script lang="ts">
import Navbar from '@/components/main/navbar/Navbar.vue';
import mainSections from '@/components/main/mainSections';
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import router from '@/router';
import AboutMyself from '@/components/main/about-myself/AboutMyself.vue';
import Projects from '@/components/main/projects/Projects.vue';
import Contact from '@/components/main/contact/Contact.vue';
import Home from '@/components/main/home/Home.vue';
import store from '@/store';
import FooterComponent from '@/components/main/footer/FooterComponent.vue';

export default {
    components: {
        AboutMyself,
        Contact,
        FooterComponent,
        Home,
        Navbar,
        Projects
    },
    name: 'Main',
    setup()
    {
        const onLinkClick = (linkName: string) =>
        {
            if (!linkName)
            {
                return;
            }

            navigatingTo.value = linkName;
            scrollToSection(linkName);
        };

        const onScroll = () =>
        {
            activeSection.value = [...sortedSections.value]
                .reverse()
                .find(([sectionName]) =>
                {
                    const sectionElement = sectionElements.value[sectionName];

                    return root.value!.scrollTop >= (sectionElement.offsetTop - (window.innerHeight / 2));
                })![0];
        };

        const putSectionNameToUrl = (sectionName: string) =>
        {
            router.replace({hash: mainSections[sectionName].url});
        };

        const scrollToSection = (sectionName: string, behavior: ScrollBehavior = 'smooth') =>
        {
            const newTop = sectionElements.value[sectionName].offsetTop - navbarHeight.value

            root.value!.scroll({behavior, top: newTop});
            putSectionNameToUrl(sectionName);
        };

        const activeSection = ref<string | undefined>();

        const navigatingTo = ref<string | undefined>();

        const root = ref<HTMLDivElement | null>(null);

        const sectionElements = ref<Record<string, HTMLDivElement>>({});

        const navbarHeight = computed(() =>
        {
            return store.navbarHeight.value;
        });

        const sortedSections = computed(() =>
        {
            return Object.entries(mainSections)
                .sort(([, sectionDataA], [, sectionDataB]) =>
                {
                    return sectionDataA.order - sectionDataB.order;
                });
        });

        watch(activeSection, () =>
        {
            if (navigatingTo.value)
            {
                if (activeSection.value === navigatingTo.value)
                {
                    navigatingTo.value = '';
                }
                return;
            }

            putSectionNameToUrl(activeSection.value!);
        });

        onMounted(() =>
        {
            const currentHash = router.currentRoute.value.hash;

            const newActiveSection = Object.entries(mainSections).find(([, sectionData]) =>
            {
                return sectionData.url === currentHash;
            })?.[0];

            activeSection.value = newActiveSection ?? 'home';
            scrollToSection(activeSection.value, 'auto');

            root.value!.addEventListener('scroll', onScroll);
        });

        onBeforeUnmount(() =>
        {
            root.value!.removeEventListener('scroll', onScroll);
        });

        return {
            activeSection,
            onLinkClick,
            navbarHeight,
            navigatingTo,
            root,
            sectionElements,
            sections: sortedSections
        };
    }
};
</script>

<style lang="scss" scoped>
.main
{
    --main-row-gap: 50px;

    box-sizing: border-box;
    height: calc(100 * var(--vh));
    overflow: auto;
}
</style>
