<template lang="pug">
main-section.projects(
    heading
    name="projects"
)
    div.project-container
        project(v-for="project in projects" :name="project")
</template>

<script lang="ts">
import MainSection from '@/components/main/MainSection.vue';
import Project from '@/components/main/projects/Project.vue';

export default {
    name: 'Projects',
    components: {
        Project,
        MainSection
    },
    setup()
    {
        return {
            projects: [
                'fifaManiaci',
                'simonQ',
                'villaRomaine',
                'havranPub'
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.projects
{
    padding-top: var(--main-row-gap);
}

.project-container
{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;

    @media (max-width: 1023px) {
        grid-template-columns: 1fr;
    }
}
</style>
