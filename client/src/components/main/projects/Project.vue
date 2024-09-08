<template>
    <ExternalLink
        class="project cover-background has-curtain"
        :href="projectLocales.href"
        :style="{ backgroundImage }"
        :title="`${generalLocales.showProject} ${[projectLocales.title]}`"
    >
        <div class="text-content">
            <div class="project-content">
                <h3
                    class="project-title"
                    data-testid="title"
                >
                    {{ projectLocales.title }}
                </h3>
                <div
                    class="project-text"
                    :style="`--hover-height: ${textHoverHeight}px`"
                >
                    <div
                        class="project-text-content"
                        data-testid="textContent"
                        ref="textContent"
                    >
                        <h4 class="project-what-ive-done">{{ generalLocales.whatIveDone }}:</h4>
                        <p class="project-text-design">
                            {{ generalLocales.designLabel }}: {{ projectLocales.designDesc }}
                        </p>
                        <p class="project-text-front-end">
                            {{ generalLocales.frontEndLabel }}: {{ projectLocales.frontEndDesc }}
                        </p>
                        <p class="project-text-back-end">
                            {{ generalLocales.backEndLabel }}: {{ projectLocales.backEndDesc }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </ExternalLink>
</template>

<script lang="ts" setup>
    import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
    import useStore from '@/store';
    import { kebabCase } from 'lodash';
    import ExternalLink from '@/components/ExternalLink.vue';
    import { ProjectProps } from '@/components/main/projects/types';

    const props = defineProps<ProjectProps>();

    const store = useStore();

    const setTextHoverHeight = async () => {
        if (!textContent.value) {
            return;
        }

        textHoverHeight.value = textContent.value!.offsetHeight;
    };

    const textHoverHeight = ref(0);

    const textContent = ref<HTMLDivElement | null>(null);

    const backgroundImage = computed(() => `url(/images/${kebabCase(props.name)}.${store.imageFormat})`);

    const generalLocales = computed(() => store.locales.sections.projects);

    const projectLocales = computed(() => {
        const root = store.locales.sections.projects.projects;

        return root[props.name as keyof typeof root];
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

<style lang="scss" scoped>
    .project {
        align-items: center;
        display: flex;
        justify-content: center;
        position: relative;

        &:before {
            background-color: rgba(0, 0, 0, 0.55);
            transition: background-color var(--base-transition-duration);

            @media (max-width: 1023px) {
                background-color: rgba(0, 0, 0, 0.75);
            }
        }

        &:after {
            content: '';
            display: block;
            padding-top: 56.25%;
        }

        &:hover {
            &:before {
                @media (min-width: 1024px) {
                    background-color: rgba(14, 33, 175, 0.55);
                    opacity: 1;
                }
            }

            .project-text {
                height: var(--hover-height);
                opacity: 1;
            }
        }
    }

    .project-content {
        position: relative;
    }

    .project-what-ive-done {
        font-weight: 700;
    }

    .project-title {
        font-size: var(--project-title-font-size);
    }

    .project-text {
        font-size: var(--big-text-font-size);
        height: 0;
        line-height: 1.2;
        opacity: 0;
        transition:
            height var(--base-transition-duration),
            opacity var(--base-transition-duration);

        @media (max-width: 1023px) {
            height: auto;
            opacity: 1;
            transition: none;
        }
    }
</style>
