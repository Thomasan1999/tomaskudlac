<script lang="ts" setup>
    import Navbar from '@/components/main/navbar/Navbar.vue';
    import mainSections from '@/components/main/mainSections';
    import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';
    import type { ComponentPublicInstance } from 'vue';
    import { MainSectionName } from '@/locales/types';
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
        Projects,
    };

    const store = useStore();

    const onLinkClick = (linkName: MainSectionName): void => {
        if (!linkName) {
            return;
        }

        navigatingTo.value = linkName;
        scrollToSection(linkName);
    };

    const onScroll = (): void => {
        // The first section's threshold is always met at any scroll position, so findLast always matches.
        store.activeSection = sections.value.findLast(([sectionName]) => {
            const sectionElement = sectionElements.value[sectionName];

            return root.value!.scrollTop >= sectionElement.offsetTop - window.innerHeight / 2;
        })![0];
    };

    const putSectionNameToUrl = (sectionName: MainSectionName): void => {
        router.replace({ hash: mainSections[sectionName].url });
    };

    const scrollToSection = (sectionName: MainSectionName, behavior: ScrollBehavior = 'smooth'): void => {
        const newTop = sectionElements.value[sectionName].offsetTop - navbarHeight.value;

        root.value!.scroll({ behavior, top: newTop });
        putSectionNameToUrl(sectionName);
    };

    const navigatingTo = ref<string | undefined>();

    const root = useTemplateRef('root');

    const sectionElements = ref<Record<MainSectionName, HTMLDivElement>>({} as Record<MainSectionName, HTMLDivElement>);

    const activeSection = computed(() => store.activeSection);

    const navbarHeight = computed(() => store.navbarHeight);

    const sections = computed(
        () =>
            Object.entries(mainSections).toSorted(
                ([, sectionDataA], [, sectionDataB]) => sectionDataA.order - sectionDataB.order,
            ) as [MainSectionName, (typeof mainSections)[MainSectionName]][],
    );

    watch(
        () => store.activeSection,
        () => {
            if (navigatingTo.value) {
                if (store.activeSection === navigatingTo.value) {
                    navigatingTo.value = '';
                }
                return;
            }

            putSectionNameToUrl(store.activeSection!);
        },
    );

    onMounted(() => {
        const currentHash = router.currentRoute.value.hash;

        const newActiveSection = Object.entries(mainSections).find(
            ([, sectionData]) => sectionData.url === currentHash,
        )?.[0] as MainSectionName | undefined;

        store.activeSection = newActiveSection ?? 'home';

        scrollToSection(store.activeSection, 'auto');

        root.value!.addEventListener('scroll', onScroll);
        store.scrollbarWidth = root.value!.offsetWidth - root.value!.clientWidth;
    });

    onBeforeUnmount(() => {
        root.value!.removeEventListener('scroll', onScroll);
    });
</script>

<template>
    <div
        ref="root"
        data-testid="main"
        class="relative box-border h-[calc(100*var(--vh))] overflow-auto"
        :style="`--navbar-height: ${navbarHeight}px`"
    >
        <Navbar
            v-if="activeSection"
            :activeSection="activeSection"
            :sections="sections"
            @linkClick="onLinkClick"
        />
        <div>
            <Component
                :is="components[sectionData.componentName]"
                v-for="[sectionName, sectionData] in sections"
                :key="sectionName"
                :ref="(component: ComponentPublicInstance) => (sectionElements[sectionName] = component.$el)"
                :name="sectionName"
            />
        </div>
        <FooterComponent />
    </div>
</template>
