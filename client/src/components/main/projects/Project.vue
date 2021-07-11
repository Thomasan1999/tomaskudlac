<template lang="pug">
external-link.project.cover-background.has-curtain(
    :href="projectLocales.href"
    :style="{backgroundImage}"
    :title="`${generalLocales.showProject} ${[projectLocales.title]}`"
)
    div.text-content
        div.project-content
            h3.project-title {{projectLocales.title}}
            div.project-text(:style="`--hover-height: ${textHoverHeight}px`")
                div.project-text-content(ref="textContent")
                    h4.project-what-ive-done {{generalLocales.whatIveDone}}:
                    p.project-text-design {{generalLocales.designLabel}}: {{projectLocales.designDesc}}
                    p.project-text-front-end {{generalLocales.frontEndLabel}}: {{projectLocales.frontEndDesc}}
                    p.project-text-back-end {{generalLocales.backEndLabel}}: {{projectLocales.backEndDesc}}
</template>

<script lang="ts">
import {computed, onBeforeUnmount, onMounted, ref, watch} from 'vue';
import store from '@/store';
import {kebabCase} from 'lodash';
import ExternalLink from '@/components/ExternalLink.vue';

export default {
    name: 'Project',
    components: {ExternalLink},
    props: {
        name: {
            required: true,
            type: String
        }
    },
    setup(props)
    {
        const setTextHoverHeight = async () =>
        {
            if (!textContent.value)
            {
                return;
            }

            textHoverHeight.value = textContent.value!.offsetHeight;
        };

        const textHoverHeight = ref(0);

        const textContent = ref<HTMLDivElement | null>(null);

        const backgroundImage = computed(() =>
        {
            return `url(/images/${kebabCase(props.name)}.${store.imageFormat.value})`;
        });

        const generalLocales = computed(() =>
        {
            return store.locales.value.sections.projects;
        });

        const projectLocales = computed(() =>
        {
            const root = store.locales.value.sections.projects.projects;

            return root[props.name as keyof typeof root];
        });

        watch(store.language, setTextHoverHeight);

        onMounted(() =>
        {
            setTextHoverHeight();
            window.addEventListener('resize', setTextHoverHeight);
        });

        onBeforeUnmount(() =>
        {
            window.removeEventListener('resize', setTextHoverHeight);
        });

        return {
            backgroundImage,
            generalLocales,
            projectLocales,
            textContent,
            textHoverHeight
        };
    }
};
</script>

<style lang="scss" scoped>
.project
{
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;

    &:before
    {
        background-color: rgba(0, 0, 0, .55);
        transition: background-color var(--base-transition-duration);

        @media (max-width: 1023px)
        {
            background-color: rgba(0, 0, 0, .75);
        }
    }

    &:after
    {
        content: '';
        display: block;
        padding-top: 56.25%;
    }

    &:hover
    {
        &:before
        {
            @media (min-width: 1024px)
            {
                background-color: rgba(14, 33, 175, .55);
                opacity: 1;
            }
        }

        .project-text
        {
            height: var(--hover-height);
            opacity: 1;
        }
    }
}

.project-content
{
    position: relative;
}

.project-what-ive-done
{
    font-weight: 700;
}

.project-title
{
    font-size: var(--project-title-font-size);
}

.project-text
{
    font-size: var(--big-text-font-size);
    height: 0;
    line-height: 1.2;
    opacity: 0;
    transition: height var(--base-transition-duration), opacity var(--base-transition-duration);

    @media (max-width: 1023px)
    {
        height: auto;
        opacity: 1;
        transition: none;
    }
}
</style>