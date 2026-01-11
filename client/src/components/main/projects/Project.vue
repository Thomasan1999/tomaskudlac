<script lang="ts" setup>
    import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';
    import useStore from '@/store';
    import { kebabCase } from 'lodash';
    import ExternalLink from '@/components/ExternalLink.vue';
    import { ProjectProps } from '@/components/main/projects/types';

    const { name } = defineProps<ProjectProps>();

    const store = useStore();

    const setTextHoverHeight = async () => {
        if (!textContent.value) {
            return;
        }

        textHoverHeight.value = textContent.value!.offsetHeight;
    };

    const textHoverHeight = ref(0);

    const textContent = useTemplateRef('textContent');

    const backgroundImage = computed(() => `url(/images/${kebabCase(name)}.${store.imageFormat})`);

    const generalLocales = computed(() => store.locales.sections.projects);

    const projectLocales = computed(() => {
        const root = store.locales.sections.projects.projects;

        return root[name as keyof typeof root];
    });

    watch(() => store.language, setTextHoverHeight);

    onMounted(() => {
        setTextHoverHeight();
        window.addEventListener('resize', setTextHoverHeight);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', setTextHoverHeight);
    });
</script>

<template>
    <ExternalLink
        data-testid="project"
        class="cover-background has-curtain group hover:before:lg:bg-blue-curtain relative flex items-center justify-center before:bg-black/75 before:transition-colors after:block after:pt-[56.25%] after:content-[''] lg:before:bg-black/[.55]"
        :href="projectLocales.href"
        :style="{ backgroundImage }"
        :title="`${generalLocales.showProject} ${[projectLocales.title]}`"
    >
        <div class="text-content">
            <div class="relative">
                <h3
                    class="max-sm:text-[35px] sm:text-[45px]"
                    data-testid="title"
                >
                    {{ projectLocales.title }}
                </h3>
                <div
                    class="group-hover:h-hover-height leading-[1.2] group-hover:opacity-100 max-lg:opacity-100 max-lg:transition-none sm:text-xl lg:h-0 lg:opacity-0 lg:transition-[height,opacity]"
                    :style="`--spacing-hover-height: ${textHoverHeight}px`"
                >
                    <div
                        ref="textContent"
                        data-testid="text-content"
                    >
                        <h4 class="font-bold">{{ generalLocales.whatIveDone }}:</h4>
                        <p>{{ generalLocales.designLabel }}: {{ projectLocales.designDesc }}</p>
                        <p>{{ generalLocales.frontEndLabel }}: {{ projectLocales.frontEndDesc }}</p>
                        <p>{{ generalLocales.backEndLabel }}: {{ projectLocales.backEndDesc }}</p>
                    </div>
                </div>
            </div>
        </div>
    </ExternalLink>
</template>
