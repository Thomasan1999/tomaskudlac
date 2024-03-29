<template>
    <div class="main" ref="root" :style="`--navbar-height: ${navbarHeight}px`">
        <Navbar
            v-if="activeSection"
            :activeSection="activeSection"
            :sections="sections"
            @linkClick="onLinkClick"
        />
        <div class="main-section-container">
            <Component
                v-for="([sectionName, sectionData]) in sections"
                :key="sectionName"
                :is="components[sectionData.componentName]"
                :name="sectionName"
                :ref="(component) => sectionElements[sectionName] = component.$el"
            />
        </div>
        <FooterComponent/>
        <div id="modal-container"/>
    </div>
</template>

<script lang="ts" setup>
    import Navbar from '@/components/main/navbar/Navbar.vue';
    import mainSections from '@/components/main/mainSections';
    import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';
    import router from '@/router';
    import AboutMyself from '@/components/main/about-myself/AboutMyself.vue';
    import Projects from '@/components/main/projects/Projects.vue';
    import Contact from '@/components/main/contact/Contact.vue';
    import Home from '@/components/main/home/Home.vue';
    import useStore from '@/store';
    import FooterComponent from '@/components/main/footer/FooterComponent.vue';

    const components = {
        AboutMyself,
        Contact,
        Home,
        Projects
    };

    const store = useStore();

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
        store.activeSection = [...sections.value]
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
        const newTop = sectionElements.value[sectionName].offsetTop - navbarHeight.value;

        root.value!.scroll({behavior, top: newTop});
        putSectionNameToUrl(sectionName);
    };

    const navigatingTo = ref<string | undefined>();

    const root = ref<HTMLDivElement | null>(null);

    const sectionElements = ref<Record<string, HTMLDivElement>>({});

    const activeSection = computed(() => store.activeSection);

    const navbarHeight = computed(() => store.navbarHeight);

    const sections = computed(() => (
        Object.entries(mainSections)
            .sort(([, sectionDataA], [, sectionDataB]) => sectionDataA.order - sectionDataB.order)
    ));

    watch(() => store.activeSection, () =>
    {
        if (navigatingTo.value)
        {
            if (store.activeSection === navigatingTo.value)
            {
                navigatingTo.value = '';
            }
            return;
        }

        putSectionNameToUrl(store.activeSection!);
    });

    onMounted(() =>
    {
        const currentHash = router.currentRoute.value.hash;

        const newActiveSection = Object.entries(mainSections)
            .find(([, sectionData]) => sectionData.url === currentHash)?.[0];

        store.activeSection = newActiveSection ?? 'home';

        scrollToSection(store.activeSection, 'auto');

        root.value!.addEventListener('scroll', onScroll);
        store.scrollbarWidth = root.value!.offsetWidth - root.value!.clientWidth;
    });

    onBeforeUnmount(() =>
    {
        root.value!.removeEventListener('scroll', onScroll);
    });
</script>

<style lang="scss" scoped>
    .main
    {
        --main-row-gap: 50px;

        box-sizing: border-box;
        height: calc(100 * var(--vh));
        overflow: auto;
        position: relative;
    }

    #modal-container
    {
        height: 0;
        left: 0;
        position: fixed;
        top: 0;
        width: 0;
        z-index: 100;
    }
</style>
